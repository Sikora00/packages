import { normalize } from '@angular-devkit/core';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { CommandOptions } from './command.schema';

describe('Command Factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner(
    'command',
    path.join(process.cwd(), 'src/schematics/collection.json')
  );
  it('should manage name and path', async () => {
    const options: CommandOptions = {
      name: 'foo',
      path: 'commands',
    };
    const tree: UnitTestTree = await runner
      .runSchematicAsync('command', options)
      .toPromise();
    const files: string[] = tree.files;
    expect(
      files.find((filename) => filename === '/commands/foo/foo.command.ts')
    ).toBeDefined();
    expect(
      files.find((filename) => filename === '/commands/foo/foo.handler.spec.ts')
    ).toBeDefined();
    expect(
      files.find((filename) => filename === '/commands/foo/foo.handler.ts')
    ).toBeDefined();
    expect(tree.readContent('/commands/foo/foo.command.ts')).toEqual(
      `import { ICommand } from '@nestjs/cqrs';

export class FooCommand implements ICommand {
  constructor() {}
}
`
    );
    expect(tree.readContent('/commands/foo/foo.command.ts')).toEqual(
      `import { ICommand } from '@nestjs/cqrs';

export class FooCommand implements ICommand {
  constructor() {}
}
`
    );
    expect(tree.readContent('/commands/foo/foo.handler.ts')).toEqual(
      `import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';


@CommandHandler(FooCommand)
export class FooHandler implements ICommandHandler<FooCommand> {
  constructor(
    private commandBus: CommandBus,
    private readonly logger: LoggerService,
    private trackRepository: TrackDomainRepository
  ) {}

  async execute(command: FooCommand): Promise<void> {

  }
}
`
    );
    expect(tree.readContent('/commands/foo/foo.handler.spec.ts')).toEqual(
      `import { Test, TestingModule } from '@nestjs/testing';
import { FooHandler } from './foo.handler';

describe('FooHandler', () => {
  let handler: FooHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FooHandler],
    }).compile();

    handler = module.get<FooHandler>(FooHandler);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });
});
`
    );
  });

  it('should manage name to dasherize', async () => {
    const options: CommandOptions = {
      name: 'fooBar',
      path: '',
    };
    const tree: UnitTestTree = await runner
      .runSchematicAsync('command', options)
      .toPromise();
    const files: string[] = tree.files;
    expect(
      files.find((filename) => filename === '/foo-bar/foo-bar.command.ts')
    ).toBeDefined();
    expect(tree.readContent('/foo-bar/foo-bar.command.ts')).toEqual(
      `import { ICommand } from '@nestjs/cqrs';

export class FooBarCommand implements ICommand {
  constructor() {}
}
`
    );
  });

  it('should manage declaration in app module', async () => {
    const app = {
      name: '',
    };
    let tree: UnitTestTree = await runner
      .runExternalSchematicAsync('@nestjs/schematics', 'application', app)
      .toPromise();
    const options: CommandOptions = {
      name: 'foo',
      path: 'src/commands',
    };
    tree = await runner.runSchematicAsync('command', options, tree).toPromise();
    expect(tree.readContent(normalize('/src/app.module.ts'))).toEqual(
      `import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FooHandler } from './commands/foo/foo.handler';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, FooHandler],
})
export class AppModule {}
`
    );
  });
  it('should manage declaration in foo module', async () => {
    const app = {
      name: '',
    };
    let tree: UnitTestTree = await runner
      .runExternalSchematicAsync('@nestjs/schematics', 'application', app)
      .toPromise();
    const module = {
      name: 'foo',
    };
    tree = await runner
      .runExternalSchematicAsync('@nestjs/schematics', 'module', module, tree)
      .toPromise();
    const options: CommandOptions = {
      name: 'AddFoo',
      path: 'src/foo/commands',
    };
    tree = await runner.runSchematicAsync('command', options, tree).toPromise();
    expect(tree.readContent(normalize('/src/foo/foo.module.ts'))).toEqual(
      `import { Module } from '@nestjs/common';
import { AddFooHandler } from './commands/add-foo/add-foo.handler';

@Module({
  providers: [AddFooHandler]
})
export class FooModule {}
`
    );
  });
});
