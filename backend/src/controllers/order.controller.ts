import { Controller, Post, Body } from "@nestjs/common";
import { OrderService } from "src/services/order.service";

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
}