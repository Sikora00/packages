import { Path } from '@angular-devkit/core';

export interface QueryOptions {
  /**
   * The name of the query.
   */
  name: string;
  /**
   * The path to create the query.
   */
  path: string;
  /**
   * The path to insert the query declaration.
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
