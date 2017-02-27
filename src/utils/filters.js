export default {
  format(val,str){
    if(!val) return

    let date = new Date(val),
        timeArr = str.match(/[YMDhms]/g)

    let [year,month,day,hour,minute,seconds] = [
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds()
        ]

      month = (month<10) ? ('0' + month) : month;
      day = (day<10) ? ('0' + day) : day;
      hour = (hour<10) ? ('0' + hour) : hour;
      minute = (minute<10) ? ('0' + minute) : minute;
      seconds = (seconds<10) ? ('0' + seconds) : seconds;

      timeArr.forEach((v,i) => {
        switch(v){
          case 'Y': str = str.replace(/Y/,year);break;
          case 'M': str = str.replace(/M/,month);break;
          case 'D': str = str.replace(/D/,day);break;
          case 'h': str = str.replace(/h/,hour);break;
          case 'm': str = str.replace(/m/,minute);break;
          case 's': str = str.replace(/s/,seconds);break;
        }
      })
      return str;
  }
}