<template>
  <div>
    <div>
      {{ app.name }}
    </div>
    <div>
      <a :href="app.indexUrl">{{ app.indexUrl }}</a>
    </div>
    <div>
      {{ app.qrcode }}
    </div>
    <div v-for="his in history" :key="his.id">
      {{ his.version }}
      {{ his.createDate }}
      {{ his.info }}
      {{ his.platform }}
      {{ his.md5 }}
    </div>
  </div>
</template>

<script>
import AppApi from '@/api/app'

export default {
  name: 'Index',
  data() {
    return {
      id: '',
      app: {},
      history: {}
    }
  },
  created() {
    console.log('123')
    this.id = this.$route.params.id
    AppApi.appIndex({ id: this.id }).then(response => {
      console.log(response)
      if (response.code === 200) {
        this.app = response.data.app
        this.history = response.data.history
      }
    })
  }
}
</script>

<style scoped>

</style>
