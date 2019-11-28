import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import { Like } from "../entity/Like";

export class ListPost1574876462041 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
			let like = new Like();
			const LikesRepository = getRepository(Like);
			await LikesRepository.save(like);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
