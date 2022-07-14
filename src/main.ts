import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Ecomerce back end')
    .setDescription('back end for online store')
    .setVersion('1.0.0')
    .addTag('Code&Care PDP')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT, () => console.log(`Server started on port : ${PORT}`));
}
bootstrap();
