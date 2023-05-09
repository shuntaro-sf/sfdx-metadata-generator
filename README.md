# metadata-generator

SFDX plugin to generate metadata

[![Version](https://img.shields.io/npm/v/metadata-generator.svg)](https://npmjs.generate/package/metadata-generator)
[![CircleCI](https://circleci.com/gh/C:/metadata-generator/tree/master.svg?style=shield)](https://circleci.com/gh/C:/metadata-generator/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/C:/metadata-generator?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/metadata-generator/branch/master)
[![Greenkeeper](https://badges.greenkeeper.io/C:/metadata-generator.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/C:/metadata-generator/badge.svg)](https://snyk.io/test/github/C:/metadata-generator)
[![Downloads/week](https://img.shields.io/npm/dw/metadata-generator.svg)](https://npmjs.generate/package/metadata-generator)
[![License](https://img.shields.io/npm/l/metadata-generator.svg)](https://github.com/C:/metadata-generator/blob/master/package.json)

<!-- toc -->
* [metadata-generator](#metadata-generator)
* [How to get started](#how-to-get-started)
<!-- tocstop -->
          <!-- install -->
          <!-- usage -->
```sh-session
$ npm install -g metadata-generator
$ sfdx COMMAND
running command...
$ sfdx (--version)
metadata-generator/0.0.1 win32-x64 node-v16.15.0
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx metadata:field:generate [-i <string>] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-metadatafieldgenerate--i-string--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx metadata:field:template [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-metadatafieldtemplate--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx metadata:field:generate [-i <string>] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

print a greeting and your generate IDs

```
USAGE
  $ sfdx metadata:field:generate [-i <string>] [-o <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -i, --input=<value>                                                               input file to be converted to xml
                                                                                    files
  -o, --outputdir=<value>                                                           output directory where metadata are
                                                                                    saved
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  print a greeting and your generate IDs

EXAMPLES
  $ sfdx metadata:field:generate --input ./input.csv --outputdir ./outputdir/
```

## `sfdx metadata:field:template [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

print a greeting and your template IDs

```
USAGE
  $ sfdx metadata:field:template [-o <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -o, --outputdir=<value>                                                           example boolean flag
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  print a greeting and your template IDs

EXAMPLES
  $ sfdx metadata:field:template --outputdir ./outputdir/
```
<!-- commandsstop -->
<!-- debugging-your-plugin -->

# How to get started

Make sure you have already installed this plugin.

## Field metadata

To start generating field metadata, you need a csv file to include tab names e.g., fullName, label, type, ... , at the header and values for those tags to determine each detail of custom fields from the second line. Or you can create a template file running the following commnad:

```
  $ sfdx metadata:field:template --outputdir ./outputdir/
```

Then, `sfdx metadata:field:generate` generates custom field metadata of the input-csv-file. The flag `--input` specifies the input-csv-file to be converted to metadata-xml-files and `--outputdir` the directory to save those xml files.

```
  $ sfdx metadata:field:generate --input ./input.csv --outputdir ./outputdir/
```

<!---
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `generate:generate` command:

1. Start the inspector

If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch:

```sh-session
$ sfdx generate:generate -u mygenerate@example.com --dev-suspend
```

Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:

```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run generate:generate -u mygenerate@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program.
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
   <br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
   Congrats, you are debugging!
-->
