import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { GetUserDto } from './dto/get-user.dto';
import { OrderCreatedEvent } from './order-created.event';

@Injectable()
export class AppService {
  constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientKafka) {}

  getHello(): string {
    return 'Hello World!';
  }

  handleOrderCreated(orderCreatedEvent: OrderCreatedEvent) {
    console.log(`orderCreatedEvent userId: ${orderCreatedEvent.userId}`);
    return this.authClient.send('get_user', new GetUserDto(orderCreatedEvent.userId))
      .subscribe((user) => {
        console.log(`Billing user with ID ${user.stripeUserId}`);
        return user;
      });
  }
}
