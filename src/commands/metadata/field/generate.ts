/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.generate/licenses/BSD-3-Clause
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
const messages = Messages.loadMessages('metadata-generator', 'generate');

export default class generate extends SfdxCommand {
  public static description = messages.getMessage('commandDescription');

  public static examples = messages.getMessage('examples').split(os.EOL);

  public static args = [{ name: 'file' }];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    inputdir: flags.string({
      char: 'i',
      description: messages.getMessage('inputdirFlagDescription'),
    }),
    outputdir: flags.string({
      char: 'o',
      description: messages.getMessage('outputdirFlagDescription'),
    })
  };

  // Comment this out if your command does not require an generate username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub generate username
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
      'trackTrending': 'false',
      'unique': null,
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
    'Location': {
      'fullName': 'CustomField',
      'externalId': 'false',
      'label': 'CustomField',
      'required': 'false',
      'type': 'Location',
      'trackTrending': 'false',
      'unique': null,
      'defaultValue': null,
      'displayLocationInDecimal': 'false',
      'scale': '0',
      'precision': null,
      'valueSet': null,
      'visibleLines': null,
      'length':null,
      'maskChar': null,
      'maskType': null
    },
    'Number': {
      'fullName': 'CustomField',
      'externalId': 'false',
      'label': 'CustomField',
      'required': 'false',
      'type': 'Number',
      'trackTrending': 'false',
      'unique': 'false',
      'defaultValue': null,
      'displayLocationInDecimal': null,
      'scale': '0',
      'precision': '18',
      'valueSet': null,
      'visibleLines': null,
      'length':null,
      'maskChar': null,
      'maskType': null
    },
    'Percent': {
      'fullName': 'CustomField',
      'externalId': 'false',
      'label': 'CustomField',
      'required': 'false',
      'type': 'Percent',
      'trackTrending': 'false',
      'unique': null,
      'defaultValue': null,
      'displayLocationInDecimal': null,
      'scale': '0',
      'precision': '18',
      'valueSet': null,
      'visibleLines': null,
      'length':null,
      'maskChar': null,
      'maskType': null
    },
    'Phone': {
      'fullName': 'CustomField',
      'externalId': 'false',
      'label': 'CustomField',
      'required': 'false',
      'type': 'Phone',
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
    'Picklist': {
      'fullName': 'CustomField',
      'externalId': 'false',
      'label': 'CustomField',
      'required': 'false',
      'type': 'Picklist',
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
    'MultiselectPicklist': {
      'fullName': 'CustomField',
      'externalId': 'false',
      'label': 'CustomField',
      'required': 'false',
      'type': 'MultiselectPicklist',
      'trackTrending': 'false',
      'unique': null,
      'defaultValue': null,
      'displayLocationInDecimal': null,
      'scale':null,
      'precision': null,
      'valueSet': null,
      'visibleLines': '4',
      'length':null,
      'maskChar': null,
      'maskType': null
    },
    'Text': {
      'fullName': 'CustomField',
      'externalId': 'false',
      'label': 'CustomField',
      'required': 'false',
      'type': 'Text',
      'trackTrending': 'false',
      'unique': 'false',
      'defaultValue': null,
      'displayLocationInDecimal': null,
      'scale':null,
      'precision': null,
      'valueSet': null,
      'visibleLines': null,
      'length': '255',
      'maskChar': null,
      'maskType': null
    },
    'TextArea': {
      'fullName': 'CustomField',
      'externalId': 'false',
      'label': 'CustomField',
      'required': 'false',
      'type': 'TextArea',
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
    'LongTextArea': {
      'fullName': 'CustomField',
      'externalId': 'false',
      'label': 'CustomField',
      'required': null,
      'type': 'LongTextArea',
      'trackTrending': 'false',
      'unique': null,
      'defaultValue': null,
      'displayLocationInDecimal': null,
      'scale':null,
      'precision': null,
      'valueSet': null,
      'visibleLines': '3',
      'length': '32768',
      'maskChar': null,
      'maskType': null
    },
    'Html': {
      'fullName': 'CustomField',
      'externalId': 'false',
      'label': 'CustomField',
      'required': null,
      'type': 'Html',
      'trackTrending': 'false',
      'unique': null,
      'defaultValue': null,
      'displayLocationInDecimal': null,
      'scale':null,
      'precision': null,
      'valueSet': null,
      'visibleLines': '25',
      'length': '32768',
      'maskChar': null,
      'maskType': null
    },
    'EncryptedText': {
      'fullName': 'CustomField',
      'externalId': 'false',
      'label': 'CustomField',
      'required': 'false',
      'type': 'EncryptedText',
      'trackTrending': 'false',
      'unique': null,
      'defaultValue': null,
      'displayLocationInDecimal': null,
      'scale':null,
      'precision': null,
      'valueSet': null,
      'visibleLines': null,
      'length': '175',
      'maskChar': 'asterisk',
      'maskType': 'all'
    },
    'Time': {
      'fullName': 'CustomField',
      'externalId': 'false',
      'label': 'CustomField',
      'required': 'false',
      'type': 'Time',
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
    'Url': {
      'fullName': 'CustomField',
      'externalId': 'false',
      'label': 'CustomField',
      'required': 'false',
      'type': 'Url',
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
    }
  };

  public async run(): Promise<AnyJson> {
    if( !existsSync( this.flags.inputdir ) ){
      throw new SfError(messages.getMessage('not specified input-directory'));
    }
    if (!existsSync(this.flags.outputdir)) {
      throw new SfError(messages.getMessage('not specified output-directory'));
    }
    const csv = readFileSync(this.flags.inputdir, {
      encoding: "utf8",
    })
    .toString()
    .split('\n')
    .map(e => e.trim())
    .map(e => e.split(',').map(e => e.trim()));

    const header = csv[0];
    for (let rowIndex = 1; rowIndex <  csv.length; rowIndex++) {
      if (csv[rowIndex].length < header.length) {
        continue;
      }
      let metaStr = this.getMetaStr(csv[rowIndex], header);

      try {
        const indexOfFullName = header.indexOf('FullName');
        writeFileSync(this.flags.outputdir + '/' + csv[rowIndex][indexOfFullName] + '.field-meta.xml', metaStr);

        const cyan = '\u001b[36m';
        const white = '\u001b[37m';
        const message = cyan + csv[rowIndex][indexOfFullName] + '.field-meta.xml' + white + ' has been successfully generated into ' + this.flags.outputdir;
        console.log(message);
      }catch(e){
        console.log(e);
      }
      }
    // Return an object to be displayed with --json*/
    return { inputdir: this.flags.inputdir };
  }

  private getMetaStr(row: string[], header: string[]) {
    const indexOfType = header.indexOf('Type');
    let tagStrs = [];
      let metaStr = '<?xml version="1.0" encoding="UTF-8"?>\n<CustomField xmlns="http://soap.sforce.com/2006/04/metadata">'
      const type = row[indexOfType];

      for (const tag in generate.defaultValues[type]) {
        const idxOfTag = header.indexOf(tag);
        if (generate.defaultValues[type][tag] === null) {
          continue;
        }

        let tagStr = '';
        if (row[idxOfTag] != "") {
          tagStr = '<' + tag + '>' + row[idxOfTag] + '</' + tag + '>'
        } else {
          if (tag === 'fullname' || tag === 'label') {
            tagStr = '<' + tag + '>' + generate.defaultValues[type][tag] + row + '</' + tag + '>'
          }
          else {
            tagStr = '<' + tag + '>' + generate.defaultValues[type][tag] + '</' + tag + '>'
          }
        }
        tagStrs.push(tagStr);
      }


      metaStr += '\n    ' + tagStrs.join('\n    ');

      if (row[indexOfType] === 'Picklist' || row[indexOfType] === "MultiselectPicklist") {
        const idxOfPicklistName = header.indexOf('PicklistName');
        const idxOfPicklistLabel = header.indexOf('PicklistLabel');
        metaStr += '\n    ' + this.getPicklistMetaStr(row[idxOfPicklistName], row[idxOfPicklistLabel]);
      }

      metaStr += '\n</CustomField>';
      return metaStr;
  }
  private getPicklistMetaStr (inputPicklistName: string, inputPicklistLabel: string) {
    let picklistValueStr = '';
    let picklistMetaStr = '<valueSet>\n        <valueSetDefinition>\n            <sorted>false</sorted>';
    const picklistDefaultStr = "<default>false</default>";
    let picklistValues = [];
    const picklistNames = inputPicklistName.split(';');
    const picklistLabels = inputPicklistLabel.split(';');
    for (let idx = 0; idx < picklistNames.length; idx++) {
        let picklistNameStr = '';
        let picklistLabelStr = '';
        let eachPicklistMetaStr = "<value>"
        picklistNameStr = '<fullName>' + picklistNames[idx] + '</fullName>';
        picklistLabelStr = '<label>' + picklistLabels[idx] + '</label>';
        eachPicklistMetaStr += [eachPicklistMetaStr, picklistNameStr, picklistDefaultStr, picklistLabelStr].join( '\n                ');
        eachPicklistMetaStr += '\n            </value>';
        picklistValues[idx] = eachPicklistMetaStr;
    }
    picklistValueStr = picklistValues.join('\n            ');
    picklistMetaStr += '\n            ' + picklistValueStr + '\n        </valueSetDefinition>\n    </valueSet>';
    return picklistMetaStr;
  }
}
