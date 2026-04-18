import { MenusService } from './menus.service';
export declare class MenusController {
    private menusService;
    constructor(menusService: MenusService);
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    create(req: any, file: Express.Multer.File, body: any): Promise<any>;
    update(req: any, id: string, file: Express.Multer.File, body: any): Promise<any>;
    remove(req: any, id: string): Promise<any>;
}
