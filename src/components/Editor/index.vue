<template>
  <ckeditor v-model="editorData" :editor="editor" :config="editorConfig" @ready="onEditorReady" />
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials'
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold'
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic'
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link'
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight'
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat'
import Indent from '@ckeditor/ckeditor5-indent/src/indent'
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock'
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline'
import Font from '@ckeditor/ckeditor5-font/src/font'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote'

import Image from '@ckeditor/ckeditor5-image/src/image'
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption'
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize'
import EasyImage from './plugin/imageUpload/easyimage'

import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed'

import TodoList from '@ckeditor/ckeditor5-list/src/todolist'
import List from '@ckeditor/ckeditor5-list/src/list'
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak'

import Table from '@ckeditor/ckeditor5-table/src/table'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'

import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat'
import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave'
import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount'
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock'
export default {
  name: 'Editor',
  props: {
    content: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: this.content,
      editorConfig: {
        plugins: [
          EssentialsPlugin,
          BoldPlugin,
          ItalicPlugin,
          LinkPlugin,
          ParagraphPlugin,
          Highlight,
          RemoveFormat,
          Indent,
          IndentBlock,
          BlockQuote,
          HorizontalLine,
          Font,
          Alignment,
          Heading,
          EasyImage,
          MediaEmbed,
          Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize,
          // PasteFromOffice,
          Autoformat, WordCount, Autosave,
          TodoList, List, PageBreak,
          Table, TableToolbar,
          CodeBlock
        ],
        toolbar: {
          items: [
            'heading',
            'outdent', 'indent',
            'link',
            'undo',
            'redo',
            'alignment',
            'codeBlock',
            'highlight',
            'blockQuote',
            'imageUpload',
            'mediaEmbed',
            'todoList',
            'numberedList',
            'bulletedList',
            'bold',
            'italic',
            'insertTable',
            'removeFormat',
            'pageBreak',
            'horizontalLine',
            'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor'
          ]
        },
        // viewportTopOffset: 50,
        codeBlock: {
          languages: [
            { language: 'java', label: 'java' },
            { language: 'shell', label: 'shell' },
            { language: 'dart', label: 'dart' },
            { language: 'python', label: 'python' },
            { language: 'javascript', label: 'js' },
            { language: 'sql', label: 'sql' },
            { language: 'css', label: 'CSS' },
            { language: 'xml', label: 'HTML/XML' },
            { language: 'html', label: 'html' },
            { language: 'git', label: 'git' },
            { language: 'properties', label: 'properties' },
            { language: 'json', label: 'json' }
          ]
        },
        fontFamily: {
          options: [
            'default',
            'Ubuntu, Arial, sans-serif',
            'Ubuntu Mono, Courier New, Courier, monospace'
          ]
        },
        image: {
          toolbar: ['imageTextAlternative', '|', 'imageStyle:full', 'imageStyle:side', 'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight'],
          styles: ['full', 'side', 'alignLeft', 'alignCenter', 'alignRight']
        },
        mediaEmbed: {

        },
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
        },
        heading: {
          options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
            { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' }
          ]
        },
        wordCount: {
          onUpdate: stats => {
            console.log(stats)
          }
        }
        // autosave: {
        //   save(editor) {
        //     // todo
        //     console.log(editor)
        //   }
        // },
      }
    }
  },
  watch: {
    content: function(val) {
      this.editorData = val
    },
    editorData: function() {
      this.$emit('getContent', this.editorData)
    }
  },
  methods: {
    onEditorReady(editor) {
    }
  }
}
</script>
<style>
  .ck-content{
    min-height: 600px !important;
  }
  .ck.ck-editor__top .ck-sticky-panel .ck-toolbar{
    border-bottom-width: 1px;
  }
</style>
