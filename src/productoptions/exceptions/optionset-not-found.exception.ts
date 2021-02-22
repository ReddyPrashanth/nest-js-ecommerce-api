import { NotFoundException } from '@nestjs/common';
export class OptionsetNotFoundException extends NotFoundException {
    constructor(id) {
        super(`Optionset with id ${id} not found.`);
    }
}