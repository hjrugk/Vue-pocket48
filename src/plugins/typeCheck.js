export default function(url){
  // 返回视频格式
  let type = ''
  if(url.includes('mp4')){
    type = 'video/mp4'
  }else if(url.includes('flv')){
    type = 'flv'
  }else{
    type = 'application/x-mpegURL'
  }
  return type
}