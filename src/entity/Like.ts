import {Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Length } from "class-validator";
import { Post } from "../entity/Post";

@Entity()
export class Like {

	@PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Post, (post) => post.likes)
    public posts: Post[];
}