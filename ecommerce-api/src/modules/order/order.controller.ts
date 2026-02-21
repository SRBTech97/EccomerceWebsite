import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateOrderDto, @Req() req: any) {
    return this.orderService.createOrder(dto, req.user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  list(@Req() req: any) {
    return this.orderService.getOrders(req.user.userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getById(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.orderService.getOrderById(id, req.user.userId);
  }
}
