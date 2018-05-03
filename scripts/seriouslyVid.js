
	function SeriouslySource() {
			this.source;
			this.target;
			this.reformat;
			this.effects = []; //total 4 effects to chain
	}
	
	SeriouslySource.prototype.init = function(targetId, videoId) {
			
			// this.effects = [
			// 				seriously.effect('mirror'),  	 //0
			// 				//seriously.effect('tvglitch'), 	 //1
			// 				seriously.effect('exposure'), ]; //2
			// 				//seriously.effect('directionblur') ];  //3
			

			this.target = seriously.target(targetId, { 
						allowSecondaryWebGL: true
					});

			
			//this.effects[0].source = '#video';

			this.reformat = seriously.transform('reformat');
			this.reformat.width = this.target.width * 0.9;
			this.reformat.height = this.target.height * 0.9;
			
			//this.reformat.source = '#video';
			this.reformat.source = videoId;
			var finalIndex;

			for (var i = 0; i < this.effects.length; i++) {

				if (i == 0) {
				
					finalIndex = 0;
					this.effects[finalIndex].source = this.reformat;
				
				} else if (i == 1) {
					
					finalIndex = 1;					
					this.effects[finalIndex].source = this.effects[0];

				} else if (i == 2) {

					finalIndex = 2;
					this.effects[finalIndex].source = this.effects[1];
					
				} else if (i == 3) {
					
					finalIndex = 3;
					this.effects[finalIndex].source = this.effects[2];

				}

			}
			
			this.target.source = this.effects[finalIndex];
	}

	SeriouslySource.prototype.addEffect = function(name) {
		
			this.effects.push(seriously.effect(name));
		
	}

	SeriouslySource.prototype.setFreeze = function(index, toggle) {
			let freezeIndex = 0;
			//this.effects[freezeIndex].frozen = toggle;
	};

	SeriouslySource.prototype.setMirror = function(index, amt) {

			this.effects[index].amount = amt; //0.0-1.0

	};

	SeriouslySource.prototype.setExposure = function(index, amt) {

			this.effects[index].exposure = amt; //-8 - 3

	};
	
	SeriouslySource.prototype.setDist = function(index, amt) {

			this.effects[index].distortion = amt; 
	};

