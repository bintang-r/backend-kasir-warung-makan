import { CartsService } from './carts.service';
export declare class CartsController {
    private cartsService;
    constructor(cartsService: CartsService);
    getCart(req: any): Promise<({
        items: ({
            menu: {
                id: bigint;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                price: import("@prisma/client-runtime-utils").Decimal;
                description: string | null;
                image: string | null;
                isPopular: boolean;
                isAvailable: boolean;
                categoryId: bigint;
            };
        } & {
            id: bigint;
            qty: number;
            cartId: bigint;
            menuId: bigint;
        })[];
    } & {
        id: bigint;
        createdAt: Date;
        updatedAt: Date;
        userId: bigint | null;
        guestSessionId: bigint | null;
    }) | null>;
    addItem(req: any, body: {
        menuId: string;
        qty: number;
    }): Promise<{
        id: bigint;
        qty: number;
        cartId: bigint;
        menuId: bigint;
    }>;
    removeItem(itemId: string): Promise<{
        id: bigint;
        qty: number;
        cartId: bigint;
        menuId: bigint;
    }>;
    updateQuantity(itemId: string, body: {
        qty: number;
    }): Promise<{
        id: bigint;
        qty: number;
        cartId: bigint;
        menuId: bigint;
    }>;
}
