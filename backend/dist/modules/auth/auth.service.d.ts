export declare class AuthService {
    login(loginDto: any): Promise<{
        message: string;
    }>;
    register(registerDto: any): Promise<{
        message: string;
    }>;
}
