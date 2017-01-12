"use strict";
import {message_pb} from '../Frame/baiyi';

class NetPacketManager {
    constructor() {
        this.packetList = {};
    }
    static getInstance() {
        if (!NetPacketManager.instance) {
        NetPacketManager.instance = new NetPacketManager();
        }
        return NetPacketManager.instance;
    }
    registerPacket(packet) {
        var packetType = packet.getType();
        this.packetList[packetType] = packet;
        cc.log("NetPacketManager: registerPacket packetType = " + packetType);
    };
    doPacket(bodyData){
        let message1 = message_pb.PB_CommonMsg.deserializeBinary(bodyData);
        let retOpcodeType = message1.getOpcode();
        cc.log("NetPacketManager: get a msg of packetType = " + retOpcodeType);
        if (!this.packetList[retOpcodeType]) {
            cc.log("NetPacketManager: unRegisterPacket packetType  = " + retOpcodeType);
        }else {
            this.packetList[retOpcodeType].onMessageHandle(message1.getMsgbuf());
        }
    }
}

export default NetPacketManager.getInstance();