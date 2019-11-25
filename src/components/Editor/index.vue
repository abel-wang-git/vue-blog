<template>
  <div id="app">
    <ckeditor v-model="editorData" :editor="editor" :config="editorConfig" @ready="onEditorReady" />
  </div>
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

import CodeBlock from './plugin/codelight/codeblock'

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
        height: 300,
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
          // CKFinder,
          MediaEmbed,
          Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize,
          // PasteFromOffice,
          Autoformat, WordCount, Autosave,
          CodeBlock,
          TodoList, List, PageBreak,
          Table, TableToolbar
        ],
        toolbar: {
          items: [
            'heading',
            'bold',
            'italic',
            'link',
            'undo',
            'redo',
            'alignment',
            'highlight',
            'blockQuote',
            // 'codeblock',
            'imageUpload',
            // 'ckfinder',
            'mediaEmbed',
            'todoList',
            'numberedList',
            'bulletedList',
            'insertTable',
            'removeFormat',
            'pageBreak',
            'outdent', 'indent',
            'horizontalLine',
            'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor'
          ]
        },
        viewportTopOffset: 100,
        highlight: {
          options: [
            {
              model: 'greenMarker',
              class: 'marker-green',
              title: 'Green marker',
              color: 'var(--ck-highlight-marker-green)',
              type: 'marker'
            },
            {
              model: 'redPen',
              class: 'pen-red',
              title: 'Red pen',
              color: 'var(--ck-highlight-pen-red)',
              type: 'pen'
            }
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
        ckfinder: {
          // Upload the images to the server using the CKFinder QuickUpload command.
          uploadUrl: 'http://localhost:8080/upload',

          // Define the CKFinder configuration (if necessary).
          options: {
            resourceType: 'Images'
          }
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
            {
              model: 'headingFancy',
              view: {
                name: 'h2',
                classes: 'fancy'
              },
              title: 'Heading 2 (fancy)',
              class: 'ck-heading_heading2_fancy',

              // It needs to be converted before the standard 'heading2'.
              converterPriority: 'high'
            }
          ]
        },
        // wordCount: {
        //   onUpdate: stats => {
        //     console.log(stats)
        //   }
        // },
        // autosave: {
        //   save(editor) {
        //     // todo
        //     console.log(editor)
        //   }
        // },
        codeblock: {
          languages: ['java', 'xml', 'js', 'php']
        }
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

<style scoped>
.line{
  text-align: center;
}
</style>
