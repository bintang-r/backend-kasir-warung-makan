import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<{
        id: bigint;
        name: string;
    }[]>;
    create(body: {
        name: string;
    }): Promise<{
        id: bigint;
        name: string;
    }>;
}
