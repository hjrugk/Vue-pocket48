<template>
  <div>
    <div class="room">
      <div class="room-list">
        <div class="room-item" v-for="item in member" :key="item.roomId">
          <span class="room-owner" v-html="item.creatorName"></span>
          <span class="room-name" v-html="item.roomName"></span>
          <p class="room-preview" v-html="item.roomTopic"></p>
          <el-button @click="getInfo(item.roomId)" size="medium">房间留言</el-button>
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
  padding: 5px 10px;
  .room-owner{
    font-size: 16px;
    margin-right: 10px;
  }
  .room-name{
    font-size: 14px;
    color: #333;
  }
  .room-preview{
    font-size: 14px;
  }
}
</style>