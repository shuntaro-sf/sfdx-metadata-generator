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
    input: flags.string({
      char: "i",
      description: messages.getMessage("inputFlagDescription"),
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
      externalId: null,
      label: null,
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
      externalId: null,
      label: null,
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
      externalId: null,
      label: null,
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
      externalId: null,
      label: null,
      required: null,
      type: "DateTime",
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
    Email: {
      fullName: null,
      externalId: "false",
      label: null,
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
      externalId: null,
      label: null,
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
      label: null,
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
      externalId: null,
      label: null,
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
      externalId: null,
      label: null,
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
      externalId: null,
      label: null,
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
      externalId: null,
      label: null,
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
      label: null,
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
      externalId: null,
      label: null,
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
      externalId: null,
      label: null,
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
      externalId: null,
      label: null,
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
      externalId: null,
      label: null,
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
      externalId: null,
      label: null,
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
      externalId: null,
      label: null,
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
    if (!existsSync(this.flags.input)) {
      throw new SfError(messages.getMessage("errorPathOfInput") + this.flags.input);
    }
    if (!existsSync(this.flags.outputdir)) {
      throw new SfError(messages.getMessage("errorPathOfOutput") + this.flags.outputdir);
    }
    const csv = readFileSync(this.flags.input, {
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
    } else {
      this.saveMetaData();
    }

    // Return an object to be displayed with --json*/
    return { input: this.flags.input };
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
      const indexOfTag = header.indexOf(tag);

      //validates inputs
      if (!this.isValidInputs(tag, row, header, rowIndex)) {
        continue;
      }

      if (!generate.isRequired[type][tag] && generate.defaultValues[type][tag] === null) {
        continue;
      }

      // convert special characters in the html form
      row[indexOfTag] = this.convertSpecialChars(row[indexOfTag]);

      let tagStr = "";
      if (row[indexOfTag] != "") {
        tagStr = "<" + tag + ">" + row[indexOfTag] + "</" + tag + ">";
      } else {
        tagStr = "<" + tag + ">" + generate.defaultValues[type][tag] + "</" + tag + ">";
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

    if (!this.isValidInputsForPicklist(picklistFullNames, picklistLabels, header, rowIndex)) {
      return picklistMetaStr;
    }

    for (let idx = 0; idx < picklistFullNames.length; idx++) {
      picklistFullNames[idx] = this.convertSpecialChars(picklistFullNames[idx]);
      picklistLabels[idx] = this.convertSpecialChars(picklistLabels[idx]);
      let picklistFullNameStr = "<fullName>" + picklistFullNames[idx] + "</fullName>";
      let picklistLabelStr = "<label>" + picklistLabels[idx] + "</label>";
      let eachPicklistMetaStr = "<value>";
      eachPicklistMetaStr += [picklistFullNameStr, picklistDefaultStr, picklistLabelStr].join("\n                ");
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
    const indexOfTag = header.indexOf(tag);

    const regExp = /^[a-zA-Z][0-9a-zA-Z_]+[a-zA-Z]$/;
    const validationResLenBefore = generate.validationResults.length;
    const errorIndex = "Row" + (rowIndex + 1) + "Col" + (indexOfTag + 1);

    switch (tag) {
      case "fullName":
        if (!regExp.test(row[indexOfTag])) {
          this.pushValidationResult(errorIndex, messages.getMessage("validationFullNameFormat"));
        }
        if (row[indexOfTag].substring(row[indexOfTag].length - 3, row[indexOfTag].length) !== "__c") {
          this.pushValidationResult(errorIndex, messages.getMessage("validationFullNameTail"));
        }
        if (row[indexOfTag].length === 0) {
          this.pushValidationResult(errorIndex, messages.getMessage("validationFullNameBlank"));
        }
        if (row[indexOfTag].length > 43) {
          this.pushValidationResult(errorIndex, messages.getMessage("validationFullNameLength"));
        }
        break;
      case "externalId":
        if ((type === "Number" || type === "Email" || type === "Text") && row[indexOfTag] !== "") {
          if (!generate.options.externalId.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
            this.pushValidationResult(errorIndex, messages.getMessage("validationExternalIdOptions"));
          }
        }
        break;
      case "label":
        const doubleQuotation = /["]/;
        if (row[indexOfTag].length === 0) {
          this.pushValidationResult(errorIndex, messages.getMessage("validationLabelBlank"));
        }
        if (!doubleQuotation.test(row[indexOfTag])) {
          if (row[indexOfTag].length > 40) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationLabelLength"));
          }
        } else {
          const dobleQuotesCounter = row[indexOfTag].match(/""/g).length;
          if (row[indexOfTag].length > 42 + dobleQuotesCounter) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationLabelLength"));
          }
        }
        break;
      case "required":
        if (!generate.options.required.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
          this.pushValidationResult(errorIndex, messages.getMessage("validationRequiredOptions"));
        }
        break;
      case "trackTrending":
        if (!generate.options.trackTrending.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
          this.pushValidationResult(errorIndex, messages.getMessage("validationTrackTrendingOptions"));
        }
        break;
      case "unique":
        if (!generate.options.unique.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
          this.pushValidationResult(errorIndex, messages.getMessage("validationUniqueOptions"));
        }
        break;
      case "defaultValue":
        if (type === "Checkbox" && row[indexOfTag] !== "") {
          if (!generate.options.defaultValue.includes(row[indexOfTag].toLowerCase())) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationDefaultValueOptions"));
          }
        }
        break;
      case "displayLocationInDecimal":
        if (type === "Location" && row[indexOfTag] !== "") {
          if (!generate.options.displayLocationInDecimal.includes(row[indexOfTag].toLowerCase())) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationDisplayLocationInDecimalOptions"));
          }
        }
        break;
      case "scale":
        if ((type === "Number" || type === "Percent" || type === "Currency" || type === "Location") && row[indexOfTag] !== "") {
          if (!Number.isInteger(Number(row[indexOfTag]))) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationScaleType"));
          }
          if (!Number.isInteger(Number(row[header.indexOf("precision")]))) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationPrecisionType"));
          }
          if (Number(row[indexOfTag]) < 0) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationScaleNegative"));
          }
          if (Number(row[indexOfTag]) + Number(row[header.indexOf("precision")]) > 18) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationScaleSum"));
          }
          if (Number(row[indexOfTag]) >= 8) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationScaleComarisonPrecision"));
          }
        }
        break;
      case "precision":
        if ((type === "Number" || type === "Percent" || type === "Currency") && row[indexOfTag] !== "") {
          if (!Number.isInteger(Number(row[indexOfTag]))) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationPrecisionType"));
          }
          if (!Number.isInteger(Number(row[header.indexOf("scale")]))) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationScaleType"));
          }
          if (Number(row[indexOfTag]) < 0) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationPrecisionNegative"));
          }
          if (Number(row[header.indexOf("scale")]) + Number(row[indexOfTag]) > 18) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationPrecisionSum"));
          }
          if (Number(row[header.indexOf("scale")]) >= 8) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationPrecisionComarisonScale"));
          }
        }
        break;
      case "visibleLines":
        if ((type === "MultiselectPicklist" || type === "LongTextArea" || type === "Html") && row[indexOfTag] !== "") {
          if (!Number.isInteger(Number(row[indexOfTag]))) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationVisibleLinesType"));
          }
        }
        if (type === "LongTextArea" && row[indexOfTag] !== "") {
          if (Number(row[indexOfTag]) < 2) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationVisibleLinesLongTextMin"));
          }
          if (Number(row[indexOfTag]) > 50) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationVisibleLinesLongTextMax"));
          }
        }
        if (type === "Html" && row[indexOfTag] !== "") {
          if (Number(row[indexOfTag]) < 10) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationVisibleLinesHtmlMin"));
          }
          if (Number(row[indexOfTag]) > 50) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationVisibleLinesLongTextMax"));
          }
        }
        if (type === "MultiselectPicklist" && row[indexOfTag] !== "") {
          if (Number(row[indexOfTag]) < 3) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationVisibleLinesPicklistMin"));
          }
          if (Number(row[indexOfTag]) > 10) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationVisibleLinesPicklistMax"));
          }
        }
        break;
      case "length":
        if ((type === "Text" || type === "LongTextArea" || type === "Html" || type === "EncryptedText") && row[indexOfTag] !== "") {
          if (!Number.isInteger(Number(row[indexOfTag]))) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationLengthType"));
          }
        }
        if (type === "Text" && row[indexOfTag] !== "") {
          if (Number(row[indexOfTag]) < 1) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationLengthTextMin"));
          }
          if (Number(row[indexOfTag]) > 255) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationLengthTextMax"));
          }
        }
        if ((type === "LongTextArea" || type === "Html") && row[indexOfTag] !== "") {
          if (Number(row[indexOfTag]) < 256) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationLengthLongTextMin"));
          }
          if (Number(row[indexOfTag]) > 131072) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationLengthLongTextMax"));
          }
        }
        if (type === "EncryptedText" && row[indexOfTag] !== "") {
          if (Number(row[indexOfTag]) < 1) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationLengthTextMin"));
          }
          if (Number(row[indexOfTag]) > 175) {
            this.pushValidationResult(errorIndex, messages.getMessage("validationLengthEncryptedTextMax"));
          }
        }
        break;
      case "maskChar":
        if (type === "EncryptedText" && row[indexOfTag] !== "") {
          if (!generate.options.maskChar.includes(row[indexOfTag]) && row[indexOfTag] !== "") {
            this.pushValidationResult(errorIndex, messages.getMessage("validationMaskCharOptions"));
          }
        }
        break;
      case "maskType":
        if (type === "EncryptedText" && row[indexOfTag] !== "") {
          if (!generate.options.maskType.includes(row[indexOfTag]) && row[indexOfTag] !== "") {
            this.pushValidationResult(errorIndex, messages.getMessage("validationMaskTypeOptions") + generate.options.maskType.toString());
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
    const errorIndexForFullName = "Row" + (rowIndex + 1) + "Col" + (picklistFullNamesColIndex + 1);
    const errorIndexForLabel = "Row" + (rowIndex + 1) + "Col" + (picklistLabelsColIndex + 1);
    if (picklistFullNames.length !== picklistLabels.length) {
      this.pushValidationResult(errorIndexForFullName, messages.getMessage("validationPicklistFullNameMax"));
      this.pushValidationResult(errorIndexForLabel, messages.getMessage("validationPicklistLabelMax"));
    }
    for (let idx = 0; idx < picklistFullNames.length; idx++) {
      if (picklistFullNames[idx].length === 0) {
        this.pushValidationResult(errorIndexForFullName, messages.getMessage("validationPicklistFullNameBlank"));
      }
      if (picklistLabels[idx].length === 0) {
        this.pushValidationResult(errorIndexForLabel, messages.getMessage("validationPicklistLabelBlank"));
      }
    }
    return validationResLenBefore == generate.validationResults.length;
  }

  private pushValidationResult(index: string, errorMessage: string) {
    generate.validationResults.push({ index: index, problem: errorMessage });
  }

  private convertSpecialChars(str: string): string {
    const doubleQuotation = /["]/;
    // gets rid of double-quotation on both ends
    if (doubleQuotation.test(str)) {
      str = str.substring(1, str.length - 1);
    }
    str = str.replace(/""/g, '"');
    str = str.replace(/&/g, "&" + "amp;");
    str = str.replace(/</g, "&" + "lt;");
    str = str.replace(/>/g, "&" + "gt;");
    str = str.replace(/"/g, "&" + "quot;");
    str = str.replace(/'/g, "&" + "#x27;");
    str = str.replace(/`/g, "&" + "#x60;");
    return str;
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

  private saveMetaData() {
    let offset = null;
    for (const meta of generate.metaInfo) {
      writeFileSync(this.flags.outputdir + "/" + meta.fullName + ".field-meta.xml", meta.metaStr);
      if (offset < (meta.fullName + messages.getMessage("fieldExtension")).length || offset === null) {
        offset = (meta.fullName + messages.getMessage("fieldExtension")).length;
      }
    }
    const blue = "\u001b[34m";
    const white = "\u001b[37m";
    console.log(blue + "=== Generated Source");
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
        path;
      console.log(message);
    }
  }
}
