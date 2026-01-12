import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
    }>;
}
