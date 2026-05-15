export interface ProductDto {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    sku: string;
    price: number;
    cost?: number | null;
    stock: number;
    lowStockThreshold?: number | null;
    categoryId: number;
    images: string[];
    status: boolean;
    createdById: number;
    updatedById?: number | null;
    createdAt: Date;
    updatedAt: Date | null;
}
