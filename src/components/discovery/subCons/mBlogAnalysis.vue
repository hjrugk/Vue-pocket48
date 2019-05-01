<template>
  <div class="mblog-list">
    <div class="mblog-item left">
      <div class="inner">
        <div class="info">
          <div class="base-left">
            <div class="member-name">
              <span style="text-align: right;display: block;" v-html="memberOne.realName"></span>
              <span style="text-align: right;display: block;font-size: 12px;" v-html="memberOne.teamName"></span>
            </div>
            <span v-html="'粉丝：'+(one.followers_count||0)"></span>
          </div>
          <img :src="memberOne.avatar | picPathFormat" alt class="base-avatar">
        </div>
      </div>
    </div>
    <div class="mblog-item right">
      <div class="inner">
        <div class="info">
          <img :src="memberTwo.avatar | picPathFormat" alt class="base-avatar">
          <div class="base-right">
            <div class="member-name">
              <span style="text-align: left;display: block;" v-html="memberTwo.realName"></span>
              <span style="text-align: left;display: block;font-size: 12px;" v-html="memberTwo.teamName"></span>
            </div>
            <span v-html="'粉丝：'+(two.followers_count||0)"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mBlogList",
    data() {
      return {
        one: {}
      }
    },
    methods: {
      async getMBlogDataOne(){
        const one = await this.ajax('getMBlogData',{weiboUid: this.memberOne.wbUid})
        this.one = await one.data.userInfo
      }
    },
    props: {
      memberOne: Object,
      memberTwo: Object,
      two: Object
    },
    async mounted() {
      await this.getMBlogDataOne()
    }
  }
</script>

<style lang="less" scoped>
.mblog-list{
  width: 85%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
  .mblog-item{
    background-color: #fff;
    min-height: 300px;
    display: flex;
    box-shadow: 0 0 3px #eee;
    padding: 10px;
    .inner{
      .info{
        display: flex;
        align-items: flex-end;
        .base-avatar{
          width: 120px;
          height: 160px;
          border: 1px solid #fa7d3c;
        }
        .base-left{
          margin-right: 15px;
        }
        .base-right{
          margin-left: 15px;
        }
      }
    }
    &.right{
      justify-content: flex-start;
    }
    &.left{
      justify-content: flex-end;
    }
  }
}
@media screen and (max-width: 900px) {
  .mblog-list {
    width: 90%;
  }
}
@media screen and (min-width: 1368px) {
  .mblog-list{
    width: 1160px;
  }
}
</style>