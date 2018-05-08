

    function ToneTrack(_totalClips, pathVoice) { 
        
            this.clipPaths = [];
            this.clipTags = [];
            this.totalClips = _totalClips;

            this.meter = new Tone.Meter();
            this.filter = new Tone.LowpassCombFilter();
            this.solo = new Tone.Solo();
            this.fader = new Tone.PanVol();
            this.pansignal = new Tone.Signal(0);
            this.player = new Tone.Players({
                'url' : '../assets/samples/' + pathVoice + 'sound0.mp3'
            })

            this.initialClip = 'clip0';

             for (var i = 0; i < _totalClips; i++) {

                this.clipPaths[i] = '../assets/samples/'+ pathVoice + 'sound' + i +'.mp3';
                this.clipTags[i] = 'clip' + i;
                this.player.add(this.clipTags[i], this.clipPaths[i]);
                this.player.get(this.clipTags[i]).chain(this.filter, this.fader, this.solo, this.meter, Tone.Master);//removing filter cuts delay
                this.player.get(this.clipTags[i]).sync().start(0); //sync all loops

                this.player.get(this.clipTags[i]).loop = true;
                this.player.get(this.clipTags[i]).fadeOut = '32n';
                //this.loopEnd = _loopEnd;
                //this.player.get(this.clipTags[i]).loopEnd = this.loopEnd; 
                this.player.get(this.clipTags[i]).mute = true; //mute all clips
            }

        }

    ToneTrack.prototype.connectEffect = function(effect, auxVol){
        this.player.send(effect, auxVol);
    }

    ToneTrack.prototype.setVol = function(db) {
        this.fader.volume.rampTo(db,1);
    }

    ToneTrack.prototype.setPan = function(lr) {
        this.pansignal.rampTo(lr,1);
        this.fader.pan.value = this.pansignal.value;
    }
    ToneTrack.prototype.setSolo = function(toggle) {
        this.solo.solo = toggle;
    }
    ToneTrack.prototype.setClipLength = function(clipIndex, _loopEnd) {
        let tag = 'clip';
        this.player.get(tag + clipIndex).loopEnd = _loopEnd;

    }
    ToneTrack.prototype.setClip = function(clipIndex) {
        let tag = 'clip';
        this.player.get(this.initialClip).mute = true // mute last clip 
        this.player.get(tag + clipIndex).mute = false // unmute next clip
        this.player.get(tag + clipIndex).loop = true;
        //this.player.get(tag + clipIndex).loopEnd = this.loopEnd;
        this.initialClip = tag + clipIndex; // store new clip0
    }

    ToneTrack.prototype.setFilter = function(freq, res){
        this.filter.dampening.rampTo(freq, 0.5); //50-10k
        this.filter.resonance.rampTo(res, 0.5); //0.0-1.0
    }

    ToneTrack.prototype.getMeter = function(){

        let level = this.meter.getLevel();
        level = Tone.dbToGain(level);
        return level;
        //console.log("Gain: " + level);

    }
    ToneTrack.prototype.getVol = function(){
        let v = this.fader.volume.value;
        return v;
    }
    ToneTrack.prototype.getClipAmt = function() {
        let c = this.totalClips; 
        return c;
    }
 



 
