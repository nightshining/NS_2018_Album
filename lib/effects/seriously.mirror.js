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

	Seriously.plugin('mirror', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.fragment = [
				'precision mediump float;',

				'uniform vec2 resolution;',
				'uniform sampler2D source;',
				'uniform float spacing;',
				'varying vec2 vTexCoord;',

				'void main(void) {',
				'	gl_FragColor = texture2D(source, vec2(spacing - abs(0.5 - vTexCoord.x), vTexCoord.y));',
				'}'
			].join('\n');
			return shaderSource;
		},
		inPlace: true,
		inputs: {
			source: {
				type: 'image',
				uniform: 'source'
			},
			amount: {
				type: 'number',
				uniform: 'spacing',
				defaultValue: 0.5,
				min: 0,
				max: 1
			}
		},
		title: 'Mirror',
		description: 'Shader Mirror Effect'
	});
}));
