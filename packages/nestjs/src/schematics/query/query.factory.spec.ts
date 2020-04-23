import { normalize } from '@angular-devkit/core';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { QueryOptions } from './query.schema';

describe('Query Factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner(
    'query',
    path.join(process.cwd(), 'src/schematics/collection.json')
  );
  it('should manage name and path', async () => {
    const options: QueryOptions = {
      name: 'foo',
      path: 'queries',
    };
    const tree: UnitTestTree = await runner
      .runSchematicAsync('query', options)
      .toPromise();
    const files: string[] = tree.files;
    expect(
      files.find((filename) => filename === '/queries/foo/foo.query.ts')
    ).toBeDefined();
    expect(
      files.find((filename) => filename === '/queries/foo/foo.handler.spec.ts')
    ).toBeDefined();
    expect(
      files.find((filename) => filename === '/queries/foo/foo.handler.ts')
    ).toBeDefined();
    expect(tree.readContent('/queries/foo/foo.query.ts')).toEqual(
      `import { IQuery } from '@nestjs/cqrs';

export class FooQuery implements IQuery {
  constructor() {}
}
`
    );
    expect(tree.readContent('/queries/foo/foo.query.ts')).toEqual(
      `import { IQuery } from '@nestjs/cqrs';

export class FooQuery implements IQuery {
  constructor() {}
}
`
    );
    expect(tree.readContent('/queries/foo/foo.handler.ts')).toEqual(
      `import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { FooQuery } from './foo.query'


@QueryHandler(FooQuery)
export class FooHandler implements IQueryHandler<FooQuery> {
  constructor() {}

  async execute(query: FooQuery): Promise<void> {

  }
}
`
    );
    expect(tree.readContent('/queries/foo/foo.handler.spec.ts')).toEqual(
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

  test('creates itself', () => {
    expect(handler).toBeDefined();
  });
});
`
    );
  });

  it('should manage name to dasherize', async () => {
    const options: QueryOptions = {
      name: 'fooBar',
      path: '',
    };
    const tree: UnitTestTree = await runner
      .runSchematicAsync('query', options)
      .toPromise();
    const files: string[] = tree.files;
    expect(
      files.find((filename) => filename === '/foo-bar/foo-bar.query.ts')
    ).toBeDefined();
    expect(tree.readContent('/foo-bar/foo-bar.query.ts')).toEqual(
      `import { IQuery } from '@nestjs/cqrs';

export class FooBarQuery implements IQuery {
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
    const options: QueryOptions = {
      name: 'foo',
      path: 'src/queries',
    };
    tree = await runner.runSchematicAsync('query', options, tree).toPromise();
    expect(tree.readContent(normalize('/src/app.module.ts'))).toEqual(
      `import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FooHandler } from './queries/foo/foo.handler';

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
    const options: QueryOptions = {
      name: 'GetFoo',
      path: 'src/foo/queries',
    };
    tree = await runner.runSchematicAsync('query', options, tree).toPromise();
    expect(tree.readContent(normalize('/src/foo/foo.module.ts'))).toEqual(
      `import { Module } from '@nestjs/common';
import { GetFooHandler } from './queries/get-foo/get-foo.handler';

@Module({
  providers: [GetFooHandler]
})
export class FooModule {}
`
    );
  });
});
