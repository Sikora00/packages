import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ListenerFn } from 'eventemitter3';
import { EventEmitter } from 'events';
import { SlackService } from '../src/slack.service';
import { AppModule } from './src/app.module';

describe('Slack Bot', () => {
  const emitter = new EventEmitter();
  const slackService = {
    on: (event: string, fn: ListenerFn, context?: any) => {
      emitter.addListener(event, fn);
    },
    sendMessage: jest.fn(),
  };
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SlackService)
      .useValue(slackService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  test(`help command`, (done) => {
    emitter.emit('message', {
      user: '1234',
      type: 'message',
      text: 'help',
      channel: '1234',
    });
    setTimeout(() => {
      expect(slackService.sendMessage).toHaveBeenCalledWith(
        'Hello Maciej\n`help` - list all available commands\n',
        '1234'
      );
      done();
    }, 1000);
  });

  afterEach(async () => {
    await app.close();
  });
});
