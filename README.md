# sfdx-metadata-generator

SFDX plugin to generate metadata

[![Version](https://img.shields.io/npm/v/sfdx-metadata-generator.svg)](https://npmjs.generate/package/sfdx-metadata-generator)
[![CircleCI](https://circleci.com/gh/C:/sfdx-metadata-generator/tree/master.svg?style=shield)](https://circleci.com/gh/C:/sfdx-metadata-generator/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/C:/sfdx-metadata-generator?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/sfdx-metadata-generator/branch/master)
[![Greenkeeper](https://badges.greenkeeper.io/C:/sfdx-metadata-generator.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/C:/sfdx-metadata-generator/badge.svg)](https://snyk.io/test/github/C:/sfdx-metadata-generator)
[![Downloads/week](https://img.shields.io/npm/dw/sfdx-metadata-generator.svg)](https://npmjs.generate/package/sfdx-metadata-generator)
[![License](https://img.shields.io/npm/l/sfdx-metadata-generator.svg)](https://github.com/C:/sfdx-metadata-generator/blob/master/package.json)

- [sfdx-metadata-generator](#sfdx-metadata-generator)
- [How to get started](#how-to-get-started)
  <!-- tocstop -->
                                  <!-- install -->
                                  <!-- usage -->

```sh-session
$ npm install -g sfdx-metadata-generator
$ sfdx COMMAND
running command...
$ sfdx (--version)
sfdx-metadata-generator/1.5.15 win32-x64 node-v18.16.0
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```

<!-- usagestop -->

<!-- commands -->

- [`sfdx metadata:field:convert [-s <string>] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-metadatafieldconvert--s-string--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx metadata:field:generate [-i <string>] [-o <string>] [-u] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-metadatafieldgenerate--i-string--o-string--u---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx metadata:field:template [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-metadatafieldtemplate--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx metadata:profile:generate [-i <string>] [-o <string>] [-s <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-metadataprofilegenerate--i-string--o-string--s-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx metadata:field:convert [-s <string>] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Converts custom-field-xml-files to a file used to create or update the metadata.

```
USAGE
  $ sfdx metadata:field:convert [-s <string>] [-o <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -o, --outputdir=<value>                                                           output directory where metadata are
                                                                                    saved
  -s, --sourcedir=<value>                                                           directory where source files you
                                                                                    convert are stored
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Converts custom-field-xml-files to a file used to create or update the metadata.

EXAMPLES
  $ sfdx metadata:field:generate --sourcedir ./sourcedir/ --outputdir ./outputdir/
```

_See code: [src/commands/metadata/field/convert.ts](https://github.com/shuntaro-sfdx/sfdx-metadata-generator/blob/v1.5.15/src/commands/metadata/field/convert.ts)_

## `sfdx metadata:field:generate [-i <string>] [-o <string>] [-u] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Generates custom field metadata converting values in a csv file to xml files.

```
USAGE
  $ sfdx metadata:field:generate [-i <string>] [-o <string>] [-u] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -i, --input=<value>                                                               input file to be converted to xml
                                                                                    files
  -o, --outputdir=<value>                                                           output directory where metadata are
                                                                                    saved
  -u, --updates                                                                     whether update existing xml files in
                                                                                    outputdir or not
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Generates custom field metadata converting values in a csv file to xml files.

EXAMPLES
  $ sfdx metadata:field:generate --input ./input.csv --outputdir ./outputdir/
```

_See code: [src/commands/metadata/field/generate.ts](https://github.com/shuntaro-sfdx/sfdx-metadata-generator/blob/v1.5.15/src/commands/metadata/field/generate.ts)_

## `sfdx metadata:field:template [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a template input-csv-file.

```
USAGE
  $ sfdx metadata:field:template [-o <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -o, --outputdir=<value>                                                           directory where a template csv file
                                                                                    is saved.
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Creates a template input-csv-file.

EXAMPLES
  $ sfdx metadata:field:template --outputdir ./outputdir/
```

_See code: [src/commands/metadata/field/template.ts](https://github.com/shuntaro-sfdx/sfdx-metadata-generator/blob/v1.5.15/src/commands/metadata/field/template.ts)_

## `sfdx metadata:profile:generate [-i <string>] [-o <string>] [-s <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Updates profile metadata converting values in a csv file to xml files.

```
USAGE
  $ sfdx metadata:profile:generate [-i <string>] [-o <string>] [-s <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -i, --input=<value>                                                               input file to be converted to xml
                                                                                    files
  -o, --outputdir=<value>                                                           output directory where metadata are
                                                                                    saved
  -s, --source=<value>                                                              directory where source files you
                                                                                    convert are stored
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Updates profile metadata converting values in a csv file to xml files.

EXAMPLES
  $ sfdx metadata:profile:generate --input ./input.csv --source ./source.profile-meta.xml --outputdir ./outputdir/
```

_See code: [src/commands/metadata/profile/generate.ts](https://github.com/shuntaro-sfdx/sfdx-metadata-generator/blob/v1.5.15/src/commands/metadata/profile/generate.ts)_

<!-- commandsstop -->

<!-- debugging-your-plugin -->

# How to get started

Make sure you have already installed this plugin.

## Field metadata

To start generating field metadata, you need a csv file to include tab names e.g., fullName, label, type, ... , at the header and values for those tags to determine each detail of custom fields from the second line.

| Tag                      | Description                                                                                                                                                                                                       |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fullName                 | Custom field API name.                                                                                                                                                                                            |
| label                    | Field label name.                                                                                                                                                                                                 |
| type                     | Data type. Options are listed below:<br>Checkbox, Currency, Date, DateTime, Email, Location, Number, Percent, Phone, Picklist, MultiselectPicklist, Text, TextArea, LongTextArea, Html, EncryptedText, Time, Url. |
| required                 | Whether it is required. Options are listed below:<br>true, false.                                                                                                                                                 |
| externalId               | Whether it is an external ID. Options are listed below:<br>true, false.                                                                                                                                           |
| trackTrending            | Whether to track historical trending. Options are listed below:<br>true, false.                                                                                                                                   |
| unique                   | Whether it is unique. Options are listed below:<br>true, false.                                                                                                                                                   |
| defaultValue             | Default value. Applied only when Checkbox is choosen as data type. Options are listed below:<br>true, false.                                                                                                      |
| displayLocationInDecimal | Whether to display location in decimal. Options are listed below:<br>true, false.                                                                                                                                 |
| scale                    | The number of decimal places.                                                                                                                                                                                     |
| precision                | The number of digits.                                                                                                                                                                                             |
| visibleLines             | Visible lines applied to MultiselectPicklist, LongTextArea, and Html.                                                                                                                                             |
| length                   | Text length applied to Text, TextArea, LongTextArea, and Html.                                                                                                                                                    |
| maskChar                 | Mask character applied to EncryptedText. Options are listed below:<br>asterisk, X.                                                                                                                                |
| maskType                 | Mask type applied to EncryptedText. Options are listed below:<br>all, lastFour, creditCard, nino, ssn, sin.                                                                                                       |
| picklistFullName         | Picklist API Names applied to Picklist and MultiselectPicklist. Note that semicolon ';' is used as delimiter to separate character string in multiple names.                                                      |
| picklistLabel            | Picklist labels applied to Picklist and MultiselectPicklist. Note that semicolon ';' is used as delimiter to separate character string in multiple labels.                                                        |

Or you can create a template file running the following commnad:

```
  $ sfdx metadata:field:template --outputdir ./outputdir/
```

Then, `sfdx metadata:field:generate` generates custom field metadata of the input-csv-file.

The flag `--input` specifies the input-csv-file to be converted to metadata-xml-files and `--outputdir` the directory to save those xml files.

```
  $ sfdx metadata:field:generate --input ./input.csv --outputdir ./outputdir/
```

You can also update custom-field-xml-files with `sfdx metadata:field:convert`. Assume you have created SFDX project and retrieved field-xml files you want to update. Then, run the following command to rewrite the files in the csv format.

```
  $ sfdx metadata:field:convert -sourcedir ./force-app/main/default/objects/Account/fields/ --outputdir ../outputdir/
```

Edit the craeted csv file as you want to update metadata, and then run `sfdx metadata:field:generate --updates` to override the xml files.

Note that runnning without `--updates` avoids overrinding existing metadata.

```
  $ sfdx metadata:field:generate --input ./input.csv --outputdir ./outputdir/ --updates
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
