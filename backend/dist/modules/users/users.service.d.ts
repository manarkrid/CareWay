import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: number): Promise<User | undefined>;
    saveResetToken(userId: number, token: string | null, expiry: Date | null): Promise<void>;
    findByResetToken(token: string): Promise<User | undefined>;
    create(userData: Partial<User>): Promise<User>;
    getProfile(id: number): Promise<Omit<User, 'password'>>;
    updateProfile(id: number, updateData: Partial<User>): Promise<Omit<User, 'password'>>;
}
