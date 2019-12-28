<template>
  <div class="dblclick_box" @dblclick="showInput">
    <div v-if="!isShowInput">
      <span>{{ callback }}</span>
    </div>
    <div v-else>
      <input v-model="callback" v-focus="isAutofocus" type="text" @blur="onblur" @keyup.enter="clickEnter">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dblclick',
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    }
  },
  props: {
    content: String
  },
  data() {
    return {
      callback: this.content,
      isShowInput: false,
      isAutofocus: false
    }
  },
  watch: {
    content(val) {
      this.callback = val
    }
  },

  methods: {
    showInput() {
      this.isShowInput = true
      this.isAutofocus = true
    },
    onblur() {
      this.isShowInput = false
      this.isAutofocus = false
      this.callback = this.content
    },
    clickEnter() {
      this.isShowInput = false
      this.isAutofocus = false
      this.$emit('getInputData', this.callback)
    }
  }
}
</script>

<style scoped>
  .dblclick_box {
    min-height: 30px;
  }
</style>
