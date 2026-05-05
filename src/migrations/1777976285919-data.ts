import { MigrationInterface, QueryRunner } from "typeorm";

export class Data1777976285919 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO article (title, content) VALUES ('标题1', '内容1')`);
        await queryRunner.query(`INSERT INTO article (title, content) VALUES ('标题2', '内容2')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
