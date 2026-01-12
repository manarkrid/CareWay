import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  registration: string;

  @Column({
    type: 'enum',
    enum: ['Ambulance', 'VSL', 'VSAB'],
  })
  type: string;

  @Column({ type: 'int', default: 0 })
  mileage: number;

  @Column({ type: 'date', nullable: true })
  nextMaintenance: Date;

  @Column({ 
    type: 'enum', 
    enum: ['Disponible', 'En service', 'Maintenance', 'Indisponible'],
    default: 'Disponible'
  })
  status: string;

  @Column({ nullable: true })
  model: string;

  @Column({ nullable: true })
  year: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}