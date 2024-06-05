import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length: 100, nullable: false})
    name!: string;

    @Column({type: 'varchar', length: 100, nullable: false})
    email!: string;
}