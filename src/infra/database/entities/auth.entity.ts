import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("auth")
export class AuthDBEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({
    name: "phone_number",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  phoneNumber!: string | null;

  @Column({ name: "email", type: "varchar", length: 255, nullable: true })
  email!: string | null;

  @Column({ name: "password", type: "varchar", length: 255, nullable: true })
  password!: string | null;

  @Column({ name: "phone_confirmed", type: "boolean", default: false })
  phoneConfirmed!: boolean;

  @Column({ name: "email_confirmed", type: "boolean", default: false })
  emailConfirmed!: boolean;

  @Column({
    name: "phone_code",
    type: "varchar",
    length: 255,
    nullable: true,
    default: null,
  })
  phoneCode!: string | null;

  @Column({
    name: "email_code",
    type: "varchar",
    length: 255,
    nullable: true,
    default: null,
  })
  emailCode!: string | null;

  @Column({ name: "phone_code_expiration", type: "timestamp", nullable: true })
  phoneCodeExpiration!: Date | null;

  @Column({ name: "email_code_expiration", type: "timestamp", nullable: true })
  emailCodeExpiration!: Date | null;

  @Column({
    name: "phone_code_expiration_last_sent",
    type: "timestamp",
    nullable: true,
  })
  phoneCodeExpirationLastSent!: Date | null;

  @Column({
    name: "email_code_expiration_last_sent",
    type: "timestamp",
    nullable: true,
  })
  emailCodeExpirationLastSent!: Date | null;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;
}
