<template>
  <div class="room">
    <div class="room-list">
      <div
        class="room-item my-card"
        v-for="item in roomList"
        :key="item.roomId"
        @click="getInfo(item.ownerId,item.targetId,'/')"
      >
        <img class="room-avatar" :src="item.targetAvatar | picPathFormat" alt>
        <div class="room-info">
          <p>
            <span class="room-owner" v-html="item.ownerName"></span>
            <span class="room-name" v-html="item.targetName"></span>
          </p>
          <p class="room-preview" v-html="item.msg"></p>
        </div>
      </div>
    </div>
    <div class="my-card" v-if="!friends[0]">您还没有关注成员</div>
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
    getInfo(ownerId,roomId, bgPath) {
      this.$router.push({ name: "roommsg", params: { ownerId,roomId, bgPath } });
    }
  },
  async mounted() {
    this.friends = JSON.parse(localStorage.getItem('userinfo')).userInfo.friends;
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
  padding-top: 10px;
  .room-list {
    margin: 0 auto;
    width: 75%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    flex-wrap: wrap;
    .room-item {
      .flex-align-center();
      padding: 5px;
      margin: 5px;
      cursor: pointer;
      justify-content: flex-start;
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
      grid-template-columns: repeat(1, 1fr);
    }
  }
  @media screen and(min-width: 1368px) {
    .room-list{
      width: 1000px;
    }
  }
}
</style>