<template>
  <div class="collapse-content">
    <div class="collapse-title">
      <div class="title-content">
        <span :style="'color: #'+team.teamColor+';'" v-html="team.teamName"></span>
        <img class="team-logo" :src="team.teamLogo | picPathFormat" alt="">
      </div>
      <div class="arrow">
        <i class="el-icon-arrow-down" @click="showAllList = !showAllList"></i>
      </div>
    </div>
    <div class="member-list" :class="{showAll:showAllList}">
      <div class="member-item" 
        v-for="(member, i) in memberList" 
        :key="i" v-html="member.realName" 
        @click="getTheLiveList(member.userId)"
        v-show="member.teamId===team.teamId&&member.status===1"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    team: Object,
    memberList: Array
  },
  data() {
    return {
      showAllList: false
    }
  },
  methods: {
    getTheLiveList(userId){
      this.$emit('changelivelist',{userId})
    }
  }
}
</script>
<style lang="less">
.collapse-content{
  .collapse-title{
    display: flex;
    justify-content: space-between;
    // margin-top: 10px;
    padding: 10px 20px 0 20px;
    .title-content{
      .team-logo{
        width: 20px;
        margin-left: 5px;
      }
    }
  }
  .member-list{
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    padding: 20px;
    grid-gap: 10px;
    height: 10px;
    background-color: #fff;
    overflow: hidden;
    transition: all 0.2s ease-out;
    .member-item{
      font-size: 14px;
      line-height: 25px;
      text-align: center;
      background-color: #eee;
      width: 80px;
      cursor: pointer;
      height: 25px;
    }
  }
  .showAll{
    height: auto;
  }
  @media screen and (max-width: 600px) {
    .member-list{
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>


