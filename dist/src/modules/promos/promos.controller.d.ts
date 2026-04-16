import { PromosService } from './promos.service';
export declare class PromosController {
    private readonly promosService;
    constructor(promosService: PromosService);
    getActivePromos(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        image: string | null;
        title: string;
        isActive: boolean;
    }[]>;
}
