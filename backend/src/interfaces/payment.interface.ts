import { Payment } from "src/models/payment";

export interface IPaymentService {
    getById(paymentId: number): Promise<Payment | null>;
    getByUserId(userId: string): Promise<Payment[]>;
    getByOrderId(orderId: number): Promise<Payment>;
    createPayment(create: any): Promise<any>;
    updatePayment(update: any): Promise<any>;
    deletePayment(paymentId: number): Promise<any>;
}