( function () {
  "use strict";

  LAY.Take = function ( relativePath, attr ) {

    var _relPath00attr_S;

    if ( attr !== undefined ) {
      var path = new LAY.RelPath( relativePath );
      _relPath00attr_S = [ [ path, attr ] ];

      this.executable = function () {
        return path.resolve( this ).$getAttrVal( attr ).calcVal;          
      };
    } else { // direct value provided
      _relPath00attr_S = [];
      // note that 'relativePath' is misleading name
      // here in this second overloaded case
      var directValue = relativePath;
      if ( directValue instanceof LAY.Take ) {
        this.executable = directValue.executable;
        _relPath00attr_S = directValue._relPath00attr_S;
      } else {
        this.executable = function () {
          return directValue;
        };
      }
    }

    this._relPath00attr_S = _relPath00attr_S;

  };

  LAY.Take.prototype.execute = function ( contextPart ) {

    // pass in context part for relative path lookups
    return this.executable.call( contextPart );

  };

  LAY.Take.prototype.$mergePathAndAttrs = function ( take ) {

    var _relPath00attr_S = take._relPath00attr_S;
    for ( var i = 0, len = _relPath00attr_S.length; i < len; i++ ) {
      this._relPath00attr_S.push( _relPath00attr_S[ i ] );

    }
  };

  LAY.Take.prototype.add = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ) + val.execute( this );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ) + val;
      };
    }
    return this;
  };

  LAY.Take.prototype.plus = LAY.Take.prototype.add;

  LAY.Take.prototype.subtract = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ) - val.execute( this );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ) - val;
      };
    }
    return this;
  };

  LAY.Take.prototype.minus = LAY.Take.prototype.subtract;

  LAY.Take.prototype.divide = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ) / val.execute( this );
      };
    } else {
      if ( val === 2 ) {
        return this.half();
      }
      this.executable = function () {
        return oldExecutable.call( this ) / val;
      };
    }
    return this;
  };

  LAY.Take.prototype.multiply = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ) * val.execute( this );
      };
    } else {
      if ( val === 2 ) {
        return this.double();
      }
      this.executable = function () {
        return oldExecutable.call( this ) * val;
      };
    }
    return this;
  };

  LAY.Take.prototype.remainder = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ) % val.execute( this );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ) % val;
      };
    }
    return this;
  };

  LAY.Take.prototype.half = function ( ) {

    var oldExecutable = this.executable;

    this.executable = function () {
      return oldExecutable.call( this ) / 2;
    };

    return this;
  };

  LAY.Take.prototype.double = function ( ) {

    var oldExecutable = this.executable;

    this.executable = function () {
      return oldExecutable.call( this ) * 2;
    };

    return this;
  };


  LAY.Take.prototype.contains = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ).indexOf( val.execute( this ) ) !== -1;
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ).indexOf( val ) !== -1;
      };
    }
    return this;
  };

  LAY.Take.prototype.identical = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return LAY.identical( oldExecutable.call( this ),
          val.execute( this ) );
      };
    } else {

      this.executable = function () {
        return LAY.identical( oldExecutable.call( this ), val );
      };
    }
    return this;
  };

  LAY.Take.prototype.eq = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ) === val.execute( this );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ) === val;
      };
    }
    return this;
  };



  LAY.Take.prototype.neq = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ) !== val.execute( this );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ) !== val;
      };
    }
    return this;
  };

  LAY.Take.prototype.gt = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ) > val.execute( this );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ) > val;
      };
    }
    return this;
  };

  LAY.Take.prototype.gte = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ) >= val.execute( this );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ) >= val;
      };
    }
    return this;
  };

  LAY.Take.prototype.lt = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ) < val.execute( this );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ) < val;
      };
    }
    return this;
  };

  LAY.Take.prototype.lte = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ) <= val.execute( this );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ) <= val;
      };
    }
    return this;
  };

  LAY.Take.prototype.or = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ) || val.execute( this );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ) || val;
      };
    }
    return this;
  };

  LAY.Take.prototype.and = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ) && val.execute( this );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ) && val;
      };
    }
    return this;
  };

  LAY.Take.prototype.not = function () {

    var oldExecutable = this.executable;

    this.executable = function () {
      return !oldExecutable.call( this );
    };

    return this;
  };


  LAY.Take.prototype.negative = function () {

    var oldExecutable = this.executable;

    this.executable = function () {
      return -oldExecutable.call( this );
    };

    return this;
  };

  LAY.Take.prototype.number = function () {

    var oldExecutable = this.executable;

    this.executable = function () {
      return parseInt( oldExecutable.call( this ) );
    };

    return this;
  };



  LAY.Take.prototype.key = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this )[ val.execute( this ) ];
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this )[ val ];
      };
    }
    return this;
  };

  LAY.Take.prototype.index = LAY.Take.prototype.key;

  LAY.Take.prototype.length = function ( val ) {
    var oldExecutable = this.executable;

    this.executable = function () {
      return oldExecutable.call( this ).length;
    };

    return this;
  };

  LAY.Take.prototype.slice = function ( start, end ) {

    var oldExecutable = this.executable;

    if ( start instanceof LAY.Take ) {
      this.$mergePathAndAttrs( start );

      if ( end instanceof LAY.Take ) {
        this.$mergePathAndAttrs( end );
        this.executable = function () {
          return oldExecutable.call( this ).slice(
            start.execute( this ), end.execute( this ) );
        }

      } else {
        this.executable = function () {
          return oldExecutable.call( this ).slice(
          start.execute( this ), end );
        }
      }
    } else if ( end instanceof LAY.Take ) {
      this.$mergePathAndAttrs( end );
      this.executable = function () {
        return oldExecutable.call( this ).slice(
          start, end.execute( this ) );
      }
    } else {
      this.executable = function () {
        return oldExecutable.call( this ).slice(
          start, end );
      }
    }
    return this;
  };

  LAY.Take.prototype.min = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return Math.min( oldExecutable.call( this ), val.execute( this ) );
      };
    } else {

      this.executable = function () {
        return Math.min( oldExecutable.call( this ), val );
      };
    }
    return this;
  };

  LAY.Take.prototype.max = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return Math.max( oldExecutable.call( this ), val.execute( this ) );
      };
    } else {

      this.executable = function () {
        return Math.max( oldExecutable.call( this ), val );
      };
    }
    return this;
  };


  LAY.Take.prototype.ceil = function () {

    var oldExecutable = this.executable;
    this.executable = function () {
      return Math.ceil( oldExecutable.call( this ) );
    };
    return this;
  };

  LAY.Take.prototype.floor = function () {

    var oldExecutable = this.executable;
    this.executable = function () {
      return Math.floor( oldExecutable.call( this ) );
    };
    return this;
  };

  LAY.Take.prototype.round = function () {

    var oldExecutable = this.executable;
    this.executable = function () {
      return Math.round( oldExecutable.call( this ) );
    };
    return this;
  };


  LAY.Take.prototype.sin = function () {

    var oldExecutable = this.executable;
    this.executable = function () {
      return Math.sin( oldExecutable.call( this ) );
    };
    return this;
  };


  LAY.Take.prototype.cos = function () {

    var oldExecutable = this.executable;
    this.executable = function () {
      return Math.cos( oldExecutable.call( this ) );
    };
    return this;
  };


  LAY.Take.prototype.tan = function () {

    var oldExecutable = this.executable;
    this.executable = function () {
      return Math.tan( oldExecutable.call( this ) );
    };
    return this;
  };

  LAY.Take.prototype.abs = function () {

    var oldExecutable = this.executable;
    this.executable = function () {
      return Math.abs( oldExecutable.call( this ) );
    };
    return this;
  };


  LAY.Take.prototype.pow = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return Math.pow( oldExecutable.call( this ), val.execute( this ) );
      };
    } else {

      this.executable = function () {
        return Math.pow( oldExecutable.call( this ), val );
      };
    }
    return this;
  };

  LAY.Take.prototype.log = function () {

    var oldExecutable = this.executable;
    this.executable = function () {
      return Math.log( oldExecutable.call( this ) );
    };
    return this;
  };


  LAY.Take.prototype.match = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ).match( val.execute( this ) );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ).match( val );
      };
    }
    return this;

  };

  LAY.Take.prototype.test = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ).test( val.execute( this ) );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ).test( val );
      };
    }
    return this;

  };

  LAY.Take.prototype.concat = LAY.Take.prototype.add;

  LAY.Take.prototype.lowercase = function () {
    var oldExecutable = this.executable;
    this.executable = function () {
      return oldExecutable.call( this ).toLowerCase();
    };
    return this;
  };

  LAY.Take.prototype.uppercase = function () {
    var oldExecutable = this.executable;
    this.executable = function () {
      return oldExecutable.call( this ).toUpperCase();
    };
    return this;
  };

  LAY.Take.prototype.capitalize = function () {
    var oldExecutable = this.executable;
    this.executable = function () {
      var val = oldExecutable.call( this );
      return val.charAt( 0 ).toUpperCase() +
        val.slice( 1 );
    };
    return this;
  };

  LAY.Take.prototype.format = function () {

    var argS = Array.prototype.slice.call( arguments ),
      takeFormat = new LAY.Take( LAY.$format );

    argS.unshift( this );

    return takeFormat.fn.apply( takeFormat, argS );

  };


  LAY.Take.prototype.i18nFormat = function () {
    function fnWrapperI18nFormat () {
      var argS = Array.prototype.slice.call( arguments );
      argS[ 0 ] = ( argS[ 0 ] )[ LAY.level( '/' ).attr( 'data.lang' ) ];
      if ( argS[ 0 ] === undefined ) {
        throw "LAY Error: No language defined for i18nFormat";
      }
      return LAY.$format.apply( undefined, argS );
    }

    this._relPath00attr_S.push( [ new LAY.RelPath( '/' ), 'data.lang' ] );

    var argS = Array.prototype.slice.call(arguments),
      takeFormat = new LAY.Take( fnWrapperI18nFormat );

    argS.unshift( this );

    return takeFormat.fn.apply( takeFormat, argS);

  };

  


  LAY.Take.prototype.colorEquals = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ).equals( val.execute( this ) );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ).equals( val );
      };
    }
    return this;

  };


  LAY.Take.prototype.colorLighten = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ).copy().lighten( val.execute( this ) );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ).copy().lighten( val );
      };
    }
    return this;

  };


  LAY.Take.prototype.colorDarken = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ).copy().darken( val.execute( this ) );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ).copy().darken( val );
      };
    }
    return this;

  };


  LAY.Take.prototype.colorStringify = function ( ) {

    var oldExecutable = this.executable;
    this.executable = function () {
      return oldExecutable.call( this ).copy().stringify( );
    };

    return this;

  };

  LAY.Take.prototype.colorInvert = function ( ) {

    var oldExecutable = this.executable;
    this.executable = function () {
      return oldExecutable.call( this ).copy().invert();
    };

    return this;

  };

  LAY.Take.prototype.colorSaturate = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ).copy().saturate( val.execute( this ) );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ).copy().saturate( val );
      };
    }
    return this;

  };

  LAY.Take.prototype.colorDesaturate = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ).copy().desaturate( val.execute( this ) );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ).copy().desaturate( val );
      };
    }
    return this;

  };


  LAY.Take.prototype.colorAlpha = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ).copy().alpha( val.execute( this ) );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ).copy().alpha( val );
      };
    }
    return this;

  };

  LAY.Take.prototype.colorRed = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ).copy().red( val.execute( this ) );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ).copy().red( val );
      };
    }
    return this;
  };


  LAY.Take.prototype.colorGreen = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ).copy().green( val.execute( this ) );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ).copy().green( val );
      };
    }
    return this;
  };

  LAY.Take.prototype.colorBlue = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ).copy().blue( val.execute( this ) );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ).copy().blue( val );
      };
    }
    return this;
  };

  LAY.Take.prototype.colorHue = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ).copy().hue( val.execute( this ) );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ).copy().hue( val );
      };
    }
    return this;
  };

  LAY.Take.prototype.colorSaturation = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ).copy().saturation( val.execute( this ) );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ).copy().saturation( val );
      };
    }
    return this;
  };

  LAY.Take.prototype.colorLightness = function ( val ) {

    var oldExecutable = this.executable;
    if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );

      this.executable = function () {
        return oldExecutable.call( this ).copy().lightness( val.execute( this ) );
      };
    } else {

      this.executable = function () {
        return oldExecutable.call( this ).copy().lightness( val );
      };
    }
    return this;
  };

  LAY.Take.prototype.filterEq = function ( attr, val ) {

    var oldExecutable = this.executable;

    if ( attr instanceof LAY.Take ) {
      this.$mergePathAndAttrs( attr );

      if ( val instanceof LAY.Take ) {
        this.$mergePathAndAttrs( val );
        this.executable = function () {
          return LAY.$filterUtils.eq(
            oldExecutable.call( this ),
            attr.execute( this ),
            val.execute( this )
          );
        }

      } else {
        this.executable = function () {
          return LAY.$filterUtils.eq(
            oldExecutable.call( this ),
            attr.execute( this ),
            val
          );
        }
      }
    } else if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );
      this.executable = function () {
        return LAY.$filterUtils.eq(
            oldExecutable.call( this ),
            attr,
            val.execute( this )
          );
      }
    } else {
      this.executable = function () {
        return LAY.$filterUtils.eq(
            oldExecutable.call( this ),
            attr,
            val
          );
      }
    }
    return this;
  };

  LAY.Take.prototype.filterNeq = function ( attr, val ) {

    var oldExecutable = this.executable;

    if ( attr instanceof LAY.Take ) {
      this.$mergePathAndAttrs( attr );

      if ( val instanceof LAY.Take ) {
        this.$mergePathAndAttrs( val );
        this.executable = function () {
          return LAY.$filterUtils.neq(
            oldExecutable.call( this ),
            attr.execute( this ),
            val.execute( this )
          );
        }

      } else {
        this.executable = function () {
          return LAY.$filterUtils.neq(
            oldExecutable.call( this ),
            attr.execute( this ),
            val
          );
        }
      }
    } else if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );
      this.executable = function () {
        return LAY.$filterUtils.neq(
            oldExecutable.call( this ),
            attr,
            val.execute( this )
          );
      }
    } else {
      this.executable = function () {
        return LAY.$filterUtils.neq(
            oldExecutable.call( this ),
            attr,
            val
          );
      }
    }
    return this;
  };

  LAY.Take.prototype.filterGt = function ( attr, val ) {

    var oldExecutable = this.executable;

    if ( attr instanceof LAY.Take ) {
      this.$mergePathAndAttrs( attr );

      if ( val instanceof LAY.Take ) {
        this.$mergePathAndAttrs( val );
        this.executable = function () {
          return LAY.$filterUtils.gt(
            oldExecutable.call( this ),
            attr.execute( this ),
            val.execute( this )
          );
        }

      } else {
        this.executable = function () {
          return LAY.$filterUtils.gt(
            oldExecutable.call( this ),
            attr.execute( this ),
            val
          );
        }
      }
    } else if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );
      this.executable = function () {
        return LAY.$filterUtils.gt(
            oldExecutable.call( this ),
            attr,
            val.execute( this )
          );
      }
    } else {
      this.executable = function () {
        return LAY.$filterUtils.gt(
            oldExecutable.call( this ),
            attr,
            val
          );
      }
    }
    return this;
  };

  LAY.Take.prototype.filterGte = function ( attr, val ) {

    var oldExecutable = this.executable;

    if ( attr instanceof LAY.Take ) {
      this.$mergePathAndAttrs( attr );

      if ( val instanceof LAY.Take ) {
        this.$mergePathAndAttrs( val );
        this.executable = function () {
          return LAY.$filterUtils.gte(
            oldExecutable.call( this ),
            attr.execute( this ),
            val.execute( this )
          );
        }

      } else {
        this.executable = function () {
          return LAY.$filterUtils.gte(
            oldExecutable.call( this ),
            attr.execute( this ),
            val
          );
        }
      }
    } else if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );
      this.executable = function () {
        return LAY.$filterUtils.gte(
            oldExecutable.call( this ),
            attr,
            val.execute( this )
          );
      }
    } else {
      this.executable = function () {
        return LAY.$filterUtils.gte(
            oldExecutable.call( this ),
            attr,
            val
          );
      }
    }
    return this;
  };

  LAY.Take.prototype.filterLt = function ( attr, val ) {

    var oldExecutable = this.executable;

    if ( attr instanceof LAY.Take ) {
      this.$mergePathAndAttrs( attr );

      if ( val instanceof LAY.Take ) {
        this.$mergePathAndAttrs( val );
        this.executable = function () {
          return LAY.$filterUtils.lt(
            oldExecutable.call( this ),
            attr.execute( this ),
            val.execute( this )
          );
        }

      } else {
        this.executable = function () {
          return LAY.$filterUtils.lt(
            oldExecutable.call( this ),
            attr.execute( this ),
            val
          );
        }
      }
    } else if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );
      this.executable = function () {
        return LAY.$filterUtils.lt(
            oldExecutable.call( this ),
            attr,
            val.execute( this )
          );
      }
    } else {
      this.executable = function () {
        return LAY.$filterUtils.lt(
            oldExecutable.call( this ),
            attr,
            val
          );
      }
    }
    return this;
  };

  LAY.Take.prototype.filterLte = function ( attr, val ) {

    var oldExecutable = this.executable;

    if ( attr instanceof LAY.Take ) {
      this.$mergePathAndAttrs( attr );

      if ( val instanceof LAY.Take ) {
        this.$mergePathAndAttrs( val );
        this.executable = function () {
          return LAY.$filterUtils.lte(
            oldExecutable.call( this ),
            attr.execute( this ),
            val.execute( this )
          );
        }

      } else {
        this.executable = function () {
          return LAY.$filterUtils.lte(
            oldExecutable.call( this ),
            attr.execute( this ),
            val
          );
        }
      }
    } else if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );
      this.executable = function () {
        return LAY.$filterUtils.lte(
            oldExecutable.call( this ),
            attr,
            val.execute( this )
          );
      }
    } else {
      this.executable = function () {
        return LAY.$filterUtils.lte(
            oldExecutable.call( this ),
            attr,
            val
          );
      }
    }
    return this;
  };

  LAY.Take.prototype.filterRegex = function ( attr, val ) {

    var oldExecutable = this.executable;

    if ( attr instanceof LAY.Take ) {
      this.$mergePathAndAttrs( attr );

      if ( val instanceof LAY.Take ) {
        this.$mergePathAndAttrs( val );
        this.executable = function () {
          return LAY.$filterUtils.regex(
            oldExecutable.call( this ),
            attr.execute( this ),
            val.execute( this )
          );
        }

      } else {
        this.executable = function () {
          return LAY.$filterUtils.regex(
            oldExecutable.call( this ),
            attr.execute( this ),
            val
          );
        }
      }
    } else if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );
      this.executable = function () {
        return LAY.$filterUtils.regex(
            oldExecutable.call( this ),
            attr,
            val.execute( this )
          );
      }
    } else {
      this.executable = function () {
        return LAY.$filterUtils.regex(
            oldExecutable.call( this ),
            attr,
            val
          );
      }
    }
    return this;
  };

  LAY.Take.prototype.filterContains = function ( attr, val ) {

    var oldExecutable = this.executable;

    if ( attr instanceof LAY.Take ) {
      this.$mergePathAndAttrs( attr );

      if ( val instanceof LAY.Take ) {
        this.$mergePathAndAttrs( val );
        this.executable = function () {
          return LAY.$filterUtils.contains(
            oldExecutable.call( this ),
            attr.execute( this ),
            val.execute( this )
          );
        }

      } else {
        this.executable = function () {
          return LAY.$filterUtils.contains(
            oldExecutable.call( this ),
            attr.execute( this ),
            val
          );
        }
      }
    } else if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );
      this.executable = function () {
        return LAY.$filterUtils.contains(
            oldExecutable.call( this ),
            attr,
            val.execute( this )
          );
      }
    } else {
      this.executable = function () {
        return LAY.$filterUtils.contains(
            oldExecutable.call( this ),
            attr,
            val
          );
      }
    }
    return this;
  };


  LAY.Take.prototype.filterWithin = function ( attr, val ) {

    var oldExecutable = this.executable;

    if ( attr instanceof LAY.Take ) {
      this.$mergePathAndAttrs( attr );

      if ( val instanceof LAY.Take ) {
        this.$mergePathAndAttrs( val );
        this.executable = function () {
          return LAY.$filterUtils.within(
            oldExecutable.call( this ),
            attr.execute( this ),
            val.execute( this )
          );
        }

      } else {
        this.executable = function () {
          return LAY.$filterUtils.within(
            oldExecutable.call( this ),
            attr.execute( this ),
            val
          );
        }
      }
    } else if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );
      this.executable = function () {
        return LAY.$filterUtils.within(
            oldExecutable.call( this ),
            attr,
            val.execute( this )
          );
      }
    } else {
      this.executable = function () {
        return LAY.$filterUtils.within(
            oldExecutable.call( this ),
            attr,
            val
          );
      }
    }
    return this;
  };

  LAY.Take.prototype.filterFn = function ( attr, val ) {

    var oldExecutable = this.executable;

    if ( attr instanceof LAY.Take ) {
      this.$mergePathAndAttrs( attr );

      if ( val instanceof LAY.Take ) {
        this.$mergePathAndAttrs( val );
        this.executable = function () {
          return LAY.$filterUtils.fn(
            oldExecutable.call( this ),
            attr.execute( this ),
            val.execute( this )
          );
        }

      } else {
        this.executable = function () {
          return LAY.$filterUtils.fn(
            oldExecutable.call( this ),
            attr.execute( this ),
            val
          );
        }
      }
    } else if ( val instanceof LAY.Take ) {
      this.$mergePathAndAttrs( val );
      this.executable = function () {
        return LAY.$filterUtils.fn(
            oldExecutable.call( this ),
            attr,
            val.execute( this )
          );
      }
    } else {
      this.executable = function () {
        return LAY.$filterUtils.fn(
            oldExecutable.call( this ),
            attr,
            val
          );
      }
    }
    return this;
  };

  LAY.Take.prototype.foldMin = function ( attr ) {

    var oldExecutable = this.executable;

    if ( attr instanceof LAY.Take ) {
      this.$mergePathAndAttrs( attr );
        this.executable = function () {
          return LAY.$foldUtils.min(
            oldExecutable.call( this ),
            attr.execute( this )
        );
      }
    } else {
      this.executable = function () {
        return LAY.$foldUtils.min(
          oldExecutable.call( this ),
          attr
        );
      }
      
    }
    return this;
  };

  LAY.Take.prototype.foldMax = function ( attr ) {

    var oldExecutable = this.executable;

    if ( attr instanceof LAY.Take ) {
      this.$mergePathAndAttrs( attr );
        this.executable = function () {
          return LAY.$foldUtils.max(
            oldExecutable.call( this ),
            attr.execute( this )
        );
      }
    } else {
      this.executable = function () {
        return LAY.$foldUtils.max(
          oldExecutable.call( this ),
          attr
        );
      }
      
    }
    return this;
  };

  LAY.Take.prototype.foldSum = function ( attr ) {

    var oldExecutable = this.executable;

    if ( attr instanceof LAY.Take ) {
      this.$mergePathAndAttrs( attr );
        this.executable = function () {
          return LAY.$foldUtils.sum(
            oldExecutable.call( this ),
            attr.execute( this )
        );
      }
    } else {
      this.executable = function () {
        return LAY.$foldUtils.sum(
          oldExecutable.call( this ),
          attr
        );
      }
      
    }
    return this;
  };

  LAY.Take.prototype.foldFn = function ( attr, acc ) {

     var oldExecutable = this.executable;

    if ( attr instanceof LAY.Take ) {
      this.$mergePathAndAttrs( attr );

      if ( acc instanceof LAY.Take ) {
        this.$mergePathAndAttrs( acc );
        this.executable = function () {
          return LAY.$foldUtils.fn(
            oldExecutable.call( this ),
            attr.execute( this ),
            acc.execute( this )
          );
        }

      } else {
        this.executable = function () {
          return LAY.$foldUtils.fn(
            oldExecutable.call( this ),
            attr.execute( this ),
            acc
          );
        }
      }
    } else if ( acc instanceof LAY.Take ) {
      this.$mergePathAndAttrs( acc );
      this.executable = function () {
        return LAY.$foldUtils.fn(
            oldExecutable.call( this ),
            attr,
            acc.execute( this )
          );
      }
    } else {
      this.executable = function () {
        return LAY.$foldUtils.fn(
            oldExecutable.call( this ),
            attr,
            ac
          );
      }
    }
    return this;
  };
  /*
  * Call custom function with arguments, where arguments
  * can be LAY.Take objects.
  */
  LAY.Take.prototype.fn = function () {

    var fnExecutable = this.executable;
    //console.log(fnExecutable.call(this));
    //console.log(fnExecutable, arguments, arguments.length);
    if ( arguments.length === 0 ) {

      this.executable = function () {
        return fnExecutable.call( this ).call( this );
      };

    } else if ( arguments.length === 1 ) {

      var arg = arguments[ 0 ];

      if ( arg instanceof LAY.Take ) {

        this.$mergePathAndAttrs( arg );
        this.executable = function () {

          return fnExecutable.call( this ).call( this, arg.execute( this ) );
        };
      } else {
        this.executable = function () {

          return fnExecutable.call( this ).call( this, arg );
        };
      }

    } else if ( arguments.length === 2 ) {

      var arg1 = arguments[ 0 ];
      var arg2 = arguments[ 1 ];

      if ( arg1 instanceof LAY.Take ) {

        this.$mergePathAndAttrs( arg1 );

        if ( arg2 instanceof LAY.Take ) {

          this.$mergePathAndAttrs( arg2 );

          this.executable = function () {
            return fnExecutable.call( this ).call( this, arg1.execute( this ), arg2.execute( this ) );
          };

        } else {
          this.executable = function () {

            return fnExecutable.call( this ).call( this, arg1.execute( this ), arg2 );
          };
        }

      } else if ( arg2 instanceof LAY.Take ) {

        this.$mergePathAndAttrs( arg2 );
        this.executable = function () {

          return fnExecutable.call( this ).call( this, arg1, arg2.execute( this ) );
        };


      } else {

        this.executable = function () {

          return fnExecutable.call( this ).call( this, arg1, arg2 );
        };
      }
    } else {

      var argSlength = arguments.length;
      var argS = Array.prototype.slice.call( arguments );

      for ( var i = 0, curArg; i < argSlength; i++ ) {

        curArg = arguments[ i ];

        if ( curArg instanceof LAY.Take ) {

          this.$mergePathAndAttrs( curArg );

        }
      }

      this.executable = function () {

        var executedArgS = new Array( argSlength );

        for ( var i = 0, arg; i < argSlength; i++ ) {

          arg = argS[ i ];

          executedArgS[ i ] = arg instanceof LAY.Take ? arg.execute( this ) : arg;

        }

        return fnExecutable.call( this ).apply( this, executedArgS );

      };
    }

    return this;


};

}());
