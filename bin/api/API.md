# API

1. 最新音乐排行榜 TOP100

   * 请求方法 `GET`
   * 请求地址 `https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923`

2. 随机推荐

   * 请求方法 `GET`
   * 请求地址 `https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=36&_=1520777874472`

3. 音乐搜索

   * 请求方法 `GET`
   * 请求地址 `https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=30&w=简单爱`
   * 参数：
  
     * p 页数
     * n 每页结果数
     * w 搜索关键词

4. 专辑封面

   * 拼接URL `"http://imgcache.qq.com/music/photo/album_300/" + albumid%100 + "/300_albumpic_" + albumid + "_0.jpg"`

5. 播放地址

   * 获取token

     * 请求方法 `GET`
     * 请求地址 `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid=' + songmid + '&filename=C400' + songmid + '.m4a&guid=126548448`
     * 参数

       * `songmid` 获取到的 `songmid`
       * `filename` 拼接方式为 `'C400' + songid + '.m4a'`

     * 数据格式

      ```json
      res.data
        cid: 205361747
        code: 0
        data:
          expiration: 80400
          items: Array(1)
            0:
              filename: "C400003u97bM1qKjX6.m4a"
              songmid: "003u97bM1qKjX6"
              subcode: 0
              vkey: "4C16B86489CEF164085F999780790433A060034B93B40EB6AD67A8C96D1AB47E2B43BDF6A7C797E75BFB03DD8FD1B9A5843AFCB3E58BD68D"
        userip: "117.132.38.138"
      ```

   * 播放地址拼接 `'http://ws.stream.qqmusic.qq.com/' + filename+'?fromtag=0&guid=126548448&vkey=' + vkey`  

6. common header
  Content-Type:application/json
  Connection:keep-alive
  Host:pocketapi.48.cn
  accept:*/*
  Accept-Language:zh-Hans-CN;q=1
  User-Agent:PocketFans201807/6.0.0 (iPhone; iOS 12.2; Scale/2.00)
  Accept-Encoding:gzip, deflate
  appInfo:{"vendor":"apple","deviceId":"0","appVersion":"6.0.0","appBuild":"190409","osVersion":"12.2.0","osType":"ios","deviceName":"iphone","os":"ios"}


6. 口袋48登录

  POST https://pocketapi.48.cn/user/api/v1/login/app/mobile
  Common-Headers

  form-data: {
    "mobile",
    "pwd"
  }

  response: {
    "status": 200,
    "success": true,
    "message": "OK",
    "content": {
        "userInfo": {
            "userId": 12345678910,
            "nickname": "xxxxxxx",
            "avatar": "/mediasource/avatar/20200202/xxxxxxxxx.png",
            "exp": xxx,
            "level": x,
            "gender": x,
            "birthday": "xxxx-xx-xx",
            "city": "x",
            "verification": false,
            "money": x,
            "support": xx,
            "permission": {
                "post": {
                    "view": true,
                    "create": true,
                    "update": false,
                    "delete": false,
                    "managerGroup": null,
                    "managerTeam": null
                }
            },
            "roleName": "user",
            "roleId": 1,
            "deviceId": "0",
            "bindInfo": [
                {
                    "bindType": "MOBILE",
                    "uniqueId": "12345678910",
                    "nickname": "12345678910"
                },
                {
                    "bindType": "WX",
                    "uniqueId": "xxx",
                    "nickname": "xxx"
                },
                {
                    "bindType": "WB",
                    "uniqueId": "xxx",
                    "nickname": "xxx"
                },
                {
                    "bindType": "QQ",
                    "uniqueId": "xxx",
                    "nickname": "xxx"
                },
                {
                    "bindType": "SG",
                    "uniqueId": "xxx",
                    "nickname": "xxx"
                },
                {
                    "bindType": "BD",
                    "uniqueId": "xxx",
                    "nickname": "xxx"
                },
                {
                    "bindType": "HW",
                    "uniqueId": "xxx",
                    "nickname": "xxx"
                }
            ],
            "badgeCount": x,
            "friends": x,
            "followers": x,
            "token": "xxx",
            "bigSmallInfo": {
                "relationship": true,
                "bigUserInfo": {
                    "userId": xxx,
                    "nickname": "xxx",
                    "avatar": "/mediasource/avatar/20200202/xxxxxx.png"
                },
                "smallUserInfo": []
            },
            "bgImg": "",
            "badge": [
                "/mediasource/badge/small/ddjj_1_s.png"
            ],
            "vip": false,
            "teamLogo": null,
            "card": 0
        },
        "token": "xxx"
    }
}

7. 成员信息

8. 口袋房间
  POST https://pocketapi.48.cn/im/api/v1/chatroom/msg/list/homeowner
  Common-Headers
  token: xxx

  form-data: {
    "ownerId": xxx,
    "roomId": xxx
  }

  response: {
    "status": 200,
    "success": true,
    "message": "OK",
    "content": {
        "message": [
            {
                "serverId": 325176938762932224,
                "msgidClient": "16b884d3-aa7e-4b2c-80c0-41109573f008",
                "msgTime": 1555457823981,
                "msgType": "TEXT",
                "bodys": "我们琦琦来了",
                "extInfo": "{\"config\":{\"build\":\"190409\",\"phoneName\":\"iPhone XS Max\",\"version\":\"6.0.0\",\"mobileOperators\":\"ドコモ\",\"ip\":\"error\",\"phoneSystemVersion\":\"12.2\"},\"roomId\":\"67313743\",\"module\":\"session\",\"sessionRole\":2,\"sourceId\":\"67313743\",\"text\":\"我们琦琦来了\",\"bubbleId\":\"283923487550767106\",\"messageType\":\"TEXT\",\"fromApp\":\"201811\",\"user\":{\"roleId\":3,\"vip\":false,\"nickName\":\"洪珮雲\",\"teamLogo\":\"/mediasource/teamLogo2/all/snh48_h2.png\",\"userId\":63558,\"avatar\":\"/mediasource/avatar/1509551046109l79Z0FIAD2.jpg\"}}"
            },
            {
                "serverId": 324988463942012928,
                "msgidClient": "2a12b0cd-da24-4173-a3b0-30a5d8755f2f",
                "msgTime": 1555412887975,
                "msgType": "TEXT",
                "bodys": "",
                "extInfo": "{\"liveCover\":\"/20190416/1555412884827Hyc3PCLx0N.jpg\",\"liveTitle\":\"进来\",\"liveId\":\"324988455536627712\",\"shortPath\":\"live/playdetail?id=324988455536627712\",\"fromApp\":\"201811\",\"roomId\":\"67313743\",\"module\":\"SESSION\",\"sourceId\":\"67313743\",\"messageType\":\"LIVEPUSH\",\"user\":{\"userId\":63558,\"nickName\":\"SNH48-洪珮雲\",\"teamLogo\":\"/mediasource/teamLogo2/all/snh48_h2.png\",\"avatar\":\"/mediasource/avatar/1509551046109l79Z0FIAD2.jpg\",\"badge\":[],\"level\":1,\"roleId\":3,\"vip\":false},\"sessionRole\":\"2\"}"
            },
            {
                "serverId": 324934045800402944,
                "msgidClient": "205b59f6-cbab-42a4-9b1d-b7024a2b88c0",
                "msgTime": 1555399913454,
                "msgType": "IMAGE",
                "bodys": "{\"size\":728311,\"ext\":\"jpg\",\"w\":3024,\"url\":\"https:\\/\\/nim.nosdn.127.net\\/NDA5MzEwOA==\\/bmltYV83MjUxODk0Mjc2XzE1NTUzMjcyNjc3NDRfMDk5M2I2MTctZjMyOC00YzIxLWEyNDctNjQzZWZmOTM3MmVl\",\"md5\":\"1450ba5ee651d98372d6eff2f7fe2e7d\",\"h\":4032}",
                "extInfo": "{\"config\":{\"build\":\"190409\",\"phoneName\":\"iPhone XS Max\",\"version\":\"6.0.0\",\"mobileOperators\":\"ドコモ\",\"ip\":\"192.168.1.253\",\"phoneSystemVersion\":\"12.2\"},\"roomId\":\"67313743\",\"module\":\"session\",\"sessionRole\":2,\"sourceId\":\"67313743\",\"bubbleId\":\"283923487550767106\",\"messageType\":\"IMAGE\",\"fromApp\":\"201811\",\"user\":{\"roleId\":3,\"vip\":false,\"nickName\":\"洪珮雲\",\"teamLogo\":\"/mediasource/teamLogo2/all/snh48_h2.png\",\"userId\":63558,\"avatar\":\"/mediasource/avatar/1509551046109l79Z0FIAD2.jpg\"}}"
            },
            {
                "serverId": 324929602715455488,
                "msgidClient": "6e4ae9ed-6f72-4e59-b9b9-d2cbeabbd07f",
                "msgTime": 1555398854241,
                "msgType": "TEXT",
                "bodys": "偶像翻牌",
                "extInfo": "{\"question\":\"昨天更新了未读消息红点点差点儿把本强迫症搞崩溃辽，下了又卸卸了又下，这要不是修复bug了我就彻底跟口袋说886  新版本还在习惯中，先来给群主送1、🍗(*^o^*)\",\"answer\":\"这个红点点搞的我也很烦 我有强迫症！就一定要点掉 但是现在好像只现实小偶像的消息了吧～果然我们芭是很亲民的嘛 慢慢在改进了 还有不喜欢的地方一定要提出来哦 虽然我也不能做什么嘻嘻\",\"questionId\":\"324923428347645952\",\"answerId\":\"279296\",\"fromApp\":\"201811\",\"roomId\":\"67313743\",\"module\":\"SESSION\",\"sourceId\":\"67313743\",\"messageType\":\"FLIPCARD\",\"user\":{\"userId\":63558,\"nickName\":\"SNH48-洪珮雲\",\"teamLogo\":\"/mediasource/teamLogo2/all/snh48_h2.png\",\"avatar\":\"/mediasource/avatar/1509551046109l79Z0FIAD2.jpg\",\"badge\":[],\"level\":1,\"roleId\":3,\"vip\":false},\"sessionRole\":\"2\"}"
            },
        ],
        "nextTime": 1555397120564
    }
}

9. 成员直播
  POST https://pocketapi.48.cn/live/api/v1/live/getLiveOne
  Common-Headers

  form-data: {
    "liveId": xxx
  }

  response: {
    "status": 200,
    "success": true,
    "message": "OK",
    "content": {
        "liveId": "324988455536627712",
        "roomId": "3870027",
        "onlineNum": 6048,
        "type": 1,
        "liveType": 1,
        "review": true,
        "needForward": false,
        "systemMsg": "",
        "msgFilePath": "https://source.48.cn/live/lrc/20190416/01165e31-b3ab-4420-b7fe-5dfd28e851d9.lrc",
        "playStreamPath": "http://cychengyuan-vod.48.cn/63558/20190416/cy/324988455536627712.m3u8",
        "user": {
            "userId": "63558",
            "userName": "SNH48-洪珮雲",
            "userAvatar": "/mediasource/avatar/1509551046109l79Z0FIAD2.jpg",
            "level": 1
        },
        "topUser": [],
        "mute": false
    }
}

10. 成员录播

    POST https://pocketapi.48.cn/live/api/v1/live/getLiveList
    Common-Header

    form-data: {
        "liveId": 0,
        "record": true, // true 为录播，false 为直播
        "userId": userId
    }

    response: {
    "status": 200,
    "success": true,
    "message": "OK",
    "content": {
        "next": "325032930535346176",
        "liveList": [
            {
                "liveId": "325214437644242944",
                "coverPath": "/20190416/1555387399078225ft9UL3r.jpg",
                "title": "唱歌电台",
                "liveType": 2,
                "status": 3,
                "ctime": "1555466764126",
                "userInfo": {
                    "userId": "874698",
                    "nickname": "IDFT-鄢羽蝶",
                    "avatar": "/mediasource/avatar/20190410/1554910632819tY6VCI2M8S.jpg",
                    "badge": [],
                    "level": 1,
                    "isStar": true,
                    "friends": "0",
                    "followers": "0",
                    "teamLogo": "/mediasource/teamLogo/all/idft_logo_2.png",
                    "signature": "",
                    "bgImg": "",
                    "vip": false,
                    "userRole": 3
                }
            }
        ]
    }
}

11. 公演录播

    POST https://pocketapi.48.cn/live/api/v1/live/getOpenLiveList
    Common-Header

    form-data: {
        "groupId": groupId,
        "liveId": 0,
        "record": false // false 为直播，true为录播
    }

    response: {
    "status": 200,
    "success": true,
    "message": "OK",
    "content": {
        "next": "324479006229204992",
        "liveList": [
            {
                "liveId": "324479006229204992",
                "title": "星梦mini live",
                "coverPath": "/mediasource/live/15540890267958nCf4G0E1Z.jpg",
                "status": 1,
                "stime": "1555493100000",
                "teamList": [],
                "liveType": 0
            },
            {
                "liveId": "324479006254370816",
                "title": "《N.E.W》剧场公演",
                "coverPath": "/mediasource/live/1554800321627c9vn4F10Rc.jpg",
                "status": 1,
                "stime": "1555499700000",
                "teamList": [
                    {
                        "teamId": 1002,
                        "groupId": 10,
                        "teamName": "TEAM NII",
                        "teamLogo": "/mediasource/teamLogo2/all/snh48_n2.png",
                        "teamColor": "AD85BA"
                    }
                ],
                "liveType": 0
            }
        ]
    }
}

12. 用户信息

    POST https://pocketapi.48.cn/user/api/v1/user/info/home
    Common-Header
    token

    form-data: {
        "userId": userId
    }

    response: {
    "status": 200,
    "success": true,
    "message": "OK",
    "content": {
        "baseUserInfo": {
            "userId": xxx,
            "nickname": "xxx",
            "avatar": "/mediasource/avatar/20200202/xxx.png",
            "badge": [
                "/mediasource/badge/small/ddjj_1_s.png"
            ],
            "level": x,
            "isStar": false,
            "friends": 0,
            "followers": 0,
            "teamLogo": "",
            "signature": "",
            "bgImg": "",
            "vip": false,
            "userRole": 1
        },
        "isFriend": false,
        "topRank": [],
        "clubCount": 0,
        "rankNum": 0
    }
}

13. 搜索成员

    POST https://pocketapi.48.cn/im/api/v1/im/search
    Common-Header

    form-data: {
        "name": memberName
    }

    response: {
    "status": 200,
    "success": true,
    "message": "OK",
    "content": {
        "data": [
            {
                "targetName": "梦想小镇",
                "targetAvatar": "/20190416/1555387458116zrqZ15w7mF.jpg",
                "targetType": 0,
                "targetId": "67362351", // roomId
                "msg": "超级弹幕我没看见呢",
                "msgTime": 1555516934956,
                "icon": [],
                "ownerId": "614727",
                "ownerName": "GNZ48-李姗姗",
                "totalMsgCount": 0
            }
        ]
    }
}

13. 公演详情

    POST https://pocketapi.48.cn/live/api/v1/live/getOpenLiveOne
    Common-Header

    form-data: {
        "liveId": liveId
    }

    response: {
    "status": 200,
    "success": true,
    "message": "OK",
    "content": {
        "liveId": "324479006229204993",
        "title": "星梦mini live",
        "coverPath": "/mediasource/live/15540891274719B18d33a87.jpg",
        "roomId": "3869841",
        "status": 1,
        "playNum": "509517",
        "stime": "1555579500000",
        "hasPraise": false,
        "praiseNum": "665",
        "dengPaiGiftId": "266592592682893312",
        "danMuInfo": {
            "giftId": "266592609913094144",
            "money": "10"
        },
        "type": 2,
        "liveJoiners": [],
        "playStreams": [],
        "module": {
            "resourceId": "324479006229204993",
            "resourceType": 1006,
            "resourceMd": ""
        },
        "mute": false,
        "liveType": 0
    }
}

14. 房间信息

    POST https://pocketapi.48.cn/im/api/v1/im/room/info/type/source
    Common-Header
    token

    form-data: {
        "sourceId": "userId",
        "type": 0
    }

    response: {
    "status": 200,
    "success": true,
    "message": "OK",
    "content": {
        "roomInfo": {
            "roomId": "67313743",
            "roomName": "聊天室A",
            "roomAvatar": "/mediasource/room/1493277152571M4Maby92gt.jpg",
            "roomTopic": "想做你们的特等奖",
            "ctime": "1481461750000",
            "roomType": 0,
            "chatType": 1,
            "ownerId": "63558",
            "ownerName": "SNH48-洪珮雲",
            "icon": [
                "/mediasource/teamLogo2/all/snh48_h2.png"
            ],
            "bubbleId": "283923487550767106",
            "bgImg": "/mediasource/room/1554311106719BGqZQ47P26.jpg"
        },
        "userFunction": {
            "sendText": true,
            "sendImage": false,
            "sendVideo": false,
            "sendVoice": false,
            "sendGif": false,
            "sendEmoticon": true,
            "sendForward": false,
            "sendGift": true,
            "openAudio": false
        },
        "roomRole": "0",
        "userConfig": {
            "bgImg": "/mediasource/room/1554311106719BGqZQ47P26.jpg",
            "bubbleId": "0"
        }
    }
}

15. 信息同步

    POST https://pocketapi.48.cn/user/api/v1/client/update/group_team_star
    Common-Header

    form-data: {}

    response: {
        "status": 200,
        "success": true,
        "message": "OK",
        "content": {
            officialInfo,
            domainInfo,
            starInfo,
            starAdjunctInfo,
            groupInfo,
            periodInfo,
            teamInfo,
            starOfficialRelationInfo
        }
    }