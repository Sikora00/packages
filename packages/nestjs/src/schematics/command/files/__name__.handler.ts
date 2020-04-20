import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';


@CommandHandler(<%= classify(name) %>Command)
export class <%= classify(name) %>Handler implements ICommandHandler<<%= classify(name) %>Command> {
  constructor(
    private commandBus: CommandBus,
    private readonly logger: LoggerService,
    private trackRepository: TrackDomainRepository
  ) {}

  async execute(command: <%= classify(name) %>Command): Promise<void> {

  }
}
