<template>
  <div class="room">
    <div class="room-list"  v-if="token">
      <div
        class="room-item my-card"
        v-for="item in roomList"
        :key="item.roomId"
        @click="getInfo(item.roomId,item.bgPath)"
      >
        <img class="room-avatar" :src="item.roomAvatar | picPathFormat" alt>
        <div class="room-info">
          <p>
            <span class="room-owner" v-html="item.creatorName"></span>
            <span class="room-name" v-html="item.roomName"></span>
          </p>
          <p class="room-preview" v-html="item.roomTopic"></p>
        </div>
      </div>
    </div>
    <div class="my-card" v-else>您还没有登录</div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "roomlist",
  data() {
    return {
      msgPage: 0,
      token: this.$store.getters.getToken,
      friends: [],
      member: []
    };
  },
  methods: {
    getInfo(roomId, bgPath) {
      this.$router.push({ name: "roommsg", params: { id: roomId, bgPath } });
    }
  },
  mounted() {
    this.friends = JSON.parse(localStorage.getItem('userinfo')).friends;
    this.token = this.$store.getters.getToken;
    this.$store.dispatch('getRoomList',{ token: this.token, friends: this.friends })
  },
  computed: {
    ...mapState(['roomList'])
  } 
};
</script>

<style lang="less" scoped>
@import '../../assets/less/global';
.room{
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 10px;
  .room-list {
    width: 75%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .room-item {
      .flex-align-center();
      flex: 1;
      padding: 5px;
      margin: 5px;
      cursor: pointer;
      justify-content: flex-start;
      min-width: 360px;
      max-width: 480px;
      &:hover {
        background-color: rgba(0,0,0,0.1);
      }
      .room-avatar {
        width: 80px;
        height: 80px;
      }
      .room-info {
        margin-left: 10px;
        width: 100%;
        p {
          line-height: 1.2;
          .room-owner {
            font-size: 16px;
            margin-right: 10px;
          }
          .room-name {
            font-size: 14px;
            color: #333;
          }
        }
        .room-preview {
          border-top: 1px solid #ccc;
          padding-top: 10px;
          font-size: 14px;
          min-height: 15px;
        }
      }
    }
  }
  @media screen and(max-width: 768px) {
    .room-list{
      width: 90%;
    }
  }
}
</style>