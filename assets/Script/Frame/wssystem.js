"use strict";

var message_pb = require('message_pb');

class WsSystem {
  constructor() {
    this.ip = null;
    this.url = null;
    this.port = null;
    this.ws = null;
  }

  static getInstance() {
    if (!WsSystem.instance) {
      WsSystem.instance = new WsSystem();
    }
    return WsSystem.instance;
  }

  init(ip,port){
      this.ip = ip;
      this.port = port;
      this.url = "ws://" + this.ip + ":" + this.port;
      cc.log("set url" + this.url)
  }

  connect(){
      this.ws = new WebSocket(this.url);
      this.ws.onopen = function (event) {
        cc.log("Send Text WS was opened.");
      };
      this.ws.onmessage = function (event) {
          cc.log("response text msg: " + event.data);
          let message1 = message_pb.PB_CommonMsg.deserializeBinary(event.data);
          cc.log(message1.getOpcode());
      };
      this.ws.onerror = function (event) {
          cc.log("Send Text fired an error");
      };
      this.ws.onclose = function (event) {
          cc.log("WebSocket instance closed.");
      };
  }

  sendMsg (opCode,packet) {  
      let message = new message_pb.PB_CommonMsg()
      message.setMsgid(1);
      message.setOpcode(opCode);
      message.setMsgbuf(packet.serializeBinary());
      this.ws.send(message.serializeBinary());
  }

  close (){
      this.ws.close();
      this.ws = null;
  }
}
export default WsSystem.getInstance();
