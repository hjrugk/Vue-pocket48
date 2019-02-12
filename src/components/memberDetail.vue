<template>
  <div class="detail-container">
    <div class="base-info">
      <img :src="detail.avatar | picPathFormat" alt="" class="base-avatar" :style="'border: 1px solid #'+color">
      <div class="base-name">
        <div class="real-name">
          <span v-html="detail.real_name" class="real"></span>
          <p v-html="detail.nick_name" class="nick"></p>
        </div>
        <div class="team-name">
          <el-tag v-html="team" class="team" :color="color"></el-tag>
          <el-tag type="success" v-html="period[0] + ' ' + '第' + period[1] + '期'" class="period"></el-tag>
        </div>
      </div>
      <div class="room-entry">
        <el-button type="primary"
                   @click="goToMemberRoom(detail.member_id)" size="mini"
                   v-if="$store.state.logFlag"
        >房间</el-button>
        <p class="gap"></p>
        <el-button type="success" @click="goToMemberLive(detail.member_id)" size="mini">直播</el-button>
        <p class="gap"></p>
        <a :href="'https://www.weibo.com/u/' + detail.wb_uid" target="_blank">
          <el-button type="danger" size="mini">微博</el-button>
        </a>
      </div>
    </div>
    <div class="carousel-container">
      <el-carousel trigger="click" height="500px">
        <el-carousel-item v-for="item in fullPhoto" :key="item">
          <img :src="item | picPathFormat" alt="" @error="altImg(item)">
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
        period: [],
        color: '#' + this.$route.params.color
      }
    },
    methods: {
      goToMemberRoom(id){
        this.axios.post('/api/getRoomList',{token: this.$store.state.token,friends: [id]})
          .then(res => {
            this.$router.push("/roommsg/" + res.data.content[0].roomId)
          })
      },
      goToMemberLive(id){
        this.$router.push('/home/allmemberlive/' + id)
      },
      altImg(item){
        item = '../assets/alt_fullphoto.png'
        return item
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
    }
    .room-entry{
      position: absolute;
      right: 15px;
      .gap{
        height: 10px;
        margin: 0;
        padding: 0;
      }
    }
    .base-name{
      margin-left: 20px;
      .team-name{
        font-size: 15px;
        .team{
          color: #fff;
          border: 0px;
        }
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