<template>
  <div class="login-container">
    <el-form status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm" inline v-if="!$store.state.logFlag">
      <el-form-item label="用户名">
        <el-input autocomplete="off" v-model="account"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="login">登录</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <div v-else class="user-info">
      <p v-html="userInfo.nickName"></p>
      <p v-html="userInfo.level"></p>
      <p v-html="userInfo.userId"></p>
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
        userInfo: this.$store.state.userInfo
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
      }
    }
  }
</script>

<style lang="less" scoped>
.login-container{
  padding: 10px;
}
</style>