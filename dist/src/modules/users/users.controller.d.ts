import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<any>;
    create(req: any, body: any): Promise<any>;
    getMe(req: any): Promise<any>;
    updateMe(req: any, body: any): Promise<any>;
    update(req: any, id: string, body: any): Promise<any>;
    remove(req: any, id: string): Promise<any>;
}
