export interface Order {
    orderId: number;
    sin: string;
    ticker: string;
    shares: number;
    unitPrice: number;
    status_code: number;
}

export const STATUS_CODE = {
    0: "pending",
    1: "processing",
    2: "success",
    3: "failed"
}