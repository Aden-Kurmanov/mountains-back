import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { join } from "path";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as process from "process";
import * as path from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const baseDir = process.cwd();
  const relativePath = path.join("public");
  const absolutePath = path.resolve(baseDir, relativePath);
  app.useStaticAssets(join(absolutePath));
  app.setGlobalPrefix("api");

  const config = new DocumentBuilder()
    .setTitle("Swagger")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(5002);
}
bootstrap().then();
