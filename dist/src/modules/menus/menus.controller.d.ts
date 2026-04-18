import { MenusService } from './menus.service';
export declare class MenusController {
    private menusService;
    constructor(menusService: MenusService);
    findAll(): Promise<({
        category: {
            id: bigint;
            name: string;
        };
    } & {
        id: bigint;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
        isAvailable: boolean;
        isPopular: boolean;
        categoryId: bigint;
    })[]>;
    findOne(id: string): Promise<({
        category: {
            id: bigint;
            name: string;
        };
    } & {
        id: bigint;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
        isAvailable: boolean;
        isPopular: boolean;
        categoryId: bigint;
    }) | null>;
    create(req: any, file: Express.Multer.File, body: any): Promise<{
        id: bigint;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
        isAvailable: boolean;
        isPopular: boolean;
        categoryId: bigint;
    }>;
    update(req: any, id: string, file: Express.Multer.File, body: any): Promise<{
        id: bigint;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
        isAvailable: boolean;
        isPopular: boolean;
        categoryId: bigint;
    }>;
    remove(req: any, id: string): Promise<{
        id: bigint;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
        isAvailable: boolean;
        isPopular: boolean;
        categoryId: bigint;
    }>;
}
