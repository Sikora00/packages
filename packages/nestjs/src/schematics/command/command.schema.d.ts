import { Path } from '@angular-devkit/core';

export interface CommandOptions {
  /**
   * The name of the service.
   */
  name: string;
  /**
   * The path to create the service.
   */
  path: string;
  /**
   * The path to insert the service declaration.
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
