import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
// Serve uploaded files from /uploads
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable global validation for DTO
  app.useGlobalPipes(new ValidationPipe());


  const uploadPath = join(process.cwd(), 'uploads');

  // ensure folder exists (important for production like Railway)
  if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath, { recursive: true });
  }

  app.useStaticAssets(uploadPath, {
    prefix: '/uploads',
  });

  // Enable CORS
  app.enableCors({
    origin: '*', 
    // kalau sudah ada FE "*"" nya diganti pake link FE
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Start server
  await app.listen(process.env.PORT ?? 4000);
const url = await app.getUrl();

  console.log(`
  🚀 ==========================================
        THE HOUSE OF MAMINK BACKEND SERVER
  ==========================================

  ✅ Server Status : RUNNING
  🌐 Local URL     : ${url}
  📅 Started At    : ${new Date().toLocaleString()}

  ==========================================
  `);
}
bootstrap();
