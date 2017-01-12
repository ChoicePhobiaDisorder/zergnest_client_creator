cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        dt:0,
        curLick:0,
        animationSpeed:1,
        tickList:[],
    },

    // use this for initialization
    onLoad: function () {
        var now = Date.now();
        var tick = 50;
        if (this.dt == 0) {
            this.dt = now;
            return;
        }

        var timediff = now - this.dt;
        var tickcount = parseInt(timediff / tick);
        tickcount = Math.min(tickcount, 1);
        var costtime = tickcount * tick;
        var timeleft = timediff - costtime;
        this.dt = now - timeleft;
        if (tickcount < 1) {
            return;
        }

        tickcount = Math.min(this.maxtick - this.curtick, 100);
        var per = Math.round(this.curtick / this.maxtick * 100);
        this.loading.getComponent("cc.Label").string = "loading... " + per + "%";
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
