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
import { join } from "path";

//@ts-ignore
import * as ConfigData from "../../../../src_config/metadata_profile_generate.json";

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages("sfdx-metadata-generator", "metadata_profile_generate");

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
    source: flags.string({
      char: "s",
      description: messages.getMessage("sourceFlagDescription"),
    }),
  };

  // Comment this out if your command does not require an generate username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub generate username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  private static permissionTags = ConfigData.permissionTags;
  private static options = ConfigData.options;

  private static validationResults = [];
  // cache
  private static permissionMetaStrs = {};

  public async run(): Promise<AnyJson> {
    if (!existsSync(this.flags.input)) {
      throw new SfError(messages.getMessage("errorPathOfInput") + this.flags.input);
    }
    if (!existsSync(this.flags.outputdir)) {
      throw new SfError(messages.getMessage("errorPathOfOutput") + this.flags.outputdir);
    }
    if (!existsSync(this.flags.source)) {
      throw new SfError(messages.getMessage("errorPathOfSource") + this.flags.source);
    }
    const csv = readFileSync(this.flags.input, {
      encoding: "utf8",
    })
      .toString()
      .split("\n")
      .map((e) => e.trim())
      .map((e) => e.split(",").map((e) => e.trim()));

    const header = csv[0];
    let metastr = readFileSync(this.flags.source, { encoding: "utf8" });

    for (let rowIndex = 1; rowIndex < csv.length; rowIndex++) {
      if (csv[rowIndex].length < header.length) {
        continue;
      }

      //generates metadata for each row
      metastr = this.getMetaStr(metastr, csv, rowIndex, header);
    }
    if (generate.validationResults.length > 0) {
      this.showValidationErrorMessages();
    } else {
      this.saveMetaData(metastr);
    }

    // Return an object to be displayed with --json*/
    return { input: this.flags.input };
  }

  private getMetaStr(metastr: string, csv: string[][], rowIndex: number, header: string[]): string {
    let row = csv[rowIndex];
    const indexOfFullName = header.indexOf("fullName");
    const indexOfType = header.indexOf("type");

    const fullName = row[indexOfFullName];
    const type = row[indexOfType];

    for (const tag of generate.permissionTags[type]["tags"]) {
      const indexOfTag = header.indexOf(tag);
      const keyTag = generate.permissionTags[type]["keyTag"];

      //validates inputs
      if (!this.isValidInputs(tag, row, header, rowIndex)) {
        continue;
      }

      if (generate.permissionTags[type][tag] === null) {
        continue;
      }

      if (!generate.permissionMetaStrs[fullName]) {
        this.extractMetaStrsForEachKeyTag(metastr, type, keyTag);
      }

      this.formatBoolean(tag, row, indexOfTag);

      const permissionStr = "<" + tag + ">" + row[indexOfTag] + "</" + tag + ">";
      const permissionRegexp = new RegExp("<" + tag + ">(.+)<\\/" + tag + ">");
      const newPermMetaStr = generate.permissionMetaStrs[fullName].replace(permissionRegexp, permissionStr);
      metastr = metastr.replace(generate.permissionMetaStrs[fullName], newPermMetaStr);
      generate.permissionMetaStrs[fullName] = newPermMetaStr;
    }
    return metastr;
  }

  private extractMetaStrsForEachKeyTag(metastr: string, type: string, keyTag: string) {
    const regexp = new RegExp("<" + type + ">");
    let tagMetastrs = metastr.split(regexp);

    for (const tagMetastr of tagMetastrs) {
      const keyTagRegexp = new RegExp("<" + keyTag + ">(.+)*" + "\\</" + keyTag + ">");
      const fullNameValue = tagMetastr.match(keyTagRegexp);
      if (fullNameValue === null) {
        continue;
      }
      generate.permissionMetaStrs[fullNameValue[1]] = tagMetastr;
    }
  }

  private formatBoolean(tag: string, row: string[], indexOfTag: number) {
    if (generate.options[tag] !== undefined) {
      if (generate.options[tag].includes(true.toString()) && generate.options[tag].includes(false.toString())) {
        row[indexOfTag] = row[indexOfTag].toLowerCase();
      }
    }
  }

  private isValidInputs(tag: string, row: string[], header: string[], rowIndex: number): boolean {
    const indexOfType = header.indexOf("type");
    const type = row[indexOfType];
    const indexOfTag = header.indexOf(tag);

    const validationResLenBefore = generate.validationResults.length;
    const errorIndex = "Row" + (rowIndex + 1) + "Col" + (indexOfTag + 1);

    switch (tag) {
      case "editable":
        if (type === "fieldPermissions") {
          if (!generate.options.editable.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
            this.pushValidationResult(errorIndex, messages.getMessage("validationEditableOptions"));
          }
        }
        break;
      case "readable":
        if (type === "fieldPermissions") {
          if (!generate.options.readable.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
            this.pushValidationResult(errorIndex, messages.getMessage("validationReadableOptions"));
          }
        }
        break;
      case "allowCreate":
        if (type === "objectPermissions") {
          if (!generate.options.allowCreate.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
            this.pushValidationResult(errorIndex, messages.getMessage("validationAllowCreateOptions"));
          }
        }
        break;
      case "allowDelete":
        if (type === "objectPermissions") {
          if (!generate.options.allowDelete.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
            this.pushValidationResult(errorIndex, messages.getMessage("validationAllowDeleteOptions"));
          }
        }
        break;
      case "allowEdit":
        if (type === "objectPermissions") {
          if (!generate.options.allowEdit.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
            this.pushValidationResult(errorIndex, messages.getMessage("validationAllowEditOptions"));
          }
        }
        break;
      case "allowRead":
        if (type === "objectPermissions") {
          if (!generate.options.allowRead.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
            this.pushValidationResult(errorIndex, messages.getMessage("validationAllowReadOptions"));
          }
        }
        break;
      case "modifyAllRecords":
        if (type === "objectPermissions") {
          if (!generate.options.modifyAllRecords.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
            this.pushValidationResult(errorIndex, messages.getMessage("validationModifyAllRecordsOptions"));
          }
        }
        break;
      case "viewAllRecords":
        if (type === "objectPermissions") {
          if (!generate.options.viewAllRecords.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
            this.pushValidationResult(errorIndex, messages.getMessage("validationViewAllRecordsOptions"));
          }
        }
        break;
      case "default":
        if (type === "permissionTags" || type === "recordTypeVisibilities" || type === "applicationVisibilities") {
          if (!generate.options.default.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
            this.pushValidationResult(errorIndex, messages.getMessage("validationDefaultOptions"));
          }
        }
        break;
      case "visible":
        if (type === "permissionTags" || type === "recordTypeVisibilities" || type === "applicationVisibilities") {
          if (!generate.options.visible.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
            this.pushValidationResult(errorIndex, messages.getMessage("validationVisibleOptions"));
          }
        }
        break;
      case "enabled":
        if (type === "classAccesses" || type === "userPermissions" || type === "pageAccesses") {
          if (!generate.options.enabled.includes(row[indexOfTag].toLowerCase()) && row[indexOfTag] !== "") {
            this.pushValidationResult(errorIndex, messages.getMessage("validationEnabledOptions"));
          }
        }
        break;
      case "visibility":
        if (type === "tabVisibilities") {
          if (!generate.options.visibility.includes(row[indexOfTag]) && row[indexOfTag] !== "") {
            this.pushValidationResult(errorIndex, messages.getMessage("validationVisibilityOptions") + generate.options.visibility.toString());
          }
        }
        break;
    }
    return validationResLenBefore == generate.validationResults.length;
  }

  private pushValidationResult(index: string, errorMessage: string) {
    generate.validationResults.push({ INDEX: index, PROBLEM: errorMessage });
  }

  private saveMetaData(metastr: string) {
    const blue = "\u001b[34m";
    const white = "\u001b[37m";
    console.log("===" + blue + " Generated Source" + white);
    const dirsToSource = this.flags.source.split("/");
    if (!existsSync(join(this.flags.outputdir, dirsToSource[dirsToSource.length - 1]))) {
      writeFileSync(join(this.flags.outputdir, dirsToSource[dirsToSource.length - 1]), metastr, "utf8");
    }
    console.log(
      "Successfully saved " + dirsToSource[dirsToSource.length - 1] + " in " + join(this.flags.outputdir, dirsToSource[dirsToSource.length - 1])
    );
  }

  private showValidationErrorMessages() {
    const logLengths = this.getLogLenghts(generate.validationResults);
    this.showLogHeader(logLengths);
    this.showLogBody(generate.validationResults, logLengths);
    throw new SfError(messages.getMessage("validation"));
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
}
