import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { <%= classify(name) %>Query } from './<%= name %>.query'


@QueryHandler(<%= classify(name) %>Query)
export class <%= classify(name) %>Handler implements IQueryHandler<<%= classify(name) %>Query> {
  constructor() {}

  async execute(query: <%= classify(name) %>Query): Promise<void> {

  }
}
