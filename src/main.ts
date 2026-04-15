import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BigIntInterceptor } from './common/interceptors/bigint.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors(); // Fixes communication with Frontend
  app.useGlobalInterceptors(new BigIntInterceptor()); // Fixes 500 Error for JSON BigInt serialization
  
  await app.listen(process.env.PORT ?? 3001); // Re-affirming port based on my prior knowledge
}
bootstrap();
