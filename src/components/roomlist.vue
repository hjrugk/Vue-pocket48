<template>
  <div>
    <div class="room">
      <div class="room-info"></div>
      <div class="room-list">
        <div class="room-item" v-for="item in member" :key="item.roomId">
          <p class="room-owner" v-html="item.creatorName"></p>
          <p class="room-name" v-html="item.roomName"></p>
          <p class="room-preview" v-html="item.roomTopic"></p>
          <el-button @click="getInfo(item.roomId)" type="primary">房间留言</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "roomlist",
    data() {
      return {
        msgList: [],
        msgPage: 0,
        token: '',
        friends: [],
        member: [],
      }
    },
    methods: {
      getInfo(roomId){
        this.$router.push("/roommsg/" + roomId)
      },
      getRoomList(){
        this.axios.post('/api/getRoomList',{token: this.token,friends: this.friends})
          .then(res => {
            this.member = res.data.content
          })
      }
    },
    mounted() {
      this.friends = this.$store.state.friends
      this.token = this.$store.state.token
      this.getRoomList()
    }
  }
</script>

<style lang="less" scoped>
.room-item{
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
}
</style>