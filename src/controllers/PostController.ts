import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { validate } from "class-validator";

import { Post } from "../entity/Post";
import { Like } from "../entity/Like";

class PostController {

    static listAll = async (req: Request, res: Response) => {
        //Get posts from database
        const postRepository = getRepository(Post);
        const posts = await postRepository.find({ relations: ["user", "likes"] });

        //Send the users object
        res.send(posts);
	};
	
	static likePost = async (req: Request, res: Response) => {
		//Get params from the body
		const id = req.params.id;

		//Try to find post on database
		const postRepository = getRepository(Post);
		let post;
		try {
            post = await postRepository.findOneOrFail(id);
		} catch (error) {
			//If not found, send a 404 response
			res.status(404).send("Post not found");
			return;
		}

		const likeRepository = getRepository(Like);
		let like = new Like();

		try {
			await likeRepository.save(like);
			post.likes = like;
			await postRepository.save(post);
		} catch (e) {
			res.status(409).send("unable to save Like");
			return;
		}
		//After all send a 204 (no content, but accepted) response
		res.status(204).send();
	};

    static newPost = async (req: Request, res: Response) => {
		//Get parameters from the body
		let { title, body, user } = req.body;
		let post = new Post();
		post.title = title;
        post.body = body;
        post.user = user;

		//Validade if the parameters are ok
		const errors = await validate(post);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}

		//Try to save. If fails, the username is already in use
		const postRepository = getRepository(Post);
		try {
			await postRepository.save(post);
		} catch (e) {
			res.status(409).send("unable to create post");
			return;
		}

		//If all ok, send 201 response
		res.status(201).send("Post created");
	};

	static editPost = async (req: Request, res: Response) => {
		//Get the ID from the url
        const id = req.params.id;

		//Get values from the body
        const { title, body, user } = req.body;

		//Try to find post on database
		const postRepository = getRepository(Post);
		let post;
		try {
            post = await postRepository.findOneOrFail(id);
            
            if (user !== post.user) {
                res.status(404).send("Sorry you didn't create this post");
			return;
            }
		} catch (error) {
			//If not found, send a 404 response
			res.status(404).send("Post not found");
			return;
		}

        post.title = title;
        post.body = body;
		try {
			await postRepository.save(post);
		} catch (e) {
			res.status(409).send("unable to update Post");
			return;
		}
		//After all send a 204 (no content, but accepted) response
		res.status(204).send();
	};

	static deletePost = async (req: Request, res: Response) => {
		//Get the ID from the url
		const id = req.params.id;

		const postRepository = getRepository(Post);
		let post: Post;
		try {
			post = await postRepository.findOneOrFail(id);
		} catch (error) {
			res.status(404).send("Post not found");
			return;
		}
		postRepository.delete(id);

		//After all send a 204 (no content, but accepted) response
		res.status(204).send();
	};
};

export default PostController;