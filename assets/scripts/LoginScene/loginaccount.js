var PB_login = require('PB_Login_pb');

cc.Class({
    extends: cc.Component,

    properties: {
        ed_Accout: cc.EditBox,
        ed_PassWord: cc.EditBox,
        lb_LoginTempInfo : cc.Label
    },

    // use this for initialization
    onLoad: function () {
        
    },

    checkData: function () {
        var accout = this.ed_Accout.string;
        var password = this.ed_PassWord.string;
        console.log(accout);
        console.log(password);
        if(accout == ""){
            this.lb_LoginTempInfo.string = "accout not empty";
        }
        else if(password == ""){
            this.lb_LoginTempInfo.string = "password not empty";
        }
        else{
            this.lb_LoginTempInfo.string = "waitting"
            this.loginServer(accout,password);
        }
    },

    loginServer: function(accout, password) {
        var message = new PB_login.CS11001();
        message.setPlatformtype(1);
        message.setPlatformaccountid(accout);
        message.setAuthid(password);
        message.setClienttype("Web");//客户端类型：“IOS”，“ANDROID”,“WEB”
        message.setUuid("zxlcvkjoliuapdif");//客户端唯一标示(IOS为UUID，ANDROID为IMEI，PC为MAC地址)

        var bitdatas = message.serializeBinary();

        var xhr = new cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                console.log(response);
            }
        };
        xhr.open("POST", "127.0.0.1:10086", true);
        xhr.send(bitdatas);
        
        console.log(message.getPlatformaccountid());
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
