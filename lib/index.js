(function() {
  var js_yaml, path;

  js_yaml = require('js-yaml');

  path = require('path');

  module.exports = function(options) {
    var is_yaml;
    options = options || {};
    is_yaml = function(file) {
      return /\.yml|\.yaml/.test(node_path.extname(file));
    };
    return function(files, metalsmith, done) {
      setImmediate(done);
      return Object.keys(files).forEach(function(file) {
        var data, dir, html;
        if (!is_yaml(file)) {
          return;
        }
        data = files[file];
        dir = node_path.dirname(file);
        html = (node_path.basename(file, node_path.extname(file))) + ".html";
        if ('.' !== dir) {
          html = dir + "/" + html;
        }
        data.yaml_contents = js_yaml.load(data.contents);
        delete files[file];
        return files[html] = data;
      });
    };
  };

}).call(this);
