<template>
  <div class="app-container">
    <div id="app">
      <ckeditor v-model="editorData" :editor="editor" :config="editorConfig" @ready="onEditorReady" />
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials'

import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline'
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'
import Code from '@ckeditor/ckeditor5-basic-styles/src/code'
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript'
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript'

import LinkPlugin from '@ckeditor/ckeditor5-link/src/link'

import Font from '@ckeditor/ckeditor5-font/src/font'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import Indent from '@ckeditor/ckeditor5-indent/src/indent'

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'

import Image from '@ckeditor/ckeditor5-image/src/image'
import Imagecaption from '@ckeditor/ckeditor5-image/src/imagecaption'
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage'
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed'

import Office from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice'
import Remove from '@ckeditor/ckeditor5-remove-format/src/removeformat'
import Table from '@ckeditor/ckeditor5-table/src/table'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'

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
          Image,
          Imagecaption,
          EasyImage,
          EssentialsPlugin,
          Bold,
          Italic,
          Underline,
          Strikethrough,
          Code,
          Subscript,
          Superscript,
          Font,
          LinkPlugin,
          ParagraphPlugin,
          Alignment,
          Heading,
          Indent,
          MediaEmbed,
          Office,
          Remove,
          Table,
          TableToolbar
        ],
        toolbar: {
          items: [
            'bold', 'italic', 'underline', 'strikethrough', 'code', 'subscript', 'superscript',
            'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor',
            'outdent', 'indent',
            'link',
            'undo',
            'redo',
            'imageUpload', 'mediaEmbed', 'insertTable',
            'alignment'
            // 'bulletedList', 'numberedList'
          ]
        },
        viewportTopOffset: 100,
        image: {
          toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight'],
          styles: [
            'full',
            'alignLeft',
            'alignRight'
          ]
        },
        cloudServices: {
          tokenUrl: this.editorToken,
          uploadUrl: this.editorUpload
        },
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
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
