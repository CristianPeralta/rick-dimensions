import {
  Controller,
  Get,
  Delete,
  Post,
  Put,
  Body,
  Param,
  ConflictException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DimensionsService } from './dimensions.service';
import { CreateDimensionDto } from './dto/create-dimension.dto';
import { UpdateDimensionDto } from './dto/update-dimension.dto';
import { Dimension } from '../schemas/dimension.schema';

@ApiTags('Dimensions')
@Controller('dimensions')
export class DimensionsController {
  constructor(private readonly dimensionsService: DimensionsService) {}

  /**
   * Retrieve all dimensions
   * @returns {Promise<Dimension[]>} List of dimensions
   */
  @ApiOperation({ summary: 'Get all dimensions' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of dimensions',
    type: Dimension,
    isArray: true,
  })
  @Get()
  async findAll() {
    return this.dimensionsService.findAll();
  }

  /**
   * Retrieve a single dimension by ID
   * @param {string} id - dimension ID
   * @returns {Promise<dimension>} The dimension object
   * @throws {NotFoundException} If the dimension does not exist
   */
  @ApiOperation({ summary: 'Get a dimension by ID' })
  @ApiResponse({ status: 200, description: 'Returns the dimension', type: Dimension })
  @ApiResponse({ status: 404, description: 'Dimension does not exist' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const dimension = await this.dimensionsService.findOne(id);
    if (!dimension) throw new NotFoundException('dimension does not exist');
    return dimension;
  }

  /**
   * Create a new dimension
   * @param {CreateDimensionDto} body - The dimension data
   * @returns {Promise<Dimension>} The created dimension object
   * @throws {ConflictException} If a dimension with the same title already exists
   */
  @ApiOperation({ summary: 'Create a new dimension' })
  @ApiResponse({
    status: 201,
    description: 'Returns the created dimension',
    type: Dimension,
  })
  @ApiResponse({ status: 409, description: 'Dimension already exists' })
  @Post()
  async create(@Body() body: CreateDimensionDto) {
    try {
      return await this.dimensionsService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('dimension already exists');
      }
      throw error;
    }
  }

  /**
   * Delete a dimension by ID
   * @param {string} id - dimension ID
   * @returns {Promise<Dimension>} The deleted dimension object
   * @throws {NotFoundException} If the dimension does not exist
   */
  @ApiOperation({ summary: 'Delete a dimension by ID' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Dimension does not exist' })
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const dimension = await this.dimensionsService.delete(id);
    if (!dimension) throw new NotFoundException('dimension does not exist');
    return dimension;
  }

  /**
   * Update a dimension by ID
   * @param {string} id - dimension ID
   * @param {UpdateDimensionDto} body - The updated dimension data
   * @returns {Promise<Dimension>} The updated dimension object
   * @throws {NotFoundException} If the dimension does not exist
   */
  @ApiOperation({ summary: 'Update a dimension by ID' })
  @ApiResponse({
    status: 200,
    type: Dimension,
  })
  @ApiResponse({ status: 404, description: 'Dimension does not exist' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateDimensionDto) {
    const dimension = await this.dimensionsService.update(id, body);
    if (!dimension) throw new NotFoundException('dimension does not exist');
    return dimension;
  }
}
