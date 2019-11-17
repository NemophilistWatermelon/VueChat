
//格式化时间
module.exports = formatTime;
     function formatTime(time) {    
       const  year = time.getFullYear(),
            month = time.getMonth() + 1,
            date = time.getDate(),
            hour = time.getHours(),
            minute = time.getMinutes(),
            second = time.getSeconds();
            function toDou(temp){
                return temp < 10 ? '0' + temp : temp;
            }
            return year + '-' + toDou(month) + '-' + toDou(date) + ' ' + toDou(hour) + ':' + toDou(minute) + ':' + toDou(second);      
    }


