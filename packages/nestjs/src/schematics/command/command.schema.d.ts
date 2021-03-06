import { Path } from '@angular-devkit/core';

export interface CommandOptions {
  /**
   * The name of the command.
   */
  name: string;
  /**
   * The path to create the command.
   */
  path: string;
  /**
   * The path to insert the command declaration.
   */
  module?: Path;
  /**
   * Metadata name affected by declaration insertion.
   */
  metadata?: string;
  /**
   * Specifies if a spec file is generated.
   */
  spec?: boolean;
  /**
   * Nest element type name
   */
  type?: string;
}
