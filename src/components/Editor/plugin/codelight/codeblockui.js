/**
 * @module codeblock/codeblockui
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import Model from '@ckeditor/ckeditor5-ui/src/model'

import { createDropdown, addListToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils'
import { getCodeBlockLabel, isSupported } from './utils'

import Collection from '@ckeditor/ckeditor5-utils/src/collection'
import icon from '@ckeditor/ckeditor5-basic-styles/theme/icons/code.svg'

/**
 * The codeblocks UI feature. It introduces the `codeblocks` dropdown.
 *
 * @extends module:core/plugin~Plugin
 */
export default class CodeBlockUI extends Plugin {
  /**
	 * @inheritDoc
	 */
  init() {
    const editor = this.editor
    const t = editor.t
    const languages = editor.config.get('codeblock.languages').filter(isSupported)

    // Register UI component.
    editor.ui.componentFactory.add('codeblock', locale => {
      const titles = {}
      const itemDefinitions = new Collection()
      const codeblockCommand = editor.commands.get('codeblock')
      const commands = [codeblockCommand]

      languages.unshift('none')

      for (const lang of languages) {
        const modelName = `codeblock-${lang}`
        const label = getCodeBlockLabel(lang)
        const def = {
          type: 'button',
          model: new Model({
            label,
            class: `lang-${lang}`,
            withText: true
          })
        }

        def.model.bind('isOn').to(codeblockCommand, 'value', value => value === modelName)
        def.model.set({
          commandName: 'codeblock',
          commandValue: modelName
        })

        // Add the option to the collection.
        itemDefinitions.add(def)

        titles[ modelName ] = label
      }

      const dropdownView = createDropdown(locale)
      addListToDropdown(dropdownView, itemDefinitions)

      dropdownView.buttonView.set({
        icon,
        isOn: false,
        tooltip: t('Code block')
      })

      dropdownView.extendTemplate({
        attributes: {
          class: [
            'ck-codeblock-dropdown'
          ]
        }
      })

      dropdownView
        .bind('isEnabled')
        .toMany(commands, 'isEnabled', (...areEnabled) => {
          return areEnabled.some(isEnabled => isEnabled)
        })

      // Execute command when an item from the dropdown is selected.
      this.listenTo(dropdownView, 'execute', evt => {
        editor.execute(evt.source.commandName, evt.source.commandValue ? { value: evt.source.commandValue } : undefined)
        editor.editing.view.focus()
      })

      return dropdownView
    })
  }
}
