// import io from 'socket.io-client';
// var log = console.log.bind(console);
// const CHAT = {
//     MSG:"",
//     message(obj) {
//         //传值
//         typeof obj == Object ? this.socket.emit("message", obj) : CHAT.Error();
       

//     },
//     init() {
//         this.socket = io.connect("http://localhost:5000/", { 'force new connection': true })
//         this.socket.on('connect', function () {
//             log('已连接');
//         })
//         CHAT.GET_VAL();
//     },
//     GET_VAL() { 
//         this.socket.on("returnMsg", data => {
//             CHAT.MSG = data;
//             return CHAT.MSG ;
//         })
//     },
//     Error() {
//         this.socket.emit("disconnect", error => {
//             log(error);
//         })
//     },

// }
// export default CHAT;