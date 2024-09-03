import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { ChatModule } from './module/chat/chat.module';

@Module({
  imports: [   TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'autorack.proxy.rlwy.net',
    port: 19663,
    username: 'postgres',
    password: 'EQdLZiVxOlefmcRBmmmODGhhieDDcaOt',
    database: 'railway',
    autoLoadEntities: true,
    synchronize: true, 
  }), UserModule, AuthModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
