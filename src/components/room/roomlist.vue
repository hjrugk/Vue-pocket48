<template>
  <div>
    <div class="room">
      <div class="room-list">
        <div
          class="room-item my-card flex-align-center"
          v-for="item in member"
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
      token: this.$store.getters.getToken,
      friends: [],
      member: []
    };
  },
  methods: {
    getInfo(roomId, bgPath) {
      this.$router.push({ name: "roommsg", params: { id: roomId, bgPath } });
    },
    getRoomList() {
      this.axios
        .post("/api/getRoomList", { token: this.token, friends: this.friends })
        .then(res => {
          this.member = res.data.content;
        });
    }
  },
  mounted() {
    this.friends = JSON.parse(localStorage.getItem('userinfo')).friends;
    this.token = this.$store.getters.getToken;
    this.getRoomList();
  }
};
</script>

<style lang="less" scoped>
.room-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .room-item {
    padding: 5px;
    margin: 5px;
    cursor: pointer;
    justify-content: flex-start;
    width: 400px;
    &:hover {
      background-color: #efefef;
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
</style>