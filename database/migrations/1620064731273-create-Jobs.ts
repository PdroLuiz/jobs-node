import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createJobs1620064731273 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "Jobs",
            columns: [
                {
                    name: "name",
                    type: "varchar",
                    length: "100",
                    isUnique: true,
                    isNullable: false,
                    isPrimary: true,
                }, 
                {
                    name: "running",
                    type: "boolean",
                    isNullable: false,
                    default: false,
                },
                {
                    name: "runAt",
                    type: "datetime",
                    isNullable: false,
                },
                {
                    name: "active",
                    type: "boolean",
                    isNullable: false,
                    default: false,
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Jobs");
    }

}
