export declare class UsersService {
    getProfile(): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
    }>;
}
