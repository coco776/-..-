import Vue from 'vue'
/* 歌曲时长的过滤器 */
Vue.filter('timeFormat', function (time) {
    if (typeof time === 'undefined') return 0
    let minutes = parseInt(time / 60); // 获取时长分钟
    let seconds = parseInt(time % 60); // 获取时长秒数
    seconds = seconds < 10 ? '0' + seconds : seconds // 秒
    minutes = minutes < 10 ? '0' + minutes : minutes
    return minutes + ':' + seconds
})
Vue.filter('dateFormat', function(time){
    let date = new Date(time);
    let year = date.getFullYear() + '-';
    let month = date.getMonth()+1;
    let day = date.getDay();
    month = month<10 ? '0'+month + '-' : month+'-';
    day = day<10 ? '0'+day : day;
    let str = String(year) + String(month) + String(day);
    console.log(str);
    return str;
})
Vue.filter('formulateCnt', function(val) {
    if (val > 100000000) {
      return `${Math.round(val / 100000000)}亿`;
    }
    if (val > 10000) {
      return `${val / 10000}万`;
    }
  },)