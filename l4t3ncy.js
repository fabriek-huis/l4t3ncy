// L4T3NCY by SPUTN1K.com

var l4t3ncy = function() {
};
l4t3ncy.prototype = {
    
	runCount: 1,
	path: "",
    payload: "payload.png",
    size: 136192,
	
	run: function(options) {
        this.results = [];
        this.callback = (options && options.onEnd) ? options.onEnd : null;
        this.runcheck(0, options);
    }
    ,runcheck: function(i, options) {
        
		var payload = this.payload + "?r=" + Math.random();
        var me = this;
        var object = new Image();
        
		object.onload = function() {
			
            me.results[i].endTime = (new Date()).getTime();
            me.results[i].runTime = me.results[i].endTime - me.results[i].startTime;

            if (i < me.runCount - 1) me.runcheck(i + 1);
            else {
                if (me.callback) me.callback(me.getResults());
            }
        };
        this.results[i] = {
            startTime: (new Date()).getTime()
        };
        object.src = payload;
    }
    , getResults: function() {
        var totalRunTime = 0;
        for (var i = 0; i < this.runCount; i++) {
            if (!this.results || !this.results[i].endTime) return null;
            else totalRunTime += this.results[i].runTime;
        }
        var avgRunTime = totalRunTime / this.runCount;
        return {
            avgRunTime: avgRunTime,
            Kbps: (this.size * 8 / 1024 / (avgRunTime / 1000)),
            KBps: (this.size / 1024 / (avgRunTime / 1000))
        };
    }
}