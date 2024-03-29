import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DimensionsModule } from './dimensions/dimensions.module';

@Module({
  imports: [
    // Global application configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.test'],
    }),
    // MongoDB configuration and connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_CONNECTION_STRING'),
      }),
      inject: [ConfigService],
    }),
    DimensionsModule,
  ],
})
export class AppModule {}
