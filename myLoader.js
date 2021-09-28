module.exports = function(source, map){
  console.log(source);
  let options = this.getOptions({});
  console.log(options);
  let hello = 'hello from my loader -> ';
  this.callback(null, `module.exports = '${hello + source}'`, map);
}
module.exports.raw = true;