gaussianLib = require "gaussian"
gaussian = (mean, variance)->
	ret = gaussianLib(mean, variance)
	ret.add = (d)->
		new gaussian(mean + d.mean, variance + d.variance)
	ret.sub = (d)->
		new gaussian(mean - d.mean, variance + d.variance)
	ret.scale = (c)->
		new gaussian(mean*c, variance*c*c)
	return ret
module.exports = gaussian