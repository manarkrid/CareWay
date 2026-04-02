import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(id: number): Promise<Omit<import("./user.entity").User, "password">>;
    getDefaultProfile(): Promise<Omit<import("./user.entity").User, "password">>;
    updateProfile(id: number, updateData: any): Promise<Omit<import("./user.entity").User, "password">>;
}
