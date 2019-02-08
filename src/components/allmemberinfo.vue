<template>
  <div>
    所有成员
  </div>
</template>

<script>
  export default {
    name: "allmemberinfo",
    data() {
      return {}
    },
    methods: {
      getAllMembers(){
        this.axios.get('/api/allmemberinfo')
          .then(res => {
            console.log(res.data.content)
          })
      }
    },
    mounted() {
      this.getAllMembers()
    }
  }
</script>

<style lang="less" scoped>

</style>