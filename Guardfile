# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'sass', :input => 'src/stylesheets', :output => 'public/stylesheets', :debug_info_ => true

guard 'coffeescript', :input => 'src/app', :output => 'app', :debug_info_ => true
guard 'coffeescript', :input => 'src/public/javascripts', :output => 'public/javascripts', :debug_info_ => true
guard 'coffeescript', :input => 'src/spec', :output => 'public/javascripts/spec', :debug_info_ => true
guard 'coffeescript', :input => 'src/spec', :output => 'spec', :debug_info_ => true

guard 'jasmine-node', :jasmine_node_bin => File.expand_path(File.dirname(__FILE__) + "/node_modules/jasmine-node/bin/jasmine-node"), :verbose => true