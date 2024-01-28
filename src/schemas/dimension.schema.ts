import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

enum DangerLevelEnum {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

/**
 * Represents a Dimension.
 */

@Schema({
  timestamps: true
})
export class Dimension {
  @ApiProperty({
    example: 'Dimension Name',
    description: 'The Name of the Dimension',
  })
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  name: string;

  @ApiProperty({
    example: 'Dimension Description',
    description: 'The description of the Dimension',
  })
  @Prop({
    trim: true,
  })
  description: string;

  @ApiProperty({
    example: ['First feature', 'Second Feature'],
    description: 'The Features of the Dimension',
  })
  @Prop({
    trim: true,
    type: [String]
  })
  features: string[];

  @ApiProperty({
    example: 'Low',
    description: 'The Danger Level of the Dimension',
    type: String,
    enum: Object.values(DangerLevelEnum),
    default: DangerLevelEnum.LOW,
  })
  @Prop({
    trim: true,
  })
  dangerLevel: DangerLevelEnum;
}
/**
 * The Mongoose schema for the `Dimension` model.
 */
export const DimensionSchema = SchemaFactory.createForClass(Dimension);
