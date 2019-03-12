<template>
  <div class="about">
    <div class="my-card card-item flex-all-center">
      <p class="declare">本项目仅供个人娱乐，请勿用作其他用途</p>
      <p class="mail flex-all-center">联系我：
        <a href="mailto:tassjjjj@live.cn">tassjjjj@live.cn</a>
        <a target="_blank" href="https://www.github.com/hjrugk/Vue-pocket48">
          <span class="address">
            Star<i class="el-icon-star-on"></i>
          </span>
        </a>
      </p>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.about {
  padding: 10px;
  .card-item{
    text-align: center;
    flex-wrap: wrap;
    .mail{
      width: 100%;
      a{
        text-decoration: none;
      }
      .address{
        background-color: #eee;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 60px;
        color: #000;
        margin-left: 10px;
        padding: 0 2px;
        font-size: 14px;
      }
    }
  }
}
</style>