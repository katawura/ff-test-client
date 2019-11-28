import { MigrationInterface, QueryRunner,getRepository } from "typeorm";
import { Post } from "../entity/Post";

export class CreatePost1574873035099 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
			let post = new Post();
			post.title = "admin is admin";
			post.body = "congratulations you got the contact at flavr foods";
			post.user = 1;
			const postRepository = getRepository(Post);
			await postRepository.save(post);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
