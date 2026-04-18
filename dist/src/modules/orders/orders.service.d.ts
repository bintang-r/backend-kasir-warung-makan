import { WhatsappService } from '../whatsapp/whatsapp.service';
export declare class OrdersService {
    private prisma;
    private cartsService;
    private notificationsService;
    private whatsappService;
    constructor(prisma: PrismaService, cartsService: CartsService, notificationsService: NotificationsService, whatsappService: WhatsappService);
    createOrder(cartId: bigint, userId?: bigint, guestSessionId?: bigint, tableId?: bigint, source?: OrderSource, orderType?: OrderType, address?: string): Promise<any>;
    getOrders(userId?: bigint, guestSessionId?: bigint): Promise<any>;
    getOrderById(id: bigint): Promise<any>;
    getAllOrders(): Promise<any>;
    updateStatus(orderId: bigint, status: OrderStatus): Promise<any>;
    private sendWhatsAppNotification;
    addReview(orderId: bigint, userId: bigint | null, rating: number, comment: string): Promise<any>;
    deleteOrder(id: bigint): Promise<any>;
}
