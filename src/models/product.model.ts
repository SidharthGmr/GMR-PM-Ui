export interface CreateProductModel {
    name: string;
    slug: string;
    description?: string;
    sku: string;
    price: number;
    cost?: number;
    stock?: number;
    lowStockThreshold?: number;
    categoryId: number;
    images?: string[];
    status?: boolean;
}

export interface UpdateProductModel extends Partial<CreateProductModel> { }
