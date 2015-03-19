module.exports = function ( opt )
{
	opt = opt || {};

	// We want the source files to be read and buffered
	opt.srcRead = true;
	opt.srcBuffer = true;

	// Other options:
	// stringifyReplacer, stringifySpace - passed to JSON.stringify when generating merged contents
	// mergeCustomizer - passed to lodash.merge to customize merging process

	opt.mergeFunction = function ( contents, files )
	{
		contents = JSON.decode(contents);

		lo.forEach(files, function ( data )
		{
			contents = lo.merge(contents, JSON.decode(data.file.contents.toString()), opt.mergeCustomizer);
		});

		return Promise.resolve(JSON.stringify(contents, opt.stringifyReplacer, opt.stringifySpace));
	};

	return require('packetizer').hooks.merge(opt);
};