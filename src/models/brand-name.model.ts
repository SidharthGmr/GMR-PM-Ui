export interface CreateBrandNameModel {
    brandName: string;
    status: string;
    displayOrder?: number | null;
}

export interface UpdateBrandNameModel {
    brandName?: string;
    status?: string;
    displayOrder?: number | null;
}
