import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port: any = process.env.PORT || 4000;
  await app.listen(port, () => {
    new Logger().log(`Server start port ${port}`);
  });
}
bootstrap();
