js_yaml = require 'js-yaml'
path = require 'path'

module.exports = (options) ->
  options = options || {}
  is_yaml = (file) -> /\.yml|\.yaml/.test(path.extname(file))
  (files, metalsmith, done) ->
    setImmediate(done)
    Object.keys(files).forEach (file) ->
      if !is_yaml(file)
        return
      data = files[file]
      dir = path.dirname(file)
      html = "#{path.basename(file, path.extname(file))}.html"
      if '.' != dir
        html = "#{dir}/#{html}"
      data.yaml_contents = js_yaml.load(data.contents)
      delete files[file]
      files[html] = data
