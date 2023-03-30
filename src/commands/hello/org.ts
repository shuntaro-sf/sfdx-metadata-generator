/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import * as os from 'os';
import { readFileSync, existsSync, writeFileSync } from 'fs';
import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('metadata-generator', 'org');

export default class Org extends SfdxCommand {
  public static description = messages.getMessage('commandDescription');

  public static examples = messages.getMessage('examples').split(os.EOL);

  public static args = [{ name: 'file' }];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    name: flags.string({
      char: 'n',
      description: messages.getMessage('nameFlagDescription'),
    }),
    force: flags.boolean({
      char: 'f',
      description: messages.getMessage('forceFlagDescription'),
    }),
    inputdir: flags.string({
      char: 'i',
      description: messages.getMessage('inputdirFlagDescription'),
    }),
    outputdir: flags.string({
      char: 'o',
      description: messages.getMessage('outputdirFlagDescription'),
    })
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  private static defaultValues = {
    'Checkbox': {
      'fullName': 'CustomField',
      'externalId': 'false',
      'label': 'CustomField',
      'required': null,
      'type': 'Checkbox',
      'trackTrending': 'false',
      'unique': null,
      'defaultValue': 'false' ,
      'displayLocationInDecimal': null,
      'scale':null,
      'precision': null,
      'valueSet': null,
      'visibleLines': null,
      'length':null,
      'maskChar': null,
      'maskType': null
    },
    'Currency': {
      'fullName': 'CustomField',
      'externalId': 'false',
      'label': 'CustomField',
      'required': 'false',
      'type': 'Currency',
      'trackTrending': 'false',  'unique': null,
      'defaultValue': null ,
      'displayLocationInDecimal': null,
      'scale': '0',
      'precision': '18',
      'valueSet': null,
      'visibleLines': null,
      'length':null,
      'maskChar': null,
      'maskType': null
    },
    'Date': {
      'fullName': 'CustomField',
      'externalId': 'false',
      'label': 'CustomField',
      'required': 'false',
      'type': 'Date',
      'trackTrending': 'false',
      'unique': null,
      'defaultValue': null ,
      'displayLocationInDecimal': null,
      'scale':null,
      'precision': null,
      'valueSet': null,
      'visibleLines': null,
      'length':null,
      'maskChar': null,
      'maskType': null
    },
    'DateTime': {
      'fullName': 'CustomField',
      'externalId': 'false',
      'label': 'CustomField',
      'required': null,
      'type': 'DateTime',
      'trackTrending': 'false',
      'unique': null,
      'defaultValue': 'false',
      'displayLocationInDecimal': null,
      'scale':null,
      'precision': null,
      'valueSet': null,
      'visibleLines': null,
      'length':null,
      'maskChar': null,
      'maskType': null
    },
    'Email': {
      'fullName': 'CustomField',
      'externalId': 'false',
      'label': 'CustomField',
      'required': 'false',
      'type': 'Email',
      'trackTrending': 'false',
      'unique': null,
      'defaultValue': null,
      'displayLocationInDecimal': null,
      'scale':null,
      'precision': null,
      'valueSet': null,
      'visibleLines': null,
      'length':null,
      'maskChar': null,
      'maskType': null
    },
  };

  public async run(): Promise<AnyJson> {
    const name = (this.flags.name || 'world') as string;
    const inputDir = this.flags.inputdir as string;
    this.ux.log(this.flags.inputdir);
    this.ux.log(inputDir);
    this.ux.log(name);
    if( !existsSync( this.flags.inputdir ) ){
      throw new SfError(messages.getMessage('not specified directory'));
    }
    const csv = readFileSync(this.flags.inputdir, {
      encoding: "utf8",
    })
    .toString() // convert Buffer to string
    .split('\n') // split string to lines
    .map(e => e.trim()) // remove white spaces for each line
    .map(e => e.split(',').map(e => e.trim()));

    this.ux.log(JSON.stringify(Org.defaultValues));
    this.ux.log(JSON.stringify(csv));

    const header = csv[0];
    const indexOfType = header.indexOf('Type');
    this.ux.log(indexOfType.toString());
    for (let row = 1; row <  csv.length; row++) {
      if (csv[row].length < header.length) {
        continue;
      }
      this.ux.log(csv[row][0]);
      let tagStrs = [];
      let metaStr = '<?xml version="1.0" encoding="UTF-8"?>\n<CustomField xmlns="http://soap.sforce.com/2006/04/metadata">'
      const type = csv[row][indexOfType];
      this.ux.log(type);

      for (const tag in Org.defaultValues[type]) {
        const idxOfTag = header.indexOf(tag);
        this.ux.log(Org.defaultValues[type][tag]);
        if (Org.defaultValues[type][tag] === null) {
          continue;
        }

        let tagStr = '';
        if (csv[row][idxOfTag] != "") {
          tagStr = '<' +  tag +  '>' + csv[row][idxOfTag]  + '</' + tag + '>'
        } else {
          if (tag === 'fullname' || tag === 'label') {
            tagStr = '<' +  tag +  '>' + Org.defaultValues[type][tag] + row + '</' + tag + '>'
          }
          else {
            tagStr = '<' +  tag +  '>' +  Org.defaultValues[type][tag] + '</' + tag + '>'
          }
        }
        tagStrs.push(tagStr);
      }
      metaStr += '\n    ' + tagStrs.join('\n    ');
      const dd = this.getPicklistMetaStr();
      this.ux.log(dd);
      this.ux.log(JSON.stringify(metaStr));

      metaStr += '\n</CustomField>';


      try {
        writeFileSync('output2.xml', metaStr);
        console.log('write end');
      }catch(e){
        console.log(e);
      }
      }
    /*

    For i = 2 To Cells(Rows.Count, 1).End(xlUp).Row
            Dim metaStr As String
            metaStr = "<?xml version=""1.0"" encoding=""UTF-8""?>" & vbCrLf & "<CustomField xmlns=""http://soap.sforce.com/2006/04/metadata"">"

            Debug.Print Timer & "tag loop"
            For Each Tag In tags
                Dim tagCell As Range
                Dim typeCell As Range
                Dim inputTagCell As Range
                Set tagCell = Worksheets("Config").Range("A:A").Find(Tag, LookAt:=xlWhole)
                Set typeCell = Worksheets("Config").Range("A1:S1").Find(Cells(i, 3), LookAt:=xlWhole)
                Set inputTagCell = Range("A1:S1").Find(Tag, LookAt:=xlWhole)

                If Worksheets("Config").Cells(tagCell.Row, typeCell.Column) <> "NULL" And Tag <> "valueSet" Then
                    If Cells(i, inputTagCell.Column) <> "" Then
                        tagStr = "<" & Tag & ">" & Cells(i, inputTagCell.Column) & "</" & Tag & ">"
                    Else
                        If Tag = "fullName" Or Tag = "label" Then
                            tagStr = "<" & Tag & ">" & Worksheets("Config").Cells(tagCell.Row, typeCell.Column) & i & "</" & Tag & ">"
                        Else
                            tagStr = "<" & Tag & ">" & Worksheets("Config").Cells(tagCell.Row, typeCell.Column) & "</" & Tag & ">"
                        End If
                    End If
                    metaStr = Join(Array(metaStr, tagStr), vbCrLf & "    ")
                End If
            Next Tag
            Debug.Print Timer & "end tag loop"

            Dim inputTypeCell As Range
            Set inputTypeCell = Range("A1:R1").Find("Type", LookAt:=xlWhole)

            If Cells(i, inputTypeCell.Column) = "Picklist" Or Cells(i, inputTypeCell.Column) = "MultiselectPicklist" Then
                Dim inputPicklistNameCell As Range
                Dim inputPicklistLabelCell As Range
                Set inputPicklistNameCell = Range("A1:R1").Find("PicklistName", LookAt:=xlWhole)
                Set inputPicklistLabelCell = Range("A1:R1").Find("PicklistLabel", LookAt:=xlWhole)

                metaStr = Join(Array(metaStr, getListMetaStr(Cells(i, inputPicklistNameCell.Column), Cells(i, inputPicklistLabelCell.Column))), vbCrLf & "    ")
            End If
            metaStr = metaStr & vbCrLf & "</CustomField>"
            Dim strOutputFilePath As String

            Dim outStream As Object
            Set outStream = CreateObject("ADODB.Stream")
            outStream.Charset = "UTF-8"
            outStream.LineSeparator = -1
            outStream.Open
            outStream.WriteText metaStr, 1
            outStream.SaveToFile folderPath & "\" & Cells(i, 1) & ".field-meta.xml", 2
            outStream.Close

        Next*/
    // this.org is guaranteed because requiresUsername=true, as opposed to supportsUsername
   // const conn = this.org.getConnection();
 //   const query = 'Select Name, TrialExpirationDate from Organization';

    // The type we are querying for
   // interface Organization {
   //   Name: string;
   //   TrialExpirationDate: string;
   // }
/*
    // Query the org
    const result = await conn.query<Organization>(query);

    // Organization will always return one result, but this is an example of throwing an error
    // The output and --json will automatically be handled for you.
    if (!result.records || result.records.length <= 0) {
      throw new SfError(messages.getMessage('errorNoOrgResults', [this.org.getOrgId()]));
    }

    // Organization always only returns one result
    const orgName = result.records[0].Name;
    const trialExpirationDate = result.records[0].TrialExpirationDate;

    let outputString = `Hello ${name}! This is org: ${orgName}`;
    if (trialExpirationDate) {
      const date = new Date(trialExpirationDate).toDateString();
      outputString = `${outputString} and I will be around until ${date}!`;
    }
    this.ux.log(outputString);

    // this.hubOrg is NOT guaranteed because supportsHubOrgUsername=true, as opposed to requiresHubOrgUsername.
    if (this.hubOrg) {
      const hubOrgId = this.hubOrg.getOrgId();
      this.ux.log(`My hub org id is: ${hubOrgId}`);
    }

    if (this.flags.force && this.args.file) {
      this.ux.log(`You input --force and a file: ${this.args.file as string}`);
    }

    // Return an object to be displayed with --json*/
    return { inputdir: this.flags.inputdir };
  }
  private getPicklistMetaStr () {
    return 'pick';
  }
}
