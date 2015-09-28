var _config = require("./config"),
	gulp = require("gulp"),

	rename = require("gulp-rename"),
	notify = require("gulp-notify"),
	order = require("gulp-order"),

	less = require("gulp-less"),
	autoprefixer = require("autoprefixer-core"),
	postCSS = require("gulp-postcss"),
	minifyCSS = require("gulp-minify-css"),
	concatCSS = require("gulp-concat-css"),

	browserify = require("browserify"),
	source = require("vinyl-source-stream"),
	streamify = require("gulp-streamify"),
	uglifyJS = require("gulp-uglify"),
	imagemin = require("gulp-imagemin"),
	pngquant = require("imagemin-pngquant");

gulp.task("scripts", function(){

	var files = [
			"home.js",
			"about.js",
			"books.js",
			"reader.js",
			"stories.js",
			"private.js",
			"feedback.js"
		],
		nameExtractor = /[A-Za-z]+(?=\.js)/,
		tasks, match, fileName;

	tasks = files.map(function(entry){

		match = entry.match(nameExtractor);
		if(!match) return;
		fileName = match[0];

		return browserify(_config.baseDir + _config.jsDir + "app/" + entry)
			.bundle()
			.pipe(source(fileName + ".js"))
			.pipe(streamify(uglifyJS()))
			.pipe(rename({extname: ".min.js"}))
			.pipe(gulp.dest(_config.baseDir + _config.outDir + "js"))
			.pipe(notify({message: "js bundled", onLast: true}));
	});	
});

gulp.task("styles", function(){

	var files = [
			"home.less",
			"about.less",
			"books.less",
			"reader.less",
			"stories.less",
			"private.less",
			"feedback.less",
			"notFound.less"
		],
		processors = [
			autoprefixer({
				configbrowsers: ['last 2 versions', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4', 'ff >= 20'],
				cascade: true,
				remove: true,
				add: true
			})
		],
		nameExtractor = /[A-Za-z]+(?=\.less)/,
		tasks, match, fileName;

	tasks = files.map(function(entry){

		match = entry.match(nameExtractor);
		if(!match) return;
		fileName = match[0];
		
		return gulp.src([
				_config.baseDir + _config.cssDir + "reset.less",
				_config.baseDir + _config.cssDir + "settings.less",
				_config.baseDir + _config.cssDir + "common.less",
				_config.baseDir + _config.cssDir + fileName + ".less"
			])
			.pipe(less())
			.pipe(concatCSS(fileName + ".bundle.css"))
			.pipe(postCSS(processors))
			.pipe(minifyCSS({processImport: false}))
			.pipe(rename({extname: ".min.css"}))
			.pipe(gulp.dest(_config.baseDir + _config.outDir + "css"))
			.pipe(notify({message: "css bundled", onLast: true}));
	});
	
});

gulp.task("fonts", function(){

	gulp.src(_config.baseDir + _config.fontsDir + "**/*.*")
		.pipe(gulp.dest(_config.baseDir + _config.outDir + "fonts"));
});

gulp.task("images", function(){

	gulp.src(_config.baseDir + _config.imgDir + "**/*.*")
		.pipe(imagemin({
			optimizationLevel: 4,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [ pngquant() ]
		}))
		.pipe(gulp.dest(_config.baseDir + _config.outDir + "images"));
});

gulp.task("watch", function(){
	gulp.watch(_config.baseDir + _config.jsDir + "**/*.js", ["scripts"]);
	gulp.watch(_config.baseDir + _config.cssDir + "**/*.less", ["styles"]);
});

gulp.task("default", ["scripts", "styles", "fonts", "images", "watch"]);