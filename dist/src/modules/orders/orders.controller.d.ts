import { OrdersService } from './orders.service';
import { OrderStatus } from '@prisma/client';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    create(req: any, body: any): Promise<any>;
    findAll(req: any): Promise<any>;
    findAllStaff(): Promise<any>;
    findOne(id: string, req: any): Promise<any>;
    remove(id: string): Promise<any>;
    updateStatus(id: string, status: OrderStatus): Promise<any>;
    submitReview(id: string, req: any, rating: number, comment: string): Promise<any>;
}
