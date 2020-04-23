import { Test, TestingModule } from '@nestjs/testing';
import { <%= classify(name) %>Handler } from './<%= name %>.handler';

describe('<%= classify(name) %>Handler', () => {
  let handler: <%= classify(name) %>Handler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [<%= classify(name) %>Handler],
    }).compile();

    handler = module.get<<%= classify(name) %>Handler>(<%= classify(name) %>Handler);
  });

  test('creates itself', () => {
    expect(handler).toBeDefined();
  });
});
