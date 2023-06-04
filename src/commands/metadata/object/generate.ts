/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.generate/licenses/BSD-3-Clause
 */
import * as os from "os";
import { readFileSync, existsSync, writeFileSync, mkdirSync } from "fs";
import { flags, SfdxCommand } from "@salesforce/command";
import { Messages, SfError } from "@salesforce/core";
import { AnyJson } from "@salesforce/ts-types";
import { join } from "path";

//@ts-ignore
import * as ConfigData from "../../../../src_config/metadata_object_generate.json";

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages("@shuntaro/sfdx-metadata-generator", "metadata_object_generate");

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
    updates: flags.boolean({
      char: "u",
      description: messages.getMessage("updatesFlagDescription"),
    }),
    delimiter: flags.string({
      char: "d",
      description: messages.getMessage("delimiterFlagDescription"),
    }),
  };

  // Comment this out if your command does not require an generate username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub generate username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  private static xmlSetting = ConfigData.xmlSetting;
  private static defaultValues = ConfigData.defaultValues;
  private static isRequired = ConfigData.isRequired;
  private static options = ConfigData.options;
  private static indentationLength = ConfigData.indentationLength;
  private static objectExtension = ConfigData.objectExtension;
  private static delimiter = ConfigData.delimiter;
  private static tagNames = ConfigData.tagNames;
  private static metaSettings = ConfigData.metaSettings;

  private static validationResults = [];
  private static successResults = [];
  private static failureResults = [];
  private static metaInfo = [];

  public async run(): Promise<AnyJson> {
    if (!existsSync(this.flags.input)) {
      throw new SfError(messages.getMessage("errorPathOfInput") + this.flags.input);
    }
    if (!existsSync(this.flags.outputdir)) {
      throw new SfError(messages.getMessage("errorPathOfOutput") + this.flags.outputdir);
    }
    if (this.flags.delimiter === undefined) {
      this.flags.delimiter = generate.delimiter;
    }
    const csv = readFileSync(this.flags.input, {
      encoding: "utf8",
    })
      .toString()
      .split("\n")
      .map((e) => e.trim())
      .map((e) => e.split(this.flags.delimiter).map((e) => e.trim()));

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
      generate.successResults.push({
        FULLNAME: csv[rowIndex][indexOfFullName] + "." + generate.objectExtension,
        PATH: join(this.flags.outputdir, csv[rowIndex][indexOfFullName] + "." + generate.objectExtension).replace("//", "/"),
      });
    }
    if (generate.validationResults.length > 0) {
      this.showValidationErrorMessages();
    } else {
      this.saveMetaData();
      this.showFailureResults();
    }

    // Return an object to be displayed with --json*/
    return { input: this.flags.input };
  }

  private getMetaStr(csv: string[][], rowIndex: number, header: string[]) {
    let row = csv[rowIndex];
    let tagStrs = [];
    let metaStr =
      '<?xml version="' +
      generate.xmlSetting.version +
      '" encoding="' +
      generate.xmlSetting.encoding +
      '"?>\n<CustomObject xmlns="' +
      generate.xmlSetting.xmlns +
      '">';
    // const colIndex = indexOfType + 1;

    metaStr += this.getActionOverridesMetaStr();

    for (const tag in generate.defaultValues) {
      const indexOfTag = header.indexOf(tag);

      // dose not include tag at the header and the tag is not required
      if (indexOfTag === -1 && generate.isRequired[tag] === null) {
        continue;
      }
      //validates inputs
      if (!this.isValidInputs(tag, row, header, rowIndex)) {
        continue;
      }
      if (tag === "fullName") {
        continue;
      }

      // when not applicable tag
      if (generate.isRequired[tag] === null && generate.defaultValues[tag] === null) {
        continue;
      }
      // to omit tag that dosent need to be xml tag if blank
      if (!generate.isRequired[tag] && generate.defaultValues[tag] === null && (indexOfTag === -1 || row[indexOfTag] === "")) {
        continue;
      }

      if (indexOfTag !== -1) {
        // convert special characters in the html form
        row[indexOfTag] = this.convertSpecialChars(row[indexOfTag]);
        // format boolean string in a xml format
        this.formatBoolean(tag, row, indexOfTag);
      }

      let tagStr = "";
      if (row[indexOfTag] != "") {
        tagStr = "<" + tag + ">" + row[indexOfTag] + "</" + tag + ">";
      } else {
        tagStr = "<" + tag + ">" + generate.defaultValues[tag] + "</" + tag + ">";
      }
      tagStrs.push(tagStr);
    }

    this.pushNameFieldMetaStr(tagStrs, row, header, rowIndex);
    // metaStr += "\n" + this.getIndentation(generate.indentationLength) + tagStrs.join("\n" + this.getIndentation(generate.indentationLength));
    this.pushMetaStrSettings(tagStrs);
    tagStrs.sort();
    metaStr += "\n" + this.getIndentation(generate.indentationLength) + tagStrs.join("\n" + this.getIndentation(generate.indentationLength));
    //   metaStr += this.getMetaStrSettings(tagStrs);
    metaStr += "\n</CustomObject>";
    return metaStr;
  }

  private getActionOverridesMetaStr(): string {
    const actionOverridesMetaSetting = generate.metaSettings["actionOverrides"];
    let actionOverridesMetaStr = "";
    for (const actionName in actionOverridesMetaSetting) {
      actionOverridesMetaStr +=
        "\n" + this.getIndentation(generate.indentationLength) + "<actionOverrides>\n" + this.getIndentation(2 * generate.indentationLength);
      actionOverridesMetaStr += "<actionName>" + actionName + "</actionName>\n" + this.getIndentation(2 * generate.indentationLength);
      actionOverridesMetaStr +=
        "<type>" + actionOverridesMetaSetting[actionName]["type"] + "</type>\n" + this.getIndentation(generate.indentationLength);
      actionOverridesMetaStr += "</actionOverrides>";
      for (const formFactor of actionOverridesMetaSetting[actionName]["formFactor"]) {
        actionOverridesMetaStr +=
          "\n" + this.getIndentation(generate.indentationLength) + "<actionOverrides>\n" + this.getIndentation(2 * generate.indentationLength);
        actionOverridesMetaStr += "<actionName>" + actionName + "</actionName>\n" + this.getIndentation(2 * generate.indentationLength);
        actionOverridesMetaStr += "<formFactor>" + formFactor + "</formFactor>\n" + this.getIndentation(2 * generate.indentationLength);
        actionOverridesMetaStr +=
          "<type>" + actionOverridesMetaSetting[actionName]["type"] + "</type>\n" + this.getIndentation(generate.indentationLength);
        actionOverridesMetaStr += "</actionOverrides>";
      }
    }
    return actionOverridesMetaStr;
  }

  private pushMetaStrSettings(tagStrs: string[]) {
    for (const tagName in generate.metaSettings) {
      if (tagName === "actionOverrides") {
        continue;
      }
      tagStrs.push("<" + tagName + ">" + generate.metaSettings[tagName] + "</" + tagName + ">");
    }
  }

  private pushNameFieldMetaStr(tagStrs: string[], row: string[], header: string[], rowIndex: number) {
    let nameFieldMetaStr = "<nameField>\n" + this.getIndentation(2 * generate.indentationLength);
    const indexOfNameFieldType = header.indexOf("nameFieldType");
    const indexOfNameFieldLabel = header.indexOf("nameFieldLabel");

    if (!this.isValidInputsForNameField(row, header, rowIndex)) {
      return nameFieldMetaStr;
    }

    const nameFieldType = row[indexOfNameFieldType];
    const nemeFieldLabel = this.convertSpecialChars(row[indexOfNameFieldLabel]);

    nameFieldMetaStr += "<label>" + nemeFieldLabel + "</label>\n" + this.getIndentation(2 * generate.indentationLength);
    nameFieldMetaStr += "<trackHistory>false</trackHistory>\n" + this.getIndentation(2 * generate.indentationLength);
    if (nameFieldType === "AutoNumber") {
      const indexOfDisplayFormat = header.indexOf("nameFieldDisplayFormat");
      const displayFormat = row[indexOfDisplayFormat];
      nameFieldMetaStr += "<displayFormat>" + displayFormat + "</displayFormat>\n" + this.getIndentation(2 * generate.indentationLength);
    }
    nameFieldMetaStr += "<type>" + nameFieldType + "</type>\n" + this.getIndentation(generate.indentationLength);
    nameFieldMetaStr += "</nameField>";
    tagStrs.push(nameFieldMetaStr);
  }

  private isValidInputs(tag: string, row: string[], header: string[], rowIndex: number): boolean {
    const indexOfTag = header.indexOf(tag);

    const regExpForOneChar = /^[a-zA-Z]/;
    const regExpForSnakeCase = /^[a-zA-Z][0-9a-zA-Z_]+[a-zA-Z]$/;
    const validationResLenBefore = generate.validationResults.length;
    const errorIndex = "Row" + (rowIndex + 1) + "Col" + (indexOfTag + 1);

    if (indexOfTag === -1) {
      return true;
    }

    switch (tag) {
      case "fullName":
        if (
          (row[indexOfTag].length > 1 && !regExpForSnakeCase.test(row[indexOfTag])) ||
          (row[indexOfTag].length == 1 && !regExpForOneChar.test(row[indexOfTag]))
        ) {
          this.pushValidationResult(errorIndex, messages.getMessage("validationFullNameFormat"));
        }
        if (row[indexOfTag].substring(row[indexOfTag].length - 3, row[indexOfTag].length) !== "__c") {
          this.pushValidationResult(errorIndex, messages.getMessage("validationFullNameTail"));
        }
        if (row[indexOfTag].split("__").length > 2) {
          this.pushValidationResult(errorIndex, messages.getMessage("validationFullNameUnderscore"));
        }
        if (row[indexOfTag].length === 0) {
          this.pushValidationResult(errorIndex, messages.getMessage("validationFullNameBlank"));
        }
        if (row[indexOfTag].length > 43) {
          this.pushValidationResult(errorIndex, messages.getMessage("validationFullNameLength"));
        }
        break;
        break;
      case "label":
        if (row[indexOfTag].length === 0) {
          this.pushValidationResult(errorIndex, messages.getMessage("validationLabelBlank"));
        }
        if (row[indexOfTag].length > 40) {
          this.pushValidationResult(errorIndex, messages.getMessage("validationLabelLength"));
        }
        break;
      case "description":
        if (row[indexOfTag].length > 1000) {
          this.pushValidationResult(errorIndex, messages.getMessage("validationDescriptionMax"));
        }
        break;
      case "allowInChatterGroups":
        if (!generate.options.allowInChatterGroups.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
          this.pushValidationResult(errorIndex, messages.getMessage("validationAllowInChatterGroupsOptions"));
        }
        break;
      case "deploymentStatus":
        if (!generate.options.deploymentStatus.includes(row[indexOfTag]) && row[indexOfTag] !== "") {
          this.pushValidationResult(
            errorIndex,
            messages.getMessage("validationDeploymentStatusOptions") + generate.options.deploymentStatus.toString()
          );
        }
        break;
      case "enableActivities":
        if (!generate.options.enableActivities.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
          this.pushValidationResult(errorIndex, messages.getMessage("validationEnableActivitiesOptions"));
        }
        break;
      case "enableBulkApi":
        if (!generate.options.enableBulkApi.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
          this.pushValidationResult(errorIndex, messages.getMessage("validationEnableBulkApiOptions"));
        }
        break;
      case "enableHistory":
        if (!generate.options.enableHistory.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
          this.pushValidationResult(errorIndex, messages.getMessage("validationEnableHistoryOptions"));
        }
        break;
      case "enableReports":
        if (!generate.options.enableReports.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
          this.pushValidationResult(errorIndex, messages.getMessage("validationEnableReportsOptions"));
        }
        break;
      case "enableSearch":
        if (!generate.options.enableSearch.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
          this.pushValidationResult(errorIndex, messages.getMessage("validationEnableSearchOptions"));
        }
        break;
      case "enableSharing":
        if (!generate.options.enableSharing.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
          this.pushValidationResult(errorIndex, messages.getMessage("validationEnableSharingOptions"));
        }
        break;
      case "enableStreamingApi":
        if (!generate.options.enableStreamingApi.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
          this.pushValidationResult(errorIndex, messages.getMessage("validationEnableStreamingApiOptions"));
        }
        break;
      case "nameFieldType":
        if (!generate.options.nameFieldType.includes(row[indexOfTag]) && row[indexOfTag] !== "") {
          this.pushValidationResult(errorIndex, messages.getMessage("validationNameFieldTypeOptions") + generate.options.nameFieldType.toString());
        }
        break;
    }
    return validationResLenBefore == generate.validationResults.length;
  }

  private isValidInputsForNameField(row: string[], header: string[], rowIndex: number): boolean {
    const validationResLenBefore = generate.validationResults.length;

    const indexOfType = header.indexOf("nameFieldType");
    const indexOfLabel = header.indexOf("nameFieldLabel");
    const indexOfDisplayFormat = header.indexOf("nameFieldDisplayFormat");
    const type = row[indexOfType];
    const errorIndexForType = "Row" + (rowIndex + 1) + "Col" + (indexOfType + 1);
    const errorIndexForLabel = "Row" + (rowIndex + 1) + "Col" + (indexOfLabel + 1);
    const errorIndexForDisplayFormat = "Row" + (rowIndex + 1) + "Col" + (indexOfDisplayFormat + 1);

    // when nameFieldLabel is not found
    if (indexOfLabel === -1) {
      this.pushValidationResult(errorIndexForType, messages.getMessage("validationNoNameFieldLabel"));
    }

    if (row[indexOfLabel].length === 0) {
      this.pushValidationResult(errorIndexForLabel, messages.getMessage("validationNameFieldLabelBlank"));
    }
    if (row[indexOfLabel].length > 80) {
      this.pushValidationResult(errorIndexForLabel, messages.getMessage("validationNameFieldLabelLengthFormat"));
    }

    if (type === "AutoNumber") {
      const invalidChars = ['"', "'", "&", "<", ">", ";", ":", "\\"];
      const regExpInvalidChars = new RegExp("[" + invalidChars.join("").replace("\\", "\\\\") + "]+");
      const regExpNumber = /{(0+)}/;
      const formatNumber = row[indexOfDisplayFormat].match(regExpNumber);

      // when nameFieldDisplayFormat is not found
      if (indexOfDisplayFormat === -1) {
        this.pushValidationResult(errorIndexForType, messages.getMessage("validationNoNameFieldDisplayFormat"));
      }

      if (regExpInvalidChars.test(row[indexOfDisplayFormat])) {
        this.pushValidationResult(
          errorIndexForDisplayFormat,
          messages.getMessage("validationNameFieldDisplayFormatInvalidChar") + invalidChars.toString()
        );
      }
      if (formatNumber === null) {
        this.pushValidationResult(errorIndexForDisplayFormat, messages.getMessage("validationNameFieldDisplayFormatFormat"));
      } else if (formatNumber[1].length > 10) {
        this.pushValidationResult(errorIndexForDisplayFormat, messages.getMessage("validationNameFieldDisplayFormatDigits"));
      }
      if (row[indexOfDisplayFormat].length > 30) {
        this.pushValidationResult(errorIndexForDisplayFormat, messages.getMessage("validationNameFieldDisplayFormatLength"));
      }
    }

    return validationResLenBefore == generate.validationResults.length;
  }

  private pushValidationResult(index: string, errorMessage: string) {
    generate.validationResults.push({ INDEX: index, PROBLEM: errorMessage });
  }

  private convertSpecialChars(str: string): string {
    str = str.replace(/&/g, "&" + "amp;");
    str = str.replace(/</g, "&" + "lt;");
    str = str.replace(/>/g, "&" + "gt;");
    str = str.replace(/"/g, "&" + "quot;");
    str = str.replace(/'/g, "&" + "#x27;");
    str = str.replace(/`/g, "&" + "#x60;");
    return str;
  }

  private formatBoolean(tag: string, row: string[], indexOfTag: number) {
    if (generate.options[tag] !== undefined) {
      if (generate.options[tag].includes(true.toString()) && generate.options[tag].includes(false.toString())) {
        row[indexOfTag] = row[indexOfTag].toLowerCase();
      }
    }
  }

  private showValidationErrorMessages() {
    const logLengths = this.getLogLenghts(generate.validationResults);
    this.showLogHeader(logLengths);
    this.showLogBody(generate.validationResults, logLengths);
    throw new SfError(messages.getMessage("validation"));
  }

  private saveMetaData() {
    const logLengths = this.getLogLenghts(generate.successResults);
    const blue = "\u001b[34m";
    const white = "\u001b[37m";
    console.log("===" + blue + " Generated Source" + white);
    this.showLogHeader(logLengths);
    for (const meta of generate.metaInfo) {
      if (!existsSync(join(this.flags.outputdir, meta.fullName))) {
        // for creating
        mkdirSync(join(this.flags.outputdir, meta.fullName));
        writeFileSync(join(this.flags.outputdir, meta.fullName, meta.fullName + "." + generate.objectExtension), meta.metaStr, "utf8");
      } else if (this.flags.updates) {
        // for updating
        this.updateFile(meta);
      } else {
        // when fail to save
        generate.failureResults[meta.fullName + "." + generate.objectExtension] =
          "Failed to save " + meta.fullName + "." + generate.objectExtension + ". " + messages.getMessage("failureSave");
      }
    }
    this.showLogBody(generate.successResults, logLengths);
  }

  private updateFile(meta: any) {
    let metastrToUpdate = readFileSync(join(this.flags.outputdir, meta.fullName, meta.fullName + "." + generate.objectExtension), "utf8");
    for (const tag of generate.tagNames) {
      if (tag !== "nameFieldType" && tag !== "nameFieldLabel") {
        const regexp = new RegExp("\\<" + tag + "\\>(.+)\\</" + tag + "\\>");
        const newValue = meta.metaStr.match(regexp);
        if (newValue !== null) {
          metastrToUpdate = metastrToUpdate.replace(regexp, newValue[0]);
        }
      } else {
        const regexp = new RegExp("\\<nameField\\>[\\s\\S]*\\</nameField\\>");
        const newValue = meta.metaStr.match(regexp);
        if (newValue !== null) {
          metastrToUpdate = metastrToUpdate.replace(regexp, newValue[0]);
        }
      }
    }
    writeFileSync(join(this.flags.outputdir, meta.fullName, meta.fullName + "." + generate.objectExtension), metastrToUpdate, "utf8");
  }

  private getLogLenghts(logs: any[]) {
    let logLengths = {};
    for (const log of logs) {
      for (const logName in log) {
        if (logLengths[logName] < log[logName].length || logLengths[logName] === undefined) {
          logLengths[logName] = log[logName].length;
        }
      }
    }
    return logLengths;
  }

  private showLogHeader(logLengths: any) {
    let header = "";
    let line = "";
    const whiteSpace = " ";
    const lineChar = "─";

    let counter = 0;
    for (const logName in logLengths) {
      counter++;
      header += logName;
      if (counter < Object.keys(logLengths).length) {
        header += whiteSpace.repeat(logLengths[logName] - logName.length) + "\t";
      }
      line += lineChar.repeat(logLengths[logName]) + "\t";
    }
    console.log(header);
    console.log(line);
  }

  private showLogBody(logs: any[], logLengths: any) {
    const whiteSpace = " ";
    for (const log of logs) {
      if (generate.failureResults[log.FULLNAME]) {
        continue;
      }
      let logMessage = "";
      let counter = 0;
      for (const logName in log) {
        counter++;
        logMessage += log[logName];
        if (counter < Object.keys(log).length) {
          logMessage += whiteSpace.repeat(logLengths[logName] - log[logName].length) + "\t";
        }
      }
      console.log(logMessage);
    }
  }

  private showFailureResults() {
    if (Object.keys(generate.failureResults).length === 0) {
      return;
    }
    const red = "\u001b[31m";
    const white = "\u001b[37m";
    console.log("\n===" + red + " Failure" + white);
    for (const fullName in generate.failureResults) {
      console.log(generate.failureResults[fullName]);
    }
  }

  private getIndentation(length: number): string {
    const whiteSpace = " ";
    return whiteSpace.repeat(length);
  }
}
