(function () {
  "use strict";

  // source: jquery-2.1.1.js (line 302, 529)

  var typeIdentifier2_type_ = {
  '[object Boolean]':    'boolean',
  '[object Number]':     'number',
  '[object String]':     'string',
  '[object Function]':    'function',
  '[object Array]':     'array',
  '[object Date]':      'date',
  '[object RegExp]':    'regexp',
  '[object Object]':    'object',
  '[object Error]':     'error'
};


  LAY.$type = function( obj ) {
    if ( obj === null ) {
      return obj + "";
    } else if ( obj instanceof LAY.Color ) {
      return "color";
    } else if ( obj instanceof LAY.Take ) {
      return "take";
    } else if ( obj instanceof LAY.Level ) {
      return "level";
    }
    // Support: Android < 4.0, iOS < 6 (functionish RegExp)
    return typeof obj === "object" || typeof obj === "function" ?
    typeIdentifier2_type_[ Object.prototype.toString.call(obj) ] || "object" :
    typeof obj;
  };

})();
