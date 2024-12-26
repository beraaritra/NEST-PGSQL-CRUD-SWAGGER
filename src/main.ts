import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { setupSwagger } from './module/swgger-docs/swagger.config';
// import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set the global prefix for API routes
  const globalprefix = 'api';
  app.setGlobalPrefix(globalprefix);

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // app.use(cookieParser());

  // Setup Swagger
  setupSwagger(app);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    Logger.log('listening at http://localhost:' + PORT + '/' + globalprefix);
    Logger.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
  });
}
bootstrap();
