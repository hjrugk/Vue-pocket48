export default function(url){
  let type = ''
  if(url.includes('mp4')){
    type = 'video/mp4'
  }else if(url.includes('flv')){
    type = 'video/flv'
  }else{
    type = 'application/x-mpegURL'
  }
  return type
}