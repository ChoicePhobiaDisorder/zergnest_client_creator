"use strict";

import {netPacketManager,message_pb} from '../Frame/baiyi';

class HttpSystem {
  constructor() {
    this.ip = null;
    this.url = null;
    this.port = null;
  }

  static getInstance() {
    if (!HttpSystem.instance) {
      HttpSystem.instance = new HttpSystem();
    }
    return HttpSystem.instance;
  }

  init(ip,port){
      this.ip = ip;
      this.port = port;
      this.url = "http://" + this.ip + ":" + this.port;
      cc.log("set url" + this.url)
  }
    
  sendMsg (opCode,packet) {
      let xhr = new XMLHttpRequest();
      xhr.responseType = "arraybuffer";//这里是关键，它指明返回的数据的类型是二进制 
      xhr.open("POST", this.url, true);
      xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
              if(xhr.status >= 200 && xhr.status < 400){
                  netPacketManager.doPacket(xhr.response);
              }
              else{
                  cc.log("send msg error, please retry");
              }
          };
      }

      xhr.onerror =function(err){
          cc.log("网络访问发生错误,请检查网络是否畅通22.");
      };
      xhr.ontimeout=function(){
          this.close(xhr);
          cc.log("网络请求超时,请保证你的网络环境稳定.");
      };

      let message = new message_pb.PB_CommonMsg()
      message.setMsgid(1);
      message.setOpcode(opCode);
      message.setMsgbuf(packet.serializeBinary());
      xhr.send(message.serializeBinary());
  }
}
export default HttpSystem.getInstance();
