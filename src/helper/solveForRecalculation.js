( function () {
  "use strict";
  LAID.$solveForRecalculation = function () {

    var i, j, len, jLen,
    isSolveProgressed,
    ret,
    recalculateDirtyLevelS = LAID.$recalculateDirtyLevelS,
    newlyInstalledStateLevelS = LAID.$newlyInstalledStateLevelS,
    newlyInstalledStateLevel,
    newlyInstalledStateS,
    fnNewlyInstalledStateInstall,
    newlyUninstalledStateLevelS = LAID.$newlyUninstalledStateLevelS,
    newlyUninstalledStateLevel,
    newlyUninstalledStateS,
    fnNewlyUninstalledStateUninstall;

    do {
      isSolveProgressed = false;
      for ( i = 0, len = recalculateDirtyLevelS.length; i < len; i++ ) {
        ret = recalculateDirtyLevelS[ i ].$solveForRecalculation();
        if ( ret !== 3 ) {
          isSolveProgressed = true;
          if ( ret === 1 ) {
            LAID.$arrayUtils.removeAtIndex( recalculateDirtyLevelS, i );
            i--;
          }
        }
      }
      // The reason we will not use `len` to check the length below is
      // that more recalculate dirty levels could have been added during
      // the loop
    } while ( ( recalculateDirtyLevelS.length !== 0 ) && isSolveProgressed );

    if ( recalculateDirtyLevelS.length !== 0 ) {
      throw "LAID Error: Circular/Undefined Reference Encountered";
    }

    for ( i = 0, len = newlyInstalledStateLevelS.length; i < len; i++ ) {
      newlyInstalledStateLevel = newlyInstalledStateLevelS[ i ];
      newlyInstalledStateS = newlyInstalledStateLevel.$newlyInstalledStateS;
      for ( j = 0, jLen = newlyInstalledStateS.length; j < jLen; j++ ) {
        fnNewlyInstalledStateInstall =
          newlyInstalledStateLevel.$lson.states[ newlyInstalledStateS[ j ] ].install;
        fnNewlyInstalledStateInstall && fnNewlyInstalledStateInstall.call( this );
      }
      // empty the list
      newlyInstalledStateLevel.$newlyInstalledStateS = [];
    }
    LAID.$newlyInstalledStateLevelS = [];

    for ( i = 0, len = newlyUninstalledStateLevelS.length; i < len; i++ ) {
      newlyUninstalledStateLevel = newlyUninstalledStateLevelS[ i ];
      newlyUninstalledStateS = newlyUninstalledStateLevel.$newlyUninstalledStateS;
      for ( j = 0, jLen = newlyUninstalledStateS.length; j < jLen; j++ ) {
        fnNewlyUninstalledStateUninstall =
        newlyUninstalledStateLevel.$lson.states[ newlyUninstalledStateS[ j ] ].uninstall;
        fnNewlyUninstalledStateUninstall && fnNewlyUninstalledStateUninstall.call( this );
      }
      // empty the list
      newlyUninstalledStateLevel.$newlyUninstalledStateS = [];
    }
    LAID.$newlyUninstalledStateLevelS = [];

  };

})();