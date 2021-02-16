import { Subcategory } from './subcategory.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Subcategory)
export class SubcategoryRepository extends Repository<Subcategory> {}