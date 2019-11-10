/**
 * @module code-block/codeblock
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import CodeBlockEditing from './codeblockediting'
import CodeBlockUI from './codeblockui'

/**
 * The block quote plugin.
 *
 * For more information about this feature check the {@glink api/code-block package page}.
 *
 * This is a "glue" plugin which loads the {@link module:code-block/codeblockediting~CodeBlockEditing block quote editing feature}
 * and {@link module:code-block/codeblockui~CodeBlockUI block quote UI feature}.
 *
 * @extends module:core/plugin~Plugin
 */
export default class CodeBlock extends Plugin {
  /**
	 * @inheritDoc
	 */
  static get requires() {
    return [CodeBlockEditing, CodeBlockUI]
  }

  /**
	 * @inheritDoc
	 */
  static get pluginName() {
    return 'CodeBlock'
  }
}
