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
      <recommend></recommend>
    </div>
    <div class="my-card" v-else>
      信息已丢失，请返回上一级
    </div>
  </div>
</template>
<script>
import recommend from './recommend'
export default {
  name: 'userInfo',
  data(){
    return {
      info: this.$route.params.info,
      friendsNum: this.$route.params.friendsNum,
    }
  },
  methods: {
    
  },
  components: {
    recommend
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
</style>

