/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.generate/licenses/BSD-3-Clause
 */
import * as os from "os";
import { readFileSync, existsSync, writeFileSync } from "fs";
import { flags, SfdxCommand } from "@salesforce/command";
import { Messages, SfError } from "@salesforce/core";
import { AnyJson } from "@salesforce/ts-types";

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages("metadata-generator", "generate");

export default class generate extends SfdxCommand {
  public static description = messages.getMessage("commandDescription");

  public static examples = messages.getMessage("examples").split(os.EOL);

  public static args = [{ name: "file" }];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    inputdir: flags.string({
      char: "i",
      description: messages.getMessage("inputdirFlagDescription"),
    }),
    outputdir: flags.string({
      char: "o",
      description: messages.getMessage("outputdirFlagDescription"),
    }),
  };

  // Comment this out if your command does not require an generate username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub generate username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  private static defaultValues = {
    Checkbox: {
      fullName: null,
      externalId: "false",
      label: "CustomField",
      required: null,
      type: "Checkbox",
      trackTrending: "false",
      unique: null,
      defaultValue: "false",
      displayLocationInDecimal: null,
      scale: null,
      precision: null,
      visibleLines: null,
      length: null,
      maskChar: null,
      maskType: null,
    },
    Currency: {
      fullName: null,
      externalId: "false",
      label: "CustomField",
      required: "false",
      type: "Currency",
      trackTrending: "false",
      unique: null,
      defaultValue: null,
      displayLocationInDecimal: null,
      scale: "0",
      precision: "18",
      visibleLines: null,
      length: null,
      maskChar: null,
      maskType: null,
    },
    Date: {
      fullName: null,
      externalId: "false",
      label: "CustomField",
      required: "false",
      type: "Date",
      trackTrending: "false",
      unique: null,
      defaultValue: null,
      displayLocationInDecimal: null,
      scale: null,
      precision: null,
      visibleLines: null,
      length: null,
      maskChar: null,
      maskType: null,
    },
    DateTime: {
      fullName: null,
      externalId: "false",
      label: "CustomField",
      required: null,
      type: "DateTime",
      trackTrending: "false",
      unique: null,
      defaultValue: "false",
      displayLocationInDecimal: null,
      scale: null,
      precision: null,
      visibleLines: null,
      length: null,
      maskChar: null,
      maskType: null,
    },
    Email: {
      fullName: null,
      externalId: "false",
      label: "CustomField",
      required: "false",
      type: "Email",
      trackTrending: "false",
      unique: null,
      defaultValue: null,
      displayLocationInDecimal: null,
      scale: null,
      precision: null,
      visibleLines: null,
      length: null,
      maskChar: null,
      maskType: null,
    },
    Location: {
      fullName: null,
      externalId: "false",
      label: "CustomField",
      required: "false",
      type: "Location",
      trackTrending: "false",
      unique: null,
      defaultValue: null,
      displayLocationInDecimal: "false",
      scale: "0",
      precision: null,
      visibleLines: null,
      length: null,
      maskChar: null,
      maskType: null,
    },
    Number: {
      fullName: null,
      externalId: "false",
      label: "CustomField",
      required: "false",
      type: "Number",
      trackTrending: "false",
      unique: "false",
      defaultValue: null,
      displayLocationInDecimal: null,
      scale: "0",
      precision: "18",
      visibleLines: null,
      length: null,
      maskChar: null,
      maskType: null,
    },
    Percent: {
      fullName: null,
      externalId: "false",
      label: "CustomField",
      required: "false",
      type: "Percent",
      trackTrending: "false",
      unique: null,
      defaultValue: null,
      displayLocationInDecimal: null,
      scale: "0",
      precision: "18",
      visibleLines: null,
      length: null,
      maskChar: null,
      maskType: null,
    },
    Phone: {
      fullName: null,
      externalId: "false",
      label: "CustomField",
      required: "false",
      type: "Phone",
      trackTrending: "false",
      unique: null,
      defaultValue: null,
      displayLocationInDecimal: null,
      scale: null,
      precision: null,
      visibleLines: null,
      length: null,
      maskChar: null,
      maskType: null,
    },
    Picklist: {
      fullName: null,
      externalId: "false",
      label: "CustomField",
      required: "false",
      type: "Picklist",
      trackTrending: "false",
      unique: null,
      defaultValue: null,
      displayLocationInDecimal: null,
      scale: null,
      precision: null,
      visibleLines: null,
      length: null,
      maskChar: null,
      maskType: null,
    },
    MultiselectPicklist: {
      fullName: null,
      externalId: "false",
      label: "CustomField",
      required: "false",
      type: "MultiselectPicklist",
      trackTrending: "false",
      unique: null,
      defaultValue: null,
      displayLocationInDecimal: null,
      scale: null,
      precision: null,
      visibleLines: "4",
      length: null,
      maskChar: null,
      maskType: null,
    },
    Text: {
      fullName: null,
      externalId: "false",
      label: "CustomField",
      required: "false",
      type: "Text",
      trackTrending: "false",
      unique: "false",
      defaultValue: null,
      displayLocationInDecimal: null,
      scale: null,
      precision: null,
      visibleLines: null,
      length: "255",
      maskChar: null,
      maskType: null,
    },
    TextArea: {
      fullName: null,
      externalId: "false",
      label: "CustomField",
      required: "false",
      type: "TextArea",
      trackTrending: "false",
      unique: null,
      defaultValue: null,
      displayLocationInDecimal: null,
      scale: null,
      precision: null,
      visibleLines: null,
      length: null,
      maskChar: null,
      maskType: null,
    },
    LongTextArea: {
      fullName: null,
      externalId: "false",
      label: "CustomField",
      required: null,
      type: "LongTextArea",
      trackTrending: "false",
      unique: null,
      defaultValue: null,
      displayLocationInDecimal: null,
      scale: null,
      precision: null,
      visibleLines: "3",
      length: "32768",
      maskChar: null,
      maskType: null,
    },
    Html: {
      fullName: null,
      externalId: "false",
      label: "CustomField",
      required: null,
      type: "Html",
      trackTrending: "false",
      unique: null,
      defaultValue: null,
      displayLocationInDecimal: null,
      scale: null,
      precision: null,
      visibleLines: "25",
      length: "32768",
      maskChar: null,
      maskType: null,
    },
    EncryptedText: {
      fullName: null,
      externalId: "false",
      label: "CustomField",
      required: "false",
      type: "EncryptedText",
      trackTrending: "false",
      unique: null,
      defaultValue: null,
      displayLocationInDecimal: null,
      scale: null,
      precision: null,
      visibleLines: null,
      length: "175",
      maskChar: "asterisk",
      maskType: "all",
    },
    Time: {
      fullName: null,
      externalId: "false",
      label: "CustomField",
      required: "false",
      type: "Time",
      trackTrending: "false",
      unique: null,
      defaultValue: null,
      displayLocationInDecimal: null,
      scale: null,
      precision: null,
      visibleLines: null,
      length: null,
      maskChar: null,
      maskType: null,
    },
    Url: {
      fullName: null,
      externalId: "false",
      label: "CustomField",
      required: "false",
      type: "Url",
      trackTrending: "false",
      unique: null,
      defaultValue: null,
      displayLocationInDecimal: null,
      scale: null,
      precision: null,
      visibleLines: null,
      length: null,
      maskChar: null,
      maskType: null,
    },
  };
  private static isRequired = {
    Checkbox: {
      fullName: true,
      externalId: false,
      label: true,
      required: false,
      type: true,
      trackTrending: false,
      unique: false,
      defaultValue: true,
      displayLocationInDecimal: false,
      scale: false,
      precision: false,
      visibleLines: false,
      length: false,
      maskChar: false,
      maskType: false,
    },
    Currency: {
      fullName: true,
      externalId: false,
      label: true,
      required: false,
      type: true,
      trackTrending: false,
      unique: false,
      defaultValue: false,
      displayLocationInDecimal: false,
      scale: true,
      precision: true,
      visibleLines: false,
      length: false,
      maskChar: false,
      maskType: false,
    },
    Date: {
      fullName: true,
      externalId: false,
      label: true,
      required: false,
      type: true,
      trackTrending: false,
      unique: false,
      defaultValue: false,
      displayLocationInDecimal: false,
      scale: false,
      precision: false,
      visibleLines: false,
      length: false,
      maskChar: false,
      maskType: false,
    },
    DateTime: {
      fullName: true,
      externalId: false,
      label: true,
      required: null,
      type: true,
      trackTrending: false,
      unique: null,
      defaultValue: false,
      displayLocationInDecimal: false,
      scale: false,
      precision: false,
      visibleLines: false,
      length: false,
      maskChar: false,
      maskType: false,
    },
    Email: {
      fullName: true,
      externalId: false,
      label: true,
      required: false,
      type: true,
      trackTrending: false,
      unique: false,
      defaultValue: false,
      displayLocationInDecimal: false,
      scale: false,
      precision: false,
      visibleLines: false,
      length: false,
      maskChar: false,
      maskType: false,
    },
    Location: {
      fullName: true,
      externalId: false,
      label: true,
      required: false,
      type: true,
      trackTrending: false,
      unique: false,
      defaultValue: false,
      displayLocationInDecimal: true,
      scale: true,
      precision: false,
      visibleLines: false,
      length: false,
      maskChar: false,
      maskType: false,
    },
    Number: {
      fullName: true,
      externalId: false,
      label: true,
      required: false,
      type: true,
      trackTrending: false,
      unique: false,
      defaultValue: false,
      displayLocationInDecimal: false,
      scale: true,
      precision: true,
      visibleLines: false,
      length: false,
      maskChar: false,
      maskType: false,
    },
    Percent: {
      fullName: true,
      externalId: false,
      label: true,
      required: false,
      type: true,
      trackTrending: false,
      unique: false,
      defaultValue: false,
      displayLocationInDecimal: false,
      scale: true,
      precision: true,
      visibleLines: false,
      length: false,
      maskChar: false,
      maskType: false,
    },
    Phone: {
      fullName: true,
      externalId: false,
      label: true,
      required: false,
      type: true,
      trackTrending: false,
      unique: false,
      defaultValue: false,
      displayLocationInDecimal: false,
      scale: false,
      precision: false,
      visibleLines: false,
      length: false,
      maskChar: false,
      maskType: false,
    },
    Picklist: {
      fullName: true,
      externalId: false,
      label: true,
      required: false,
      type: true,
      trackTrending: false,
      unique: false,
      defaultValue: false,
      displayLocationInDecimal: false,
      scale: false,
      precision: false,
      visibleLines: false,
      length: false,
      maskChar: false,
      maskType: false,
    },
    MultiselectPicklist: {
      fullName: true,
      externalId: false,
      label: true,
      required: false,
      type: true,
      trackTrending: false,
      unique: false,
      defaultValue: false,
      displayLocationInDecimal: false,
      scale: false,
      precision: false,
      visibleLines: true,
      length: false,
      maskChar: false,
      maskType: false,
    },
    Text: {
      fullName: true,
      externalId: false,
      label: true,
      required: false,
      type: true,
      trackTrending: false,
      unique: false,
      defaultValue: false,
      displayLocationInDecimal: false,
      scale: false,
      precision: false,
      visibleLines: false,
      length: true,
      maskChar: false,
      maskType: false,
    },
    TextArea: {
      fullName: true,
      externalId: false,
      label: true,
      required: false,
      type: true,
      trackTrending: false,
      unique: false,
      defaultValue: false,
      displayLocationInDecimal: false,
      scale: false,
      precision: false,
      visibleLines: false,
      length: false,
      maskChar: false,
      maskType: false,
    },
    LongTextArea: {
      fullName: true,
      externalId: false,
      label: true,
      required: false,
      type: true,
      trackTrending: false,
      unique: false,
      defaultValue: false,
      displayLocationInDecimal: false,
      scale: false,
      precision: false,
      visibleLines: true,
      length: true,
      maskChar: false,
      maskType: false,
    },
    Html: {
      fullName: true,
      externalId: false,
      label: true,
      required: false,
      type: true,
      trackTrending: false,
      unique: false,
      defaultValue: false,
      displayLocationInDecimal: false,
      scale: false,
      precision: false,
      visibleLines: true,
      length: true,
      maskChar: false,
      maskType: false,
    },
    EncryptedText: {
      fullName: true,
      externalId: false,
      label: true,
      required: false,
      type: true,
      trackTrending: false,
      unique: false,
      defaultValue: false,
      displayLocationInDecimal: false,
      scale: false,
      precision: false,
      visibleLines: false,
      length: true,
      maskChar: true,
      maskType: true,
    },
    Time: {
      fullName: true,
      externalId: false,
      label: true,
      required: false,
      type: true,
      trackTrending: false,
      unique: false,
      defaultValue: false,
      displayLocationInDecimal: false,
      scale: false,
      precision: false,
      visibleLines: false,
      length: false,
      maskChar: false,
      maskType: false,
    },
    Url: {
      fullName: true,
      externalId: false,
      label: true,
      required: false,
      type: true,
      trackTrending: false,
      unique: false,
      defaultValue: false,
      displayLocationInDecimal: false,
      scale: false,
      precision: false,
      visibleLines: false,
      length: false,
      maskChar: false,
      maskType: false,
    },
  };
  private static options = {
    externalId: ["true", "false"],
    required: ["true", "false"],
    type: Object.keys(generate.defaultValues),
    trackTrending: ["true", "false"],
    unique: ["true", "false"],
    defaultValue: ["true", "false"],
    displayLocationInDecimal: ["true", "false"],
    maskChar: ["asterisk", "X"],
    maskType: ["all", "lastFour", "creditCard", "nino", "ssn", "sin"],
  };
  private static validationResults = [];
  private static metaInfo = [];

  public async run(): Promise<AnyJson> {
    if (!existsSync(this.flags.inputdir)) {
      throw new SfError(messages.getMessage("not specified input-directory"));
    }
    if (!existsSync(this.flags.outputdir)) {
      throw new SfError(messages.getMessage("not specified output-directory"));
    }
    const csv = readFileSync(this.flags.inputdir, {
      encoding: "utf8",
    })
      .toString()
      .split("\n")
      .map((e) => e.trim())
      .map((e) => e.split(",").map((e) => e.trim()));

    const header = csv[0];
    for (let rowIndex = 1; rowIndex < csv.length; rowIndex++) {
      if (csv[rowIndex].length < header.length) {
        continue;
      }

      //generates metadata for each row
      let metaStr = this.getMetaStr(csv, rowIndex, header);

      if (generate.validationResults.length > 0) {
        continue;
      }

      const indexOfFullName = header.indexOf("fullName");
      generate.metaInfo.push({ fullName: csv[rowIndex][indexOfFullName], metaStr: metaStr });
    }
    if (generate.validationResults.length > 0) {
      this.showValidationErrorMessages();
    }

    this.showSuccessMessages();

    // Return an object to be displayed with --json*/
    return { inputdir: this.flags.inputdir };
  }

  private getMetaStr(csv: string[][], rowIndex: number, header: string[]) {
    let row = csv[rowIndex];
    const indexOfType = header.indexOf("type");
    let tagStrs = [];
    let metaStr = '<?xml version="1.0" encoding="UTF-8"?>\n<CustomField xmlns="http://soap.sforce.com/2006/04/metadata">';
    const type = row[indexOfType];
    const colIndex = indexOfType + 1;

    if (!generate.options.type.includes(type)) {
      this.pushValidationResult("Row" + rowIndex + "Col" + colIndex, messages.getMessage("validationTypeOptions") + generate.options.type.toString());
    }

    for (const tag in generate.defaultValues[type]) {
      const idxOfTag = header.indexOf(tag);

      //validates inputs
      if (!this.isValidInputs(tag, row, header, rowIndex)) {
        continue;
      }

      if (!generate.isRequired[type][tag] && generate.defaultValues[type][tag] === null) {
        continue;
      }

      let tagStr = "";
      if (row[idxOfTag] != "") {
        tagStr = "<" + tag + ">" + row[idxOfTag] + "</" + tag + ">";
      } else {
        if (tag === "label") {
          tagStr = "<" + tag + ">" + generate.defaultValues[type][tag] + row + "</" + tag + ">";
        } else {
          tagStr = "<" + tag + ">" + generate.defaultValues[type][tag] + "</" + tag + ">";
        }
      }
      tagStrs.push(tagStr);
    }
    metaStr += "\n    " + tagStrs.join("\n    ");

    if (row[indexOfType] === "Picklist" || row[indexOfType] === "MultiselectPicklist") {
      const idxOfPicklistFullName = header.indexOf("picklistFullName");
      const idxOfPicklistLabel = header.indexOf("picklistLabel");
      metaStr += "\n    " + this.getPicklistMetaStr(row[idxOfPicklistFullName], row[idxOfPicklistLabel], header, rowIndex);
    }

    metaStr += "\n</CustomField>";
    return metaStr;
  }
  private getPicklistMetaStr(inputPicklistFullName: string, inputPicklistLabel: string, header: string[], rowIndex: number) {
    let picklistValueStr = "";
    let picklistMetaStr = "<valueSet>\n        <valueSetDefinition>\n            <sorted>false</sorted>";
    const picklistDefaultStr = "<default>false</default>";
    let picklistValues = [];
    const picklistFullNames = inputPicklistFullName.split(";");
    const picklistLabels = inputPicklistLabel.split(";");

    if (this.isValidInputsForPicklist(picklistFullNames, picklistLabels, header, rowIndex)) {
      return picklistMetaStr;
    }

    for (let idx = 0; idx < picklistFullNames.length; idx++) {
      let picklistFullNameStr = "<fullName>" + picklistFullNames[idx] + "</fullName>";
      let picklistLabelStr = "<label>" + picklistLabels[idx] + "</label>";
      let eachPicklistMetaStr = "<value>";
      eachPicklistMetaStr += [eachPicklistMetaStr, picklistFullNameStr, picklistDefaultStr, picklistLabelStr].join("\n                ");
      eachPicklistMetaStr += "\n            </value>";
      picklistValues[idx] = eachPicklistMetaStr;
    }
    picklistValueStr = picklistValues.join("\n            ");
    picklistMetaStr += "\n            " + picklistValueStr + "\n        </valueSetDefinition>\n    </valueSet>";
    return picklistMetaStr;
  }

  private isValidInputs(tag: string, row: string[], header: string[], rowIndex: number): boolean {
    const indexOfType = header.indexOf("type");
    const type = row[indexOfType];
    const idxOfTag = header.indexOf(tag);

    const regExp = /^[a-zA-Z][0-9a-zA-Z_]+$/;
    const validationResLenBefore = generate.validationResults.length;
    switch (tag) {
      case "fullName":
        if (!regExp.test(row[idxOfTag])) {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationFullNameFormat"));
        }
        if (row[idxOfTag].substring(row[idxOfTag].length - 3, row[idxOfTag].length) !== "__c") {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationFullNameTail"));
        }
        if (row[idxOfTag].length === 0) {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationFullNameBlank"));
        }
        if (row[idxOfTag].length > 40) {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationFullNameLength"));
        }
        break;
      case "externalId":
        if (!generate.options.externalId.includes(row[idxOfTag].toLowerCase()) && row[idxOfTag] !== "") {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationExternalIdOptions"));
        }
        break;
      case "label":
        if (row[idxOfTag].length === 0) {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationLabelBlank"));
        }
        if (row[idxOfTag].length > 40) {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationLabelLength"));
        }
        break;
      case "required":
        if (!generate.options.required.includes(row[idxOfTag].toLowerCase()) && row[idxOfTag] !== "") {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationRequiredOptions"));
        }
        break;
      case "trackTrending":
        if (!generate.options.trackTrending.includes(row[idxOfTag].toLowerCase()) && row[idxOfTag] !== "") {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationTrackTrendingOptions"));
        }
        break;
      case "unique":
        if (!generate.options.unique.includes(row[idxOfTag].toLowerCase()) && row[idxOfTag] !== "") {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationUniqueOptions"));
        }
        break;
      case "defaultValue":
        if (type === "Checkbox") {
          if (!generate.options.defaultValue.includes(row[idxOfTag].toLowerCase()) && row[idxOfTag] !== "") {
            this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationDefaultValueOptions"));
          }
        }
        break;
      case "displayLocationInDecimal":
        if (!generate.options.displayLocationInDecimal.includes(row[idxOfTag].toLowerCase()) && row[idxOfTag] !== "") {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationDisplayLocationDecimalOptions"));
        }
        break;
      case "scale":
        if (!Number.isInteger(Number(row[idxOfTag]))) {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationScaleType"));
        }
        if (!Number.isInteger(Number(row[header.indexOf("precision")]))) {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationPrecisionType"));
        }
        if (Number(row[idxOfTag]) < 0) {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationScaleNegative"));
        }
        if (Number(row[idxOfTag]) + Number(row[header.indexOf("precision")]) > 18) {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationScaleSum"));
        }
        break;
      case "precision":
        if (!Number.isInteger(Number(row[idxOfTag]))) {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationPrecisionType"));
        }
        if (!Number.isInteger(Number(row[header.indexOf("scale")]))) {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationScaleType"));
        }
        if (Number(row[idxOfTag]) < 0) {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationPrecisionNegative"));
        }
        if (Number(row[header.indexOf("scale")]) + Number(row[idxOfTag]) > 18) {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationPrecisionSum"));
        }
        break;
      case "visibleLines":
        if (!Number.isInteger(Number(row[header.indexOf(tag)]))) {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationVisibleLinesType"));
        }
        if (Number(row[idxOfTag]) < 0) {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationVisibleLinesNegative"));
        }
        if (Number(row[header.indexOf(tag)]) > 50) {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationVisibleLinesNumber"));
        }
        break;
      case "length":
        if (!Number.isInteger(Number(row[header.indexOf(tag)]))) {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationLengthType"));
        }
        if (Number(row[idxOfTag]) < 0) {
          this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationLengthNegative"));
        }
        if (type === "Text" || type === "TextArea") {
          if (Number(row[header.indexOf(tag)]) > 255) {
            this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationLengthTextNumber"));
          }
        }
        if (type === "LongTextArea" || type === "Html") {
          if (Number(row[header.indexOf(tag)]) > 32768) {
            this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationLengthLongTextNumber"));
          }
        }
        if (type === "EncyptedText") {
          if (Number(row[header.indexOf(tag)]) > 175) {
            this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationLengthEncyptedTextNumber"));
          }
        }
        break;
      case "maskChar":
        if (type === "maskChar") {
          if (!generate.options.maskChar.includes(row[idxOfTag]) && row[idxOfTag] !== "") {
            this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1), messages.getMessage("validationMaskCharOptions"));
          }
        }
        break;
      case "maskType":
        if (type === "maskType") {
          if (!generate.options.maskType.includes(row[idxOfTag]) && row[idxOfTag] !== "") {
            this.pushValidationResult(
              "Row" + (rowIndex + 1) + "Col" + (idxOfTag + 1),
              messages.getMessage("validationMaskTypeOptions") + generate.options.maskType.toString()
            );
          }
        }
        break;
    }
    return validationResLenBefore == generate.validationResults.length;
  }
  private isValidInputsForPicklist(picklistFullNames: string[], picklistLabels: string[], header: string[], rowIndex: number) {
    const validationResLenBefore = generate.validationResults.length;
    const picklistFullNamesColIndex = header.indexOf("picklistFullName");
    const picklistLabelsColIndex = header.indexOf("picklistLabel");
    if (picklistFullNames.length !== picklistLabels.length) {
      this.pushValidationResult(
        "Row" + (rowIndex + 1) + "Col" + (picklistFullNamesColIndex + 1),
        messages.getMessage("validationPicklistFullNameNumber")
      );
      this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (picklistLabelsColIndex + 1), messages.getMessage("validationPicklistLabelNumber"));
    }
    for (let idx = 0; idx < picklistFullNames.length; idx++) {
      if (picklistFullNames[idx].length === 0) {
        this.pushValidationResult(
          "Row" + (rowIndex + 1) + "Col" + (picklistFullNamesColIndex + 1),
          messages.getMessage("validationPicklistFullNameBlank")
        );
      }
      if (picklistLabels[idx].length === 0) {
        this.pushValidationResult("Row" + (rowIndex + 1) + "Col" + (picklistLabelsColIndex + 1), messages.getMessage("validationPicklistLabelBlank"));
      }
    }
    return validationResLenBefore == generate.validationResults.length;
  }

  private pushValidationResult(index: string, errorMessage: string) {
    generate.validationResults.push({ index: index, problem: errorMessage });
  }
  private showValidationErrorMessages() {
    let offset = null;
    for (const validationResult of generate.validationResults) {
      if (offset < validationResult.index.length || offset === null) {
        offset = validationResult.index.length;
      }
    }
    const indexStr = "INDEX";
    const problemStr = "PROBLEM";
    console.log(indexStr + " ".repeat(offset - indexStr.length) + "\t" + problemStr);
    console.log(
      "─".repeat(offset) + "\t───────────────────────────────────────────────────────────────────────────────────────────────────────────────────"
    );
    for (const validationResult of generate.validationResults) {
      console.log(validationResult.index + "\t" + validationResult.problem);
    }
    throw new SfError(messages.getMessage("validation"));
  }
  private showSuccessMessages() {
    let offset = null;
    for (const meta of generate.metaInfo) {
      writeFileSync(this.flags.outputdir + "/" + meta.fullName + ".field-meta.xml", meta.metaStr);
      if (offset < (meta.fullName + messages.getMessage("fieldExtension")).length || offset === null) {
        offset = (meta.fullName + messages.getMessage("fieldExtension")).length;
      }
    }
    const cyan = "\u001b[36m";
    const white = "\u001b[37m";
    console.log(cyan + "=== Generated Source");
    const fullNameStr = "FULLNAME";
    const pathStr = "PATH";
    console.log(white + fullNameStr + " ".repeat(offset - fullNameStr.length) + "\t" + pathStr);
    console.log(
      "─".repeat(offset) + "\t───────────────────────────────────────────────────────────────────────────────────────────────────────────────────"
    );
    for (const meta of generate.metaInfo) {
      const path = (this.flags.outputdir + "/" + meta.fullName + messages.getMessage("fieldExtension")).replace("//", "/");
      const message =
        meta.fullName +
        messages.getMessage("fieldExtension") +
        " ".repeat(offset - (meta.fullName + messages.getMessage("fieldExtension")).length) +
        "\t" +
        messages.getMessage("success") +
        path;
      console.log(message);
    }
  }
}
