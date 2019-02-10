<template>
  <div class="detail-container">
    <div class="base-info">
      <img :src="detail.avatar" alt="" class="base-avatar">
      <div class="base-name">
        <div class="real-name">
          <span v-html="detail.real_name" class="real"></span>
          <p v-html="detail.nick_name" class="nick"></p>
        </div>
        <div class="team-name">
          <el-tag v-html="team" class="team"></el-tag>
          <el-tag type="success" v-html="period[0] + ' ' + '第' + period[1] + '期'" class="period"></el-tag>
        </div>
      </div>
      <div class="room-entry">
        <el-button type="primary" @click="goToMemberRoom(detail.member_id)">房间</el-button>
        <p> </p>
        <el-button type="danger" @click="goToWeibo(detail.wb_uid)">微博</el-button>
      </div>
    </div>
    <div class="carousel-container">
      <el-carousel trigger="click" height="500px">
        <el-carousel-item v-for="item in fullPhoto" :key="item">
          <img :src="item" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="extra-info">
      <p v-html="'加入时间：' + detail.ctime"></p>
      <p v-html="'生日：' + detail.birthday"></p>
      <p v-html="'出生地：' + detail.birthplace"></p>
      <p v-html="'血型：' + detail.blood_type"></p>
      <p v-html="'星座：' + detail.constellation"></p>
      <p v-html="'身高：' + detail.height"></p>
      <p v-html="'爱好：' + detail.hobbies"></p>
      <p v-html="'特长：' + detail.specialty"></p>
      <p v-html="'星座运势：' + detail.star_region"></p>
    </div>
  </div>
</template>

<script>
  import {periodHandler} from '../plugins/periodHandler'
  export default {
    name: "memberDetail",
    data() {
      return {
        detail: this.$route.params.item,
        fullPhoto: [],
        team: this.$route.params.t,
        period: []
      }
    },
    methods: {
      goToMemberRoom(id){
        this.axios.post('/api/getRoomList',{token: this.$store.state.token,friends: [id]})
          .then(res => {
            this.$router.push("/roommsg/" + res.data.content[0].roomId)
          })
      },
      goToWeibo(uid){
        window.location.href = 'https://www.weibo.cn/u/' + uid
      }
    },
    created(){
      for (let i = 1;i<5;i++){
        this.fullPhoto.push(this.detail['full_photo_'+i])
      }
      this.period = periodHandler(this.detail.period)
    }
  }
</script>

<style lang="less" scoped>
.detail-container{
  padding: 10px;
  .base-info{
    height: 100px;
    padding-bottom: 20px;
    display: flex;
    justify-content: flex-start;
    .base-avatar{
      height: 100%;
      border: 1px solid #ccc;
    }
    .room-entry{
      position: absolute;
      right: 15px;
    }
    .base-name{
      margin-left: 20px;
      .team-name{
        font-size: 15px;
        .period{
          margin-left: 5px;
        }
      }
      .real-name{
        font-size: 18px;
        .nick{
          font-size: 15px;
        }
      }
    }
  }
  .carousel-container{
    margin-top: 10px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
  }
}
</style>