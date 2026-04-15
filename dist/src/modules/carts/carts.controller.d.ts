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
                isPopular: boolean;
                categoryId: bigint;
                price: import("@prisma/client-runtime-utils").Decimal;
                description: string | null;
                image: string | null;
                isAvailable: boolean;
            };
        } & {
            id: bigint;
            cartId: bigint;
            menuId: bigint;
            qty: number;
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
        cartId: bigint;
        menuId: bigint;
        qty: number;
    }>;
    removeItem(itemId: string): Promise<{
        id: bigint;
        cartId: bigint;
        menuId: bigint;
        qty: number;
    }>;
    updateQuantity(itemId: string, body: {
        qty: number;
    }): Promise<{
        id: bigint;
        cartId: bigint;
        menuId: bigint;
        qty: number;
    }>;
}
