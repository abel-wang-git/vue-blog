/**
 * @module codeblock/codeblockcommand
 */

import Command from '@ckeditor/ckeditor5-core/src/command'
import first from '@ckeditor/ckeditor5-utils/src/first'

/**
 * The codeblock command. It is used by the {@link module:codeblock/codeblock~CodeBlock codeblock feature} to apply codeblocks.
 *
 * @extends module:core/command~Command
 */
export default class CodeBlockCommand extends Command {
  /**
	 * Creates an instance of the command.
	 *
	 * @param {module:core/editor/editor~Editor} editor Editor instance.
	 * @param {Array.<String>} modelElements Names of the element which this command can apply in the model.
	 */
  constructor(editor, modelElements) {
    super(editor)

    /**
		 * If the selection starts in a codeblock (which {@link #modelElements is supported by this command})
		 * the value is set to the name of that codeblock model element.
		 * It is  set to `false` otherwise.
		 *
		 * @observable
		 * @readonly
		 * @member {Boolean|String} #value
		 */

    /**
		 * Set of defined model's elements names that this command support.
		 * See {@link module:codeblock/codeblock~CodeBlockOption}.
		 *
		 * @readonly
		 * @member {Array.<String>}
		 */
    this.modelElements = modelElements
  }

  /**
	 * @inheritDoc
	 */
  refresh() {
    const block = first(this.editor.model.document.selection.getSelectedBlocks())
    const schema = this.editor.model.schema

    this.value = !!block && this.modelElements.includes(block.name) && block.name
    this.isEnabled = !!block &&
			this.modelElements.some(codeblock => checkCanBecomeCodeBlock(block, codeblock, schema))
  }

  /**
	 * Executes the command. Applies the codeblock to the selected blocks or, if the first selected
	 * block is a codeblock already, turns selected codeblocks (of this level only) to paragraphs.
	 *
	 * @param {Object} options
	 * @param {String} options.value Name of the element which this command will apply in the model.
	 * @fires execute
	 */
  execute(options) {
    const model = this.editor.model
    const document = model.document

    const modelElement = options.value

    model.change(writer => {
      const blocks = Array.from(document.selection.getSelectedBlocks())
        .filter(block => {
          return checkCanBecomeCodeBlock(block, modelElement, model.schema)
        })

      for (const block of blocks) {
        if (modelElement === 'codeblock-none') {
          if (block.parent.name === 'codeblock') {
            writer.unwrap(block.parent)
          }

          writer.rename(block, 'paragraph')
        } else if (!block.is(modelElement)) {
          if (block.parent.name === 'codeblock') {
            writer.unwrap(block.parent)
          }

          writer.rename(block, 'codeblock')

          const range = writer.createRangeIn(block)
          writer.wrap(range, modelElement)
        }
      }
    })
  }
}

// Checks whether the given block can be replaced by a specific codeblock.
//
// @private
// @param {module:engine/model/element~Element} block A block to be tested.
// @param {module:codeblock/codeblockcommand~CodeBlockCommand#modelElement} codeblock Command element name in the model.
// @param {module:engine/model/schema~Schema} schema The schema of the document.
// @returns {Boolean}
function checkCanBecomeCodeBlock(block, codeblock, schema) {
  return codeblock === 'codeblock-none' && block.parent.name === 'codeblock' ||
		schema.checkChild(block.parent, codeblock) && !schema.isObject(block)
}
