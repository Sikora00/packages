import { ICommand } from '@nestjs/cqrs';

export class <%= classify(name) %>Command implements ICommand {
  constructor() {}
}
