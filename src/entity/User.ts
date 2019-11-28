import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Unique,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany
} from "typeorm";
import { Length } from "class-validator";
import * as bcrypt from "bcryptjs";
import { Post } from "../entity/Post";

@Entity('user')
@Unique(["username"])
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Length(4, 20)
	username: string;

	@Column()
	@Length(4, 100)
	password: string;

	@Column()
	@CreateDateColumn()
	createdAt: Date;

	@Column()
	@UpdateDateColumn()
	updatedAt: Date;

	hashPassword() {
		this.password = bcrypt.hashSync(this.password, 8);
	}

	checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
		return bcrypt.compareSync(unencryptedPassword, this.password);
	}

	@OneToMany(type => Post, post => post.user)
  posts: Post[];
}