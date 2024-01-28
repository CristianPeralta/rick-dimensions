import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDimensionDto } from './dto/create-dimension.dto';
import { UpdateDimensionDto } from './dto/update-dimension.dto';
import { Dimension } from '../schemas/dimension.schema';

@Injectable()
export class DimensionsService {
  constructor(@InjectModel(Dimension.name) private dimensionModel: Model<Dimension>) {}

  /**
   * Retrieves all Dimensions.
   * @returns A list of Dimensions.
   */
  async findAll() {
    return this.dimensionModel.find();
  }

  /**
   * Creates a new Dimension.
   * @param dimension The dimension data.
   * @returns The created dimension.
   */
  async create(dimension: CreateDimensionDto) {
    const newDimension = new this.dimensionModel(dimension);
    return newDimension.save();
  }

  /**
   * Finds a Dimension by its ID.
   * @param id The Dimension ID.
   * @returns The found Dimension, or `null` if not found.
   */
  async findOne(id: string) {
    return this.dimensionModel.findById(id);
  }

  /**
   * Deletes a Dimension by its ID.
   * @param id The Dimension ID.
   * @returns The deleted Dimension, or `null` if not found.
   */
  async delete(id: string) {
    return this.dimensionModel.findByIdAndDelete(id);
  }

  /**
   * Updates a Dimension by its ID.
   * @param id The Dimension ID.
   * @param dimension The updated Dimension data.
   * @returns The updated Dimension, or `null` if not found.
   */
  async update(id: string, dimension: UpdateDimensionDto) {
    return this.dimensionModel.findByIdAndUpdate(id, dimension, { new: true });
  }
}
