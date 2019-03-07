export default function(url){
  let type = ''
  if(url.includes('mp4')){
    type = 'mp4'
  }else if(url.includes('flv')){
    type = 'flv'
  }else{
    type = 'application/x-mpegURL'
  }
  return type
}