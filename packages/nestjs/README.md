# @sikora00/nestjs

[![build](https://github.com/sikora00/packages/workflows/sikora00/nestjs%20master%20workflow/badge.svg)](https://github.com/Sikora00/packages/actions?query=workflow%3A%22sikora00%2Fnestjs+master+workflow%22)
[![version](https://img.shields.io/npm/v/@sikora00/nestjs.svg)](https://www.npmjs.com/package/@sikora00/nestjs)
[![downloads](https://img.shields.io/npm/dt/@sikora00/nestjs.svg)](https://www.npmjs.com/package/@sikora00/nestjs)
[![license](https://img.shields.io/npm/l/@sikora00/nestjs.svg)](https://github.com/Sikora00/packages/blob/master/LICENSE)

Dev Tools for Nestjs

## Installation

`npm install --save-dev @sikora00/nestjs`

## Schematics

| Schematics | Usage                                                     | Description                                                            |
| ---------- | --------------------------------------------------------- | ---------------------------------------------------------------------- |
| command    | `ng g @sikora00/nestjs:command AddUser src/user/commands` | Generates Nest CQRS command with it's handler and spec for the handler |
| query      | `ng g @sikora00/nestjs:query GetUser src/user/queries`    | Generates Nest CQRS query with it's handler and spec for the handler   |
