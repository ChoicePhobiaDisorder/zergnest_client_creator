"use strict";

class IPacket {
    constructor() {
        this.packetType = 1;
        this.getType = function () {
            if (this.packetType)
            {
                return this.packetType;
            }else {
                //cc.log("IPacket: missing packetType");
            }
        };
        this.onMessageHandle = function(msg){

        };

        this.onError = function(){

        };
    }
}

export { IPacket};