import { PrismaService } from '../../prisma/prisma.service';
export declare class CartsService {
    private prisma;
    constructor(prisma: PrismaService);
    getCart(userId?: bigint, guestSessionId?: bigint): Promise<({
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
    addItem(cartId: bigint, menuId: bigint, qty: number): Promise<{
        id: bigint;
        cartId: bigint;
        menuId: bigint;
        qty: number;
    }>;
    updateQuantity(cartItemId: bigint, qty: number): Promise<{
        id: bigint;
        cartId: bigint;
        menuId: bigint;
        qty: number;
    }>;
    removeItem(cartItemId: bigint): Promise<{
        id: bigint;
        cartId: bigint;
        menuId: bigint;
        qty: number;
    }>;
    clearCart(cartId: bigint): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
