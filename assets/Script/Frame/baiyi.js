"use strict";

import logsystem from 'logsystem';
import httpsystem from 'httpsystem';
import wssystem from 'wssystem';
import netPacketManager from 'netpacket-manager';
var message_pb = require('message_pb');

var baiyi = baiyi || {};
baiyi.init = function(){
    cc.log("init baiyi frame begin");
    //需要初始化的放这里
    logsystem.init();
    cc.log("init baiyi frame end");
}

cc.game.on(cc.game.EVENT_GAME_INITED, function () {
    logsystem.init();
});

export {baiyi,httpsystem,wssystem,netPacketManager,message_pb};