<template>
  <div class="detail-container">
    <div class="inner-container">
      <div class="base-info">
        <img
          :src="detail.avatar | picPathFormat"
          alt
          class="base-avatar"
          :style="'border: 1px solid '+color"
        >
        <div class="base-name">
          <div class="real-name">
            <span v-html="detail.real_name" class="real"></span>
            <el-tag class="follow-tag" v-if="isFollowed" @click="unfollow" size="mini">取消关注</el-tag>
            <el-tag class="follow-tag" v-else @click="follow" type="danger" size="mini">关注</el-tag>
            <p v-html="detail.nick_name" class="nick"></p>
          </div>
          <div class="team-name">
            <el-tag v-html="team" class="team" :color="color | overseaFilter"></el-tag>
            <el-tag type="success" v-html="period[0] + ' ' + '第' + period[1] + '期'" class="period"></el-tag>
          </div>
        </div>
        <div class="room-entry">
          <el-button
            type="primary"
            @click="goToMemberRoom(detail.member_id)"
            size="mini"
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
      <div
        class="carousel-container"
        :style="'border-bottom: 1px solid '+color+';border-top: 1px solid '+color"
      >
        <el-carousel trigger="click" height="500px">
          <el-carousel-item v-for="item in fullPhoto" :key="item">
            <img :src="item | picPathFormat" alt @error="altImg(item)">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="extra-info">
        <p v-html="'加入时间：' + detail.ctime.split(' ')[0]"></p>
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
  </div>
</template>

<script>
export default {
  name: "memberdetail",
  data() {
    return {
      fullPhoto: [],
      period: [],
      id: this.$route.params.id,
      isFollowed: false
    };
  },
  methods: {
    async goToMemberRoom(id) { // 跳转到成员房间
      const res = await this.ajax('/getRoomList',{token:this.$store.getters.getToken,friends:[id]},'POST')
      if(res.content.length){
        localStorage.setItem('bgPath',JSON.stringify(res.content[0].bgPath))
        this.$router.push({name: 'roommsg',params:{id:res.content[0].roomId,bgPath: res.content[0].bgPath}});
      }else{
        this.$message('该房间未创建')
      }
    },
    goToMemberLive(id) { // 跳转到成员直播列表
      this.$router.push("/home/memberlive/" + id);
    },
    altImg(item) {
      item = "../assets/alt_fullphoto.png";
      return item;
    },
    follow(){ // 关注成员
      let info = JSON.parse(localStorage.getItem('userinfo'))
      info.friends.push(parseInt(this.id))
      localStorage.setItem('userinfo',JSON.stringify(info))
      this.isFollowed = true
      this.checkisFollowed()
    },
    unfollow(){ //取关成员
      let info = JSON.parse(localStorage.getItem('userinfo'))
      let index = info.friends.findIndex(item => {
        return parseInt(item)===parseInt(this.id)
      })
      info.friends.splice(index,1)
      localStorage.setItem('userinfo',JSON.stringify(info))
      this.isFollowed = false
      this.checkisFollowed()
    },
    checkisFollowed(){ // 检查是否关注该成员
      let info = JSON.parse(localStorage.getItem('userinfo'))
      info.friends.forEach(item => {
        if(item===parseInt(this.id)){
          this.isFollowed = true
        }
      })
    }
  },
  created() {
    for (let i = 1; i < 5; i++) { // 根据成员信息生成成员的轮播图列表
      this.fullPhoto.push(this.detail["full_photo_" + i]);
    }
    this.period = this.periodHandler(this.detail.period); // 得到成员是哪一期
  },
  computed: {
    color: function() { // 成员队伍主色
      return "#" + this.info.info.color;
    },
    detail: function() {
      return this.info.item;
    },
    info: function () {
      return JSON.parse(localStorage.getItem('detail'))
    },
    team: function () { // 成员所在队伍
      return this.info.info.team_name
    }
  },
  mounted() {
    this.checkisFollowed()
  },
  filters:{
    overseaFilter(val){
      if(val === '#FFFFFF'){
        return '#8ed2f5'
      }else{
        return val
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/less/global';
.detail-container {
  .flex-justify-center();
  width: 100%;
  box-sizing: border-box;
  .inner-container{
    padding: 15px;
    width: 85%;
    background-color: #fff;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    .base-info {
      height: 100px;
      padding-bottom: 20px;
      display: flex;
      justify-content: flex-start;
      .base-avatar {
        height: 100%;
      }
      .room-entry {
        position: absolute;
        right: 7.5%;
        .gap {
          height: 10px;
          margin: 0;
          padding: 0;
        }
      }
      .base-name {
        margin-left: 20px;
        .team-name {
          font-size: 15px;
          .team {
            color: #fff;
            border: 0px;
          }
          .period {
            margin-left: 5px;
          }
        }
        .real-name {
          font-size: 18px;
          .follow-tag{
            cursor: pointer;
          }
          .real{
            padding-right: 5px;
          }
          .nick {
            font-size: 15px;
          }
        }
      }
    }
    .carousel-container {
      margin-top: 10px;
      text-align: center;
    }
  }
}
</style>