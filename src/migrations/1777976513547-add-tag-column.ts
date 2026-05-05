import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTagColumn1777976513547 implements MigrationInterface {
    name = 'AddTagColumn1777976513547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`tags\` varchar(30) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`tags\``);
    }

}
