import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity({ name: 'images' })
export class Image {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: true, default: null })
  name?: string | null;

  @Column()
  url: string;

  @Column({ default: new Date().toISOString() })
  created_at: string;
}
