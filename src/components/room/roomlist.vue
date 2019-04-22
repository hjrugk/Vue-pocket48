<template>
  <div class="room">
    <div class="room-list">
      <div
        class="room-item my-card"
        v-for="item in roomList"
        :key="item.roomInfo.roomId"
        @click="getInfo(item.roomInfo.ownerId,item.roomInfo.roomId,item.userConfig.bgImg)"
      >
        <img class="room-avatar" :src="item.roomInfo.roomAvatar | picPathFormat" alt>
        <div class="room-info">
          <p>
            <span class="room-owner" v-html="item.roomInfo.ownerName"></span>
            <span class="room-icon" v-for="(icon,i) in item.roomInfo.icon" :key="i">
              <img :src="icon | picPathFormat">
            </span>
            <span class="room-name" v-html="item.roomInfo.roomName"></span>
          </p>
          <p class="room-preview" v-html="item.roomInfo.roomTopic"></p>
        </div>
      </div>
    </div>
    <div v-if="!friends[0]" style="width: 100%;text-align:center;height:300px;padding-top:150px;">
      <img src="@/assets/images/no_data.webp" alt="">
    </div>
    <alt-loading v-else-if="friends[0]&&!roomList[0]"></alt-loading>
  </div>
</template>

<script>
import { mapState } from "vuex";
import altLoading from '@/components/subComponents/altLoading'
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
    getInfo(ownerId, roomId, bgPath) {
      this.$router.push({
        name: "roommsg",
        params: { ownerId, roomId, bgPath }
      });
    }
  },
  async mounted() {
    if(localStorage.getItem('friends')){
      this.friends = JSON.parse(
        localStorage.getItem("friends")
      );
      this.token = this.$store.getters.getToken;
      this.$store.dispatch("getRoomList", {
        token: this.token,
        friends: this.friends
      });
    }
  },
  computed: {
    ...mapState(["roomList"])
  },
  components: {
    altLoading
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/global";
.room {
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
        background-color: rgba(0, 0, 0, 0.1);
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
          .room-icon {
            margin-right: 10px;
            img {
              height: 14px;
            }
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
    .room-list {
      width: 90%;
      grid-template-columns: repeat(1, 1fr);
    }
  }
  @media screen and(min-width: 1368px) {
    .room-list {
      width: 1000px;
    }
  }
}
</style>