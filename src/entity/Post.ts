import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable } from "typeorm";
import { Length } from "class-validator";
import { User } from "../entity/User";
import { Like } from "../entity/Like";

@Entity()
export class Post {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Length(4, 100)
	title: string;

	@Column()
	@Length(4, 200)
	body: string;

	@ManyToMany(type => Like, (likes) => likes.posts)
	@JoinTable()
	public likes: Like["id"];
	
	@ManyToOne(type => User, user => user.posts)
    user: User["id"];
}