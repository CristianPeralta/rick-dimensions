import { IsString, IsOptional, IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { isArray } from 'util';
enum DangerLevelEnum {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High',
}
  

export class CreateDimensionDto {
    @ApiProperty({
        example: 'Dimension Name',
        description: 'The Name of the Dimension',
    })
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty({
        example: 'Dimension Description',
        description: 'The description of the Dimension',
        required: false,
    })
    @IsString()
    @IsOptional()
    description?: string;
    
    @ApiProperty({
        example: ['First feature', 'Second Feature'],
        description: 'The Features of the Dimension',
        required: false,
    })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    features: [string];
    @ApiProperty({
        example: 'Low',
        description: 'The Danger Level of the Dimension',
        type: String,
        enum: Object.values(DangerLevelEnum),
        default: DangerLevelEnum.LOW,
    })
    dangerLevel?: DangerLevelEnum;
}
