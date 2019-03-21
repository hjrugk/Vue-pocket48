<template>
  <div>
    <div class="logo" v-show="!this.$store.getters.checkLogin">
      <img src="../../assets/images/login_logo.png" alt="">
      <p class="brand">口袋48</p>
    </div>
      <div class="login-container" v-if="!this.$store.getters.checkLogin">
        <el-form 
          status-icon ref="ruleForm2"
          label-position="top"
          label-width="100px" class="demo-ruleForm"
        >
          <el-form-item label="手机：">
            <el-input autocomplete="off" v-model="account"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="password"></el-input>
          </el-form-item>
          <el-form-item class="button">
            <el-button type="primary" @click.prevent="login">登录</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    <div v-else class="user-info my-card">
      <img title="点击查看更多信息" :src="userInfo.avatar | picPathFormat" alt="" @click="getRecommend">
      <div class="check">
        <el-button @click="getCheck" :type="type" size="mini" :disabled="checkFlag" v-html="txt"></el-button>
      </div>
      <div class="extra-info">
        <p>
          <span v-html="userInfo.nickName" class="user-name"></span>
          <el-tag size="mini" v-html="'lv.'+userInfo.level"></el-tag>
        </p>
        <p v-html="'ID: '+userInfo.userId"></p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    name: "login",
    data() {
      return {
        account: '',
        password: '',
        token: '',
        friends: [],
        userInfo: this.$store.getters.getUserInfo,
        type: 'danger',
        checkFlag: false,
        txt: '打卡',
        logFlag: this.$store.getters.checkLogin,
        showInfo: false,
        recommendInfo: false
      }
    },
    methods: {
      async login(){ // 登录
        if(localStorage.getItem('userinfo')){ // 非第一次登录
          let userInfo = JSON.parse(localStorage.getItem('userinfo'))
          this.$store.commit('saveUserInfo',userInfo.userInfo)
          this.token = userInfo.token
          this.$store.commit('setToken', userInfo.token)
          this.friends = userInfo.friends
        }else{ // 第一次登陆，存储用户信息
          const res = await this.ajax('/login',{account: this.account,password: this.password},'POST')
          if(res.status === 1001003) return this.$message.error(res.message)
          this.password = ''
          this.account = ''
          this.userInfo = res.content.userInfo
          this.$store.commit('saveUserInfo',res.content.userInfo)
          this.token = res.content.token
          this.$store.commit('setToken', res.content.token)
          this.logFlag = true
          localStorage.setItem('isLogin',JSON.stringify({logFlag: this.logFlag}))
          this.friends = res.content.friends
          localStorage.setItem('userinfo', JSON.stringify(res.content))
          this.$message('登陆成功，3秒后刷新')
          setTimeout(() => {
            window.location.reload()
          },3000)
        }
      },
      check(){
        if(!localStorage.getItem('isLogin')){ // 打卡签到
          return
        }
        let date = new Date().toDateString()
        let flag = JSON.parse(localStorage.getItem('isLogin'))
        if (flag.date && flag.date === date){
          this.checkFlag = true
          this.txt= '已打卡'
        }else{
          this.checkFlag = false
        }
      },
      async getCheck(){ // 检查是否已打卡签到
        const res = await this.ajax('/getCheck',{token:this.$store.state.token},'POST')
        if (res.status===200 || res.status===1001006){
          let flag = JSON.parse(localStorage.getItem('isLogin'))
          flag.checkFlag = true
          flag.date = new Date().toDateString()
          localStorage.setItem('isLogin',JSON.stringify(flag))
          this.checkFlag = true
          this.txt= '已打卡'
          this.$message(res.message)
        }else{
          return this.$message.error('请稍后再试')
        }
      },
      async getRecommend(){
        this.$router.push({
          name: 'userinfo',
          params: {
            id: this.userInfo.userId,
          }
        })
      }
    },
    mounted() {
      this.check()
    },
    computed: {
      ...mapState(['jujuInfo']) 
    }
  }
</script>

<style lang="less" scoped>
@import '../../assets/less/global';
  .logo{
    .flex-all-center();
    width: 100%;
    padding-top: 10px;
    img{
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
    .brand{
      font-size: 30px;
    }
  }
.login-container{
  .flex-justify-center();
  padding: 10px;
  .el-form{
    .el-form-item{
      width: 300px;
      .el-form-item__content{
        .el-input{
          .el-input__inner{
            width: 200px!important;
          }
        }
      }
    }
    .button{
      .flex-justify-center();
    }
  }
}
.user-info{
  text-align: center;
  padding: 10px;
  margin: 5px;
  img{
    width: 80px;
    height: 80px;
    cursor: pointer;
    border-radius: 50%;
    border: 2px solid #ccc;
  }
  .check{
    margin-top: 5px;
  }
  .extra-info{
    .user-name{
      margin-right: 10px;
    }
  }
  .flex-justify-center{
    display: flex;
    justify-content: center;
  }
}
</style>