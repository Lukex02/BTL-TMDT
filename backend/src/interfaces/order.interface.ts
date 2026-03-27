export interface IOrderService {
    getById(orderId: string): Promise<any>;
    getByUserBuyer(userId: string): Promise<any>;
    getByUserSeller(userId: string): Promise<any>;
    createOrder(create: any): Promise<any>;
    updateOrderStatus(orderId: string, status: any): Promise<any>;
    cancelOrder(orderId: string): Promise<any>;
    confirmOrder(orderId: string): Promise<any>;
    deleteOrder(orderId: string): Promise<any>;
}