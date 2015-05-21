module.exports = function(grunt) {	

	grunt.initConfig({
	  pkg: grunt.file.readJSON('package.json'),
	  	
	  concat: {
	    js: {
	      src: ['scripts/jquery-1.11.2.js', 'scripts/restive.js', 'scripts/dropit.js', 'scripts/jquery.slicknav.js', 'scripts/app.js'],
	      dest: 'scripts/build/build.js',
	    },
	  },

	  // cssmin: {
		 //  options: {
		 //    shorthandCompacting: false,
		 //    roundingPrecision: -1
		 //  },
		 //  target: {
		 //    files: {
		 //      'css/application.min.css': ['build/build.css']
		 //    }
		 //  }
	  // },
	  //end min

	  uglify: {
	    my_target: {
	      files: {
	        'scripts/app.min.js': ['scripts/build/build.js']
	      }
	    }
	  }//enduglify
	});//end module.exports
	//run "grunt uglify" to use this on the command line
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//run "grunt cssmin" to use this on the command line
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
}//end module.exports