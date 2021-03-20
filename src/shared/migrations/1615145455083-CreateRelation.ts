import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class CreateRelation1615145455083 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('logs', new TableForeignKey({
            name: 'LogUser',
            columnNames: ['log_user'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('logs', 'LogUser');
    }

}
