<template>
  <div>
    <div class="user-info my-card" v-if="info">
      <div class="base-info flex-all-center">
        <p class="avatar">
          <img :src="info.avatar | picPathFormat" alt="">
        </p>
        <div>
          <p>
            {{info.nickName}}
            <el-tag size="mini" v-html="'lv.'+info.level"></el-tag>
          </p>
          <span v-html="'ID：'+info.userId"></span>
          <span v-html="'关注：' + friendsNum"></span>
        </div>
      </div>
      <div class="recommand-info flex-all-center" v-if="showInfo===3">
        <div class="recommand-layer">
          <div class="first flex-align-center" v-for="(item, index) in recommand" :key="index">
            <span class="text">{{index | translate}}</span>
            <span class="image" @click="getMemberDetail(item.info.real_name)">
              <img :src="item.info.avatar | picPathFormat" alt="">
            </span>
            <span class="text" v-html="item.info.real_name"></span>
            <span class="money">
              <span>贡献度</span><br>
              <span v-html="item.money"></span>
            </span>
          </div>
        </div>
      </div>
      <div v-else>加载列表中</div>
    </div>
    <div class="my-card" v-else>
      信息已丢失，请返回上一级
    </div>
  </div>
</template>
<script>
export default {
  name: 'userInfo',
  data(){
    return {
      info: this.$route.params.info,
      recommand: this.$route.params.recommand,
      friendsNum: this.$route.params.friendsNum,
      showInfo: 0
    }
  },
  methods: {
    getMemberName(id,key){ // 获取所推成员信息
      if(id!==0){
        this.axios.get('/api/getMemberName?id=' + id)
        .then(res => {
          this.recommand[key].info = res.data.info
          this.showInfo++
          })
      }else{
        this.recommand[key].info = {real_name: '保密',avatar: '/mediasource/profile_icon.png'}
        this.showInfo++
      }
    },
    triggerMethod(){ // 生成所推成员数组
      for (const key in this.recommand) {
        this.getMemberName(this.recommand[key].memberId,key)
      }
    },
    getMemberDetail(memberName){ // 跳转到成员列表页面
      if(memberName !== '保密'){
        let n = []
        if(memberName.includes('-')){
          n = memberName.split('-')
        }else{
          n = [memberName]
        }
        this.$router.push({name:'memberlist',params: {group: '1', memberName: n[n.length-1]}})
      }
    }
  },
  mounted() {
    this.triggerMethod()
  },
  filters: {
    translate: function(val){
      let newVal = ''
      switch (val) {
        case 'first':
          newVal = '首推'
          break;
        case 'second':
          newVal = '二推'
          break;
        case 'third':
          newVal = '三推'
          break;
        default:
          break;
      }
      return newVal
    }
  }
}
</script>
<style lang="less" scoped>
.user-info{
  text-align: center;
  padding: 20px;
  margin: 5px;
  .avatar{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 10px;
    border: 2px solid #ccc;
    overflow: hidden;
    img{
      height: 80px;
    }
  }
  .base-info{
    margin-bottom: 20px;
  }
  .base-info>div>span{
    font-size: 12px;
    color: #999;
    margin-left: 10px;
  }
}
.recommand-info{
  width: 100%;
  .first{
    width: 300px;
    justify-content: space-between;
    margin-bottom: 1px;
    padding: 10px;
    .text{
      width: 80px;
    }
    .image{
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 2px solid #ccc;
      overflow: hidden;
      cursor: pointer;
      img{
        width: 100%;
      }
    }
    .money{
      font-size: 12px;
      color: #999;
      span{
        line-height: 2;
      }
    }
  }
}
</style>

