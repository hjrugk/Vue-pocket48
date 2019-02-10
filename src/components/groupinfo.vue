<template>
  <div>
    <p v-for="item in groupList" :key="item.group_id">
      <span v-html="item.group_name"></span>
    </p>
  </div>
</template>

<script>
  export default {
    name: "groupinfo",
    data() {
      return {
        groupList: []
      }
    },
    methods: {
      getGroupInfo(){
        this.axios.get('/api/allgroupinfo')
          .then(res => {
            this.groupList = res.data
          })
      }
    },
    mounted() {
      this.getGroupInfo()
    }
  }
</script>

<style lang="less" scoped>

</style>