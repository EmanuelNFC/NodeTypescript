import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateLogs1615125593534 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                 name: 'logs',
                 columns: [
                     {
                         name: 'id',
                         type: 'uuid',
                         isPrimary: true,
                         generationStrategy: 'uuid',
                         default: 'uuid_generate_v4()'
                     },
                     {
                         name: 'log_user',
                         type: 'uuid'
                     },
                     {
                        name: 'tag',
                        type: 'varchar',
                  
                     },
                     {
                         name: 'name',
                         type: 'varchar',

                     },
                 ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('logs');
        
    }


}
