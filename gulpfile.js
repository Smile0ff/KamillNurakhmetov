var _cfg = require("./config"),
	gulp = require("gulp"),

    glob = require("glob"),
    exec = require("child_process").exec,

	rename = require("gulp-rename"),
	notify = require("gulp-notify"),

	less = require("gulp-less"),
    CleanLessPlugin = require("less-plugin-clean-css"),
    LessAutoprefixPlugin = require("less-plugin-autoprefix"),
	minifyCSS = require("gulp-minify-css"),
	concatCSS = require("gulp-concat-css"),

	imagemin = require("gulp-imagemin"),
	pngquant = require("imagemin-pngquant"),

    cleanLess, autoprefix;

    cleanLess = new CleanLessPlugin({ advanced: true });
    autoprefix = new LessAutoprefixPlugin({ browsers: ["last 4 versions"] });

gulp.task("js", function(){

    var files = glob.sync(_cfg.js + "app/*.js"),
        fileName, bundle;

	files.map(function(entryFile){
        fileName = entryFile.match(/[A-Za-z]+(?=\.js)/gi)[0];
        bundle = exec("jspm bundle-sfx "+ entryFile +" "+ _cfg.out +"js/"+ fileName +".bundle.min.js --minify --skip-source-maps");
	});

});

gulp.task("css", function(){

    var files = glob.sync(_cfg.css + "*.less"),
        fileName, bundle;

	files.map(function(entryFile){
        fileName = entryFile.match(/[A-Za-z]+(?=\.less)/gi)[0];
        gulp.src(entryFile)
            .pipe(less({ plugins: [cleanLess, autoprefix] }))
            .pipe(concatCSS(fileName + ".less"))
            .pipe(minifyCSS({ processImport: false }))
            .pipe(rename({ basename: fileName, extname: ".bundle.min.css" }))
			.pipe(gulp.dest(_cfg.out + "css/"))
			.pipe(notify({ message: "css done", onLast: true }));
	});

});

gulp.task("fonts", function(){
	gulp.src(_cfg.base + _cfg.font + "**/*.*")
		.pipe(gulp.dest(_cfg.base + _cfg.out + "fonts"));
});

gulp.task("images", function(){

	gulp.src(_cfg.img + "**/*.*")
		.pipe(imagemin({
			optimizationLevel: 4,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(_cfg.out + "images/"));
});

gulp.task("watcher", function(){
    //gulp.watch(_cfg.js + "**/*.js", ["js"]);
	gulp.watch(_cfg.css + "**/*.less", ["css"]);
	gulp.watch(_cfg.font + "**/*.*", ["fonts"]);
	gulp.watch(_cfg.img + "**/*.*", ["images"]);
});

gulp.task("default", ["css", "fonts", "images", "watcher"]);
