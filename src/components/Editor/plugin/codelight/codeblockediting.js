/**
 * @module codeblock/codeblockediting
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import CodeBlockCommand from './codeblockcommand'

import { isSupported } from './utils'

/**
 * The code blocks feature. It handles switching between block formats &ndash; codeblocks and paragraph.
 * It introduces `codeblock1`-`codeblockN` commands which allow to convert paragraphs into codeblocks.
 *
 * @extends module:core/plugin~Plugin
 */
export default class HeadingEditing extends Plugin {
  /**
	 * @inheritDoc
	 */
  constructor(editor) {
    super(editor)

    editor.config.define('codeblock', {
      languages: [
        'xml', 'css', 'cpp', 'cs', 'js'
      ]
    })
  }

  /**
	 * @inheritDoc
	 */
  static get requires() {
    return [Paragraph]
  }

  /**
	 * @inheritDoc
	 */
  init() {
    const editor = this.editor
    const languages = editor.config.get('codeblock.languages').filter(isSupported)

    editor.model.schema.register('codeblock', {
      inheritAllFrom: '$block',
      isBlock: true,
      allowIn: '$root'
    })

    editor.conversion.elementToElement({
      model: 'codeblock',
      view: {
        name: 'pre',
        classes: 'line-numbers'
      }
    })

    const modelElements = []

    for (const lang of languages) {
      const modelName = `codeblock-${lang}`

      editor.model.schema.register(modelName, {
        isBlock: true,
        allowIn: 'codeblock',
        inheritAllFrom: '$block',
        allowContentOf: '$block'
      })

      editor.conversion.elementToElement({
        model: modelName,
        view: {
          name: 'code',
          classes: `lang-${lang}`
        }
      })

      modelElements.push(modelName)
    }

    // Register the codeblock command for this option.
    editor.commands.add('codeblock', new CodeBlockCommand(editor, modelElements))

    // Postfixer which cleans incorrect model states connected with blockcode.
    // editor.model.document.registerPostFixer(writer => {
    //   const changes = editor.model.document.differ.getChanges()
    //   const schema = editor.model.schema
    //
    //   for (const entry of changes) {
    //     if (entry.type == 'insert') {
    //       const element = entry.position.nodeAfter
    //
    //       if (!element) {
    //         // We are inside a text node.
    //         continue
    //       }
    //
    //       if (element.is('codeblock') && element.isEmpty) {
    //         writer.remove(element)
    //
    //         return true
    //       } else if (element.is('codeblock') && !schema.checkChild(entry.position, element)) {
    //         // Added a codeblock in incorrect place - most likely inside another codeblock. Unwrap it
    //         // so the content inside is not lost.
    //         writer.unwrap(element)
    //
    //         return true
    //       } else if (element.parent && element.parent.is('codeblock')) {
    //         // case when we are between codeblock and codeblock wrapper
    //         const parent = element.parent
    //         const codeEl = parent.getChild(0)
    //         const offset = codeEl.maxOffset
    //
    //         writer.remove(element)
    //         writer.appendText(element.data, codeEl)
    //         writer.setSelection(writer.createPositionAt(codeEl, offset))
    //
    //         return true
    //       } else if (element.is('element')) {
    //         // Just added an element. Check its children to see if there are no nested codeblok somewhere inside.
    //         const range = writer.createRangeIn(element)
    //
    //         for (const child of range.getItems()) {
    //           if (child.is('codeblock') && !schema.checkChild(writer.createPositionBefore(child), child)) {
    //             writer.unwrap(child)
    //
    //             return true
    //           }
    //         }
    //       }
    //     } else if (entry.type === 'remove') {
    //       const parent = entry.position.parent
    //
    //       if (parent && parent.is('codeblock') && parent.isEmpty) {
    //         // Something got removed and now codeblock is empty. Remove the codeblock as well.
    //         writer.remove(parent)
    //
    //         return true
    //       } else if (parent && parent.is('codeblock') && !parent.isEmpty && entry.position.isAtStart) {
    //         writer.rename(parent, 'paragraph')
    //
    //         return true
    //       } else if (parent && parent.parent &&
		// 				parent.parent.is('codeblock') && !parent.parent.isEmpty && entry.position.isAtEnd
    //       ) {
    //         const offset = parent.maxOffset
    //         const element = parent.parent.nextSibling
    //
    //         if (element) {
    //           if (element.is('codeblock')) {
    //             writer.unwrap(element.getChild(0))
    //           }
    //
    //           writer.rename(element, 'paragraph')
    //           for (let i = 0; i < element.childCount; i++) {
    //             writer.appendText(element.getChild(i).data, parent)
    //           }
    //
    //           writer.remove(element)
    //           writer.setSelection(writer.createPositionAt(parent, offset))
    //         }
    //
    //         return false
    //       } else if (entry.position.nodeBefore && entry.position.nodeBefore.is('codeblock')) {
    //         const codeEl = entry.position.nodeBefore.getChild(0)
    //
    //         writer.setSelection(writer.createPositionAt(codeEl, 'end'))
    //
    //         return false
    //       }
    //     }
    //   }
    //
    //   return false
    // })
  }

  /**
	 * @inheritDoc
	 */
  afterInit() {
    const editor = this.editor
    const languages = editor.config.get('codeblock.languages').filter(isSupported)

    editor.editing.view.document.on('enter', (evt, data) => {
      const positionParent = editor.model.document.selection.getFirstPosition().parent
      const isCodeBlock = languages.some(lang => positionParent.is(`codeblock-${lang}`))

      if (isCodeBlock) {
        editor.execute('shiftEnter')
        data.preventDefault()
        evt.stop()
        editor.editing.view.scrollToTheSelection()
      }
    }, { priority: 'high' })

    editor.editing.view.document.on('delete', (evt, data) => {
      const position = editor.model.document.selection.getFirstPosition()

      if (data.direction === 'forward' && position.isAtEnd && !position.nodeAfter) {
        // codeblock somewhere in the end of the root
        data.preventDefault()
        evt.stop()
      }
    }, { priority: 'high' })
  }
}
