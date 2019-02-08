<template>
  <div>
    <div class="member-list">
      <div class="member-item" v-for="item in membersList" :key="item.member_id" v-show="item.status!==2">
        <img :src="item.avatar" alt="" class="member-avatar">
        <p class="member-name" v-html="item.real_name"></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "allmemberinfo",
    data() {
      return {
        membersList: []
      }
    },
    methods: {
      getAllMembers(){
        this.axios.get('/api/allmemberinfo')
          .then(res => {
            this.membersList = res.data.content.memberInfo
          })
      }
    },
    mounted() {
      this.getAllMembers()
    }
  }
</script>

<style lang="less" scoped>
.member-list{
  .member-item{
    .member-avatar{
      width: 50px;
    }
  }
}
</style>