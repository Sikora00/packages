# @sikora00/nestjs-slack-bot

<p align="center">
<a href="https://www.npmjs.com/package/@sikora00/nestjs-slack-bot"><img src="https://img.shields.io/npm/v/@sikora00/nestjs-slack-bot.svg?style=flat" alt="version" /></a>
<a href="https://www.npmjs.com/package/@sikora00/nestjs-slack-bot"><img alt="downloads" src="https://img.shields.io/npm/dt/@sikora00/nestjs-slack-bot.svg?style=flat"></a>
<img alt="license" src="https://img.shields.io/npm/l/@sikora00/nestjs-slack-bot.svg">
</p>

Module for handling commands from Slack.

## Usage

### Create your slack bot

[Slack Apps](https://api.slack.com/apps)

#### Import module

```typescript
import { Module } from '@nestjs/common';
import { SlackBotModule } from '@sikora00/nestjs-slack-bot';
import { HelloSlackCommand } from './hello.slack-command';

@Module({
  imports: [SlackBotModule.forRoot({ slackToken: 'yourSlackBotToken' })],
  providers: [HelloSlackCommand],
})
export class AppModule {}
```

### Define Slack Command Handler

Create injectable Nestjs's service with @SlackCommandHandler decorator

```typescript
import { Injectable } from '@nestjs/common';
import {
  SlackCommand,
  SlackCommandHandler,
  SlackMessage,
  SlackService,
} from '@sikora00/nestjs-slack-bot';

@SlackCommandHandler()
@Injectable()
export class HelloSlackCommand implements SlackCommand {
  description: string = 'say hello to the Slack Bot';
  type: string = 'hello';

  constructor(private slack: SlackService) {}

  async handler(command: string[], message: SlackMessage): Promise<void> {
    await this.slack.sendMessage('Hello! I am SlackBot', message.channel);
  }
}
```

## Docs

## Help command

Nestjs Slack Bot package has build in `help` command handler. It displays list of all registered commands in format `type: description` received from SlackCommandHandler class definitions.

## Authors

- [Maciej Sikorski](https://github.com/Sikora00)
- [Patryk Zieliński](https://github.com/patryk-zielinski93)
