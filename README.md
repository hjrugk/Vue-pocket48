# vue-pocket48

使用 [Vue](https://vuejs.org/) + [Node](https://nodejs.org) 做的 web 版口袋48，使用的API参照 [xsaiting/pocket48-grab](https://github.com/xsaiting/pocket48-grab/wiki)

## 如何使用？

1. 安装依赖

    ```shell
    npm install
    ```

2. 打包

    ```shell
    npm run build
    ```

3. 启动服务端

    ```shell
    node app.js
    ```

4. 在浏览器中输入 `localhost:3000`

## 主要功能

* 成员房间消息
* 成员直播/录播（改用Aliplayer播放）
* 直播贡献榜/滚动弹幕
* 公演录播
* 各队成员列表(每月更新)
* 各成员详细信息
* 关注/取关成员房间（仅在本地有效）
* 成员房间聚聚留言
* 成员房间视频
* 成员房间翻牌
* 成员房间音频([参考文章](http://www.cnblogs.com/yuhongda0315/p/5224188.html))
* 查看聚聚信息

## 说明

* 公演录播在遇到跨域播放问题时会自动切换到下一个能够播放的地址。如果播放器显示 `The m3u8 file loaded failed`，请点击 `Retry`。