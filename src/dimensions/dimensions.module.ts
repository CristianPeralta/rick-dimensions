import { Module } from '@nestjs/common';
import { DimensionsService } from './dimensions.service';
import { DimensionsController } from './dimensions.controller';
import { Dimension, DimensionSchema } from '../schemas/dimension.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Dimension.name,
        schema: DimensionSchema,
      },
    ]),
  ],
  controllers: [DimensionsController],
  providers: [DimensionsService],
})
export class DimensionsModule {}
