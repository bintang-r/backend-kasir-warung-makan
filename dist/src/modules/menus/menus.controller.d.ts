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
        categoryId: bigint;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
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
        categoryId: bigint;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
    }) | null>;
    create(body: any): Promise<{
        id: bigint;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: bigint;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
    }>;
    update(id: string, body: any): Promise<{
        id: bigint;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: bigint;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
    }>;
    remove(id: string): Promise<{
        id: bigint;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: bigint;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        image: string | null;
    }>;
}
