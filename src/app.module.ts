import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MenusModule } from './modules/menus/menus.module';
import { TablesModule } from './modules/tables/tables.module';
import { GuestModule } from './modules/guest/guest.module';
import { CartsModule } from './modules/carts/carts.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { DeliveriesModule } from './modules/deliveries/deliveries.module';
import { ChatbotModule } from './modules/chatbot/chatbot.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { PromosModule } from './modules/promos/promos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    MenusModule,
    TablesModule,
    GuestModule,
    CartsModule,
    OrdersModule,
    PaymentsModule,
    DeliveriesModule,
    ChatbotModule,
    NotificationsModule,
    PromosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
