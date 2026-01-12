import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('contracts')
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  partnerName: string;

  @Column({
    type: 'enum',
    enum: ['Public', 'Privé'],
  })
  type: string;

  @Column({ 
    type: 'enum', 
    enum: ['En cours', 'Expiré', 'Suspendu'],
    default: 'En cours'
  })
  status: string;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}