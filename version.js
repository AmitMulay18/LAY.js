var
  arg = process.argv[2],
  msg = process.argv[3],
  semver = require("semver"),
  util = require("util"),
  fs = require('fs'),
  curVersion = fs.readFileSync("version.txt").toString().trim(),
  newVersion;

if ( arg === undefined ) {
  console.error("ERROR: Enter Arg (major|minor|patch|<version>)");
  return 1;
} else if ( !semver.valid(curVersion) ) {
  console.error("ERROR: Current git version is not valid: " + curVersion );
  return 1;
} else if ( msg === undefined ) {
  console.error("ERROR: No message provided");
  return 1;  
}

var
  major = semver(curVersion).major,
  minor = semver(curVersion).minor,
  patch = semver(curVersion).patch,
  semverFormatString = "%d.%d.%d";

switch (arg) {
  case "major":
    newVersion = util.format(semverFormatString, major+1, 0, 0);
    break;
  case "minor":
    newVersion = util.format(semverFormatString, major, minor+1, 0);
    break;
  case "patch":
    newVersion = util.format(semverFormatString, major, minor, patch+1);
    break;
  default:
    if (!semver.valid(arg)) {
      console.error("ERROR: invalid semver version: " + arg );
      return 1;
    } else if ( !semver.gt(arg, curVersion )) {
      console.error("ERROR: version " + arg + " is not greater than current version " + curVersion );
      return 1;
    } else {
      newVersion = arg;
    }
}


fs.writeFileSync("version.txt", newVersion);
require("child_process").execSync("gulp concat");
require("child_process").execSync("git commit -a -m " + '"' + msg + '"');
require("child_process").execSync("git tag -a v" + newVersion + " -m " + '"' + msg + '"');





