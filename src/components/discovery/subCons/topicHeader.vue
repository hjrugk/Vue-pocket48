<template>
  <div v-if="mblogData.pageInfo" class="topic-header-container" :style="'background-image: url('+mblogData.pageInfo.portrait+');'">
    <div class="bg-mask"></div>
    <div class="topic-portrait">
      <img :src="mblogData.pageInfo.portrait" alt="">
      <div class="topic-name">
        <span style="margin-right: 10px;">{{coupleName}}</span>
        <el-tag class="follow-tag" v-if="isFollowed" @click="unfollow" size="mini">已关注</el-tag>
        <el-tag class="follow-tag" v-else @click="follow" type="danger" size="mini">关注</el-tag>
        <br>
        <span class="detail-desc">{{'简介: '+mblogData.pageInfo.detail_desc}}</span>
      </div>
    </div>
    <div class="mblog-data">
      <div class="mblog-data-detail" v-for="(item, i) in desc" :key="i" v-html="item"></div>
    </div>
  </div>  
</template>
<script>
export default {
  data(){
    return {
      isFollowed: false
    }
  },
  props: {
    memberOne: Object,
    memberTwo: Object,
    mblogData: Object,
    coupleName: String,
    couple: Object
  },
  computed: {
    desc(){
      return this.mblogData.pageInfo.desc_more[0].split(/\s/)
    }
  },
  methods: {
    follow(){
      let couples = JSON.parse(localStorage.getItem("couples"));
      couples.push(this.couple);
      localStorage.setItem("couples", JSON.stringify(couples));
      this.isFollowed = true;
      this.checkisFollowed();
    },
    checkisFollowed(){
      let couples = JSON.parse(localStorage.getItem("couples"));
      couples.forEach(item => {
        if (item.coupleId === this.couple.coupleId) {
          this.isFollowed = true;
        }
      });
    },
    unfollow() {
      //取关成员
      this.$confirm('是否要取消关注？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let couples = JSON.parse(localStorage.getItem("couples"));
        let index = couples.findIndex(item => {
          return item.coupleId === this.couple.coupleId;
        });
        couples.splice(index, 1);
        localStorage.setItem("couples", JSON.stringify(couples));
        this.isFollowed = false;
        this.checkisFollowed();
        this.$message({
          type: 'success',
          message: '取关成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        });
      });
    }
  },
  mounted() {
    this.checkisFollowed()
  }
}
</script>
<style lang="less" scoped>
.topic-header-container{
  width: 85%;
  padding: 20px 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  .bg-mask{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    opacity: 0.7;
  }
  .topic-portrait{
    display: flex;
    z-index: 999;
    margin-left: 15px;
    align-items: flex-end;
    img{  
      border: 3px solid #fff;
      box-shadow: 0 0 3px #ddd;
    }
    .topic-name{
      padding: 0 20px;
      font-size: 30px;
      .detail-desc{
        font-size: 14px;
        padding-left: 2px;
        max-width: 300px;
      }
    }
  }
  .mblog-data{
    position: absolute;
    bottom: 0;
    right: 0;
    padding-bottom: 20px;
    margin-right: 15px;
    .mblog-data-detail{
      font-size: 14px;
      width: 120px;
      color: #555;
      letter-spacing: 2px;
      text-align: right;
      padding: 5px;
    }
  }
  @media screen and (max-width: 600px) {
    .mblog-data{
      display: none;
    }
  }
}
@media screen and (max-width: 900px) {
  .topic-header-container {
    width: 90%;
  }
}
@media screen and (min-width: 1368px) {
  .topic-header-container{
    width: 1160px;
  }
}
</style>


