import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { <%= classify(name) %>Command } from './<%= name %>.command'


@CommandHandler(<%= classify(name) %>Command)
export class <%= classify(name) %>Handler implements ICommandHandler<<%= classify(name) %>Command> {
  constructor() {}

  async execute(command: <%= classify(name) %>Command): Promise<void> {

  }
}
