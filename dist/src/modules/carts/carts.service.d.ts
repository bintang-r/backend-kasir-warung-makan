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
                price: import("@prisma/client-runtime-utils").Decimal;
                description: string | null;
                image: string | null;
                isAvailable: boolean;
                isPopular: boolean;
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
    addItem(cartId: bigint, menuId: bigint, qty: number): Promise<{
        id: bigint;
        qty: number;
        cartId: bigint;
        menuId: bigint;
    }>;
    updateQuantity(cartItemId: bigint, qty: number): Promise<{
        id: bigint;
        qty: number;
        cartId: bigint;
        menuId: bigint;
    }>;
    removeItem(cartItemId: bigint): Promise<{
        id: bigint;
        qty: number;
        cartId: bigint;
        menuId: bigint;
    }>;
    clearCart(cartId: bigint): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
