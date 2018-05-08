/* global define, require */
(function (root, factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['seriously'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		factory(require('seriously'));
	} else {
		if (!root.Seriously) {
			root.Seriously = { plugin: function (name, opt) { this[name] = opt; } };
		}
		factory(root.Seriously);
	}
}(window, function (Seriously) {
	'use strict';

	Seriously.plugin('chromatic', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.fragment = [

				'precision mediump float;',

				'uniform sampler2D source;',
				'uniform float amp;',
				'varying vec2 vTexCoord;',


				'void main(void) {',

					'vec2 uv = vTexCoord.xy;',
					'float b_d = length(uv*0.1);',

					'float blur = 0.0;',
					// 'blur = (1.0 + sin(amp*6.0)) * 0.5;', //original
					// 'blur *= 1.0 + sin(amp*16.0) * 0.5;', //original
					'blur = (1.0 + amp * 0.0) * 0.5;',
					'blur *= 1.0 + amp * 1.0 * 0.5;',
					'blur = pow(blur, 5.0);',
					'blur *= 0.05;',

					'blur *= b_d;',
					'blur *= 50.0;',
					
					
				    'vec3 col;',
				    'col.r = texture2D( source, vec2(uv.x+blur,uv.y) ).r;',
				    'col.g = texture2D( source, uv ).g;',
				    'col.b = texture2D( source, vec2(uv.x-blur,uv.y) ).b;',
					
					//Add Scanlines
					//'float scanline = sin(uv.y * 8000.0)*90.0;', //original
					//'col *= scanline;', //original

					'float scanline = sin(uv.y * 800.0) * 0.0;',
					'col -= scanline;',
					
					'vec2 vignette_uv = vTexCoord.xy;',
					'float d = length(vignette_uv - vec2(0.9,0.5));',
					'col *= 1.0 - d * 0.5;',
					'gl_FragColor = vec4(col,1.0);',

				'}'
			].join('\n');
			return shaderSource;
		},
		inPlace: true,
		inputs: {
			source: {
				type: 'image',
				uniform: 'source',
				shaderDirty: false
			},
			amount: {
				type: 'number',
				uniform: 'amp',
				defaultValue: 0.25,
				min: 0
			}
		},
		title: 'Chromatic',
		description: 'Shift RGB Channels'
	});
}));







