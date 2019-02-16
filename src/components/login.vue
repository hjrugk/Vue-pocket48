<template>
  <div>
    <div class="logo flex-all-center" v-show="!$store.state.logFlag">
      <img src="../assets/login_logo.jpg" alt="">
      <p class="brand">口袋48</p>
    </div>
      <div class="login-container flex-justify-center" v-if="!$store.state.logFlag">
        <el-form status-icon ref="ruleForm2"
                 label-position="top"
                 label-width="100px" class="demo-ruleForm"
                 >
          <el-form-item label="手机：">
            <el-input autocomplete="off" v-model="account"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="password"></el-input>
          </el-form-item>
          <el-form-item class="flex-justify-center">
            <el-button type="primary" @click.prevent="login">登录</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    <div v-else class="user-info my-card">
      <img :src="userInfo.avatar | picPathFormat" alt="" width="80px">
      <div class="check">
        <el-button @click="getCheck" :type="type" size="mini" :disabled="checkFlag" v-html="txt"></el-button>
      </div>
      <p v-html="userInfo.nickName"></p>
      <p v-html="userInfo.userId"></p>
      <!--<p v-html="userInfo.gender?'女':'男'"></p>-->
      <!--<p v-html="userInfo.birthday"></p>-->
      <!--<p v-html="'Level ' + userInfo.level"></p>-->
      <!--<p v-html="'经验值: ' + userInfo.experience"></p>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        account: '',
        password: '',
        token: '',
        friends: [],
        userInfo: this.$store.state.userInfo,
        type: 'danger',
        checkFlag: false,
        txt: '打卡'
      }
    },
    methods: {
      login(){
        if(localStorage.getItem('userinfo')){
          let userInfo = JSON.parse(localStorage.getItem('userinfo'))
          this.$store.commit('saveUserInfo',userInfo.userInfo)
          this.token = userInfo.token
          this.$store.commit('setToken', userInfo)
          this.friends = userInfo.friends
          this.$store.commit('changeFlag')
          this.$router.push('/roomlist')
        }else{
          this.axios.post('/api/login', {account: this.account,password: this.password})
            .then(res => {
              this.password = ''
              this.account = ''
              this.$store.commit('saveUserInfo',res.data.content.userInfo)
              this.token = res.data.content.token
              this.$store.commit('setToken', res.data.content)
              this.friends = res.data.content.friends
              this.$store.commit('changeFlag')
              localStorage.setItem('userinfo', JSON.stringify(res.data.content))
              this.$router.push('/roomlist')
            })
        }
      },
      getCheck(e){
        let date = new Date().toDateString()
        let flag = JSON.parse(localStorage.getItem('isLogin'))
        if (flag.date === date){
          this.checkFlag = true
          this.txt= '已打卡'
        }else{
          this.checkFlag = false
          this.axios.post('/api/getCheck',{token:this.$store.state.token})
            .then(res => {
              if (res.data.status===200 || res.data.status===1001006){
                flag.checkFlag = true
                flag.date = new Date().toDateString()
                localStorage.setItem('isLogin',JSON.stringify(flag))
                e.target.innerHTML = '已打卡'
                this.$message({
                  message: '打卡成功',
                  type: 'success'
                });
              }
            })
        }
      }
    },
    computed: {
    },
    mounted() {
      this.getCheck()
    }
  }
</script>

<style lang="less" scoped>
  .logo{
    width: 100%;
    padding-top: 10px;
    img{
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
    .brand{
      font-size: 30px;
      font-family: 方正喵呜体;
    }
  }
.login-container{
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
  }
}
.user-info{
  text-align: center;
  padding: 5px;
  margin: 5px;
  .check{
    margin-top: 5px;
  }
}
</style>