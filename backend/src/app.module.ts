import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TwitterModule } from './module/twitter/twitter.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TwitterModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
