import { NotFoundException } from '@nestjs/common';
export class SubcategoryNotFoundException extends NotFoundException {
    constructor(id: number) {
        super(`Subcategory with id '${id}' not found.`);
    }
}