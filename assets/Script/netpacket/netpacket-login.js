"use strict";

import {IPacket} from '../Frame/ipacket';
import {message_pb,netPacketManager} from '../Frame/baiyi';

var loginPaccket = new  IPacket();
loginPaccket.packetType = message_pb.SC11002.PacketType.PB_PACKTYPE;
loginPaccket.onMessageHandle = function(msg){

}

netPacketManager.registerPacket(loginPaccket);
