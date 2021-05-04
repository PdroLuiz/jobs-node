import {Entity, Column, PrimaryColumn } from "typeorm";

@Entity({name: "jobs"})
export default class Job {

    @PrimaryColumn({unique: true})
    name: string;

    @Column({nullable: false, default: false})
    running: boolean;
    
    @Column({nullable: false})
    runAt: Date;

    @Column({nullable: false, default: false})
    active: boolean;

}

