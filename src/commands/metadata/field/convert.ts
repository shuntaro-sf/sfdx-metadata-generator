/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.generate/licenses/BSD-3-Clause
 */
import * as os from "os";
import { readdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import { flags, SfdxCommand } from "@salesforce/command";
import { Messages, SfError } from "@salesforce/core";
import { AnyJson } from "@salesforce/ts-types";
import { join } from "path";

//@ts-ignore
import * as ConfigData from "../../../../src_config/metadata_field_convert.json";

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages("sfdx-metadata-generator", "convert");

export default class convert extends SfdxCommand {
  public static description = messages.getMessage("commandDescription");

  public static examples = messages.getMessage("examples").split(os.EOL);

  public static args = [{ name: "file" }];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    sourcedir: flags.string({
      char: "s",
      description: messages.getMessage("sourceFlagDescription"),
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

  private static header = ConfigData.header;

  public async run(): Promise<AnyJson> {
    if (!existsSync(this.flags.sourcedir)) {
      throw new SfError(messages.getMessage("errorPathOfSource") + this.flags.sourcedir);
    }
    if (!existsSync(this.flags.outputdir)) {
      throw new SfError(messages.getMessage("errorPathOfOutput") + this.flags.outputdir);
    }

    const filesInSourcedir = readdirSync(this.flags.sourcedir);

    let csvDataStr = convert.header.join(",") + "\n";

    for (const file of filesInSourcedir) {
      const metastr = readFileSync(join(this.flags.sourcedir, file), { encoding: "utf8" });
      let row = [];

      const regexpFullName = new RegExp("\\<fullName\\>(.+)\\</fullName\\>");
      const fullNameValue = metastr.match(regexpFullName);
      if (fullNameValue[1].substring(fullNameValue[1].length - 3, fullNameValue[1].length) !== "__c" || fullNameValue === null) {
        continue;
      }

      for (const tag of convert.header) {
        const indexOfTag = convert.header.indexOf(tag);
        if (tag !== "picklistFullName" && tag !== "picklistLabel") {
          const regexp = new RegExp("\\<" + tag + "\\>(.+)\\</" + tag + "\\>");
          const tagValue = metastr.match(regexp);
          if (tagValue !== null) {
            row[indexOfTag] = this.convertSpecialChars(tagValue[1]);
          } else {
            row[indexOfTag] = "";
          }
        } else {
          const valueOfTag = this.getValueOfPicklistTag(metastr, row, tag);
          if (valueOfTag !== null) {
            row[indexOfTag] = this.convertSpecialChars(valueOfTag);
          } else {
            row[indexOfTag] = "";
          }
        }
      }
      csvDataStr += row.join(",") + "\n";
    }

    writeFileSync(join(this.flags.outputdir, "field-meta.csv"), csvDataStr, "utf8");

    // Return an object to be displayed with --json*/
    return { sourcedir: this.flags.sourcedir };
  }

  private getValueOfPicklistTag(metastr: string, row: string[], tag: string) {
    const indexOfTag = convert.header.indexOf(tag);
    const regexp = new RegExp("\\<valueSet\\>[\\s\\S]*\\</valueSet\\>");
    const tagValue = metastr.match(regexp);
    if (tagValue === null) {
      row[indexOfTag] = "";
      return null;
    }
    const valueSet = tagValue[0];
    let valueOfTag = "";
    if (tag === "picklistFullName") {
      const regexpFullName = new RegExp("\\<fullName\\>(.+)\\</fullName\\>", "g");
      const picklistFullNames = valueSet.match(regexpFullName);

      let picklistFullNameValue = picklistFullNames.join(";");
      picklistFullNameValue = picklistFullNameValue.replace(/<fullName>/g, "");
      picklistFullNameValue = picklistFullNameValue.replace(/<\/fullName>/g, "");
      valueOfTag = picklistFullNameValue;
    } else if (tag === "picklistLabel") {
      const regexpLabel = new RegExp("\\<label\\>(.+)\\</label\\>", "g");
      const picklistLabels = valueSet.match(regexpLabel);

      let picklistLabelValue = picklistLabels.join(";");
      picklistLabelValue = picklistLabelValue.replace(/<label>/g, "");
      picklistLabelValue = picklistLabelValue.replace(/<\/label>/g, "");
      valueOfTag = picklistLabelValue;
    }
    return this.convertSpecialChars(valueOfTag);
  }

  private convertSpecialChars(str: string): string {
    str = str.replace(/&amp;/g, "&");
    str = str.replace(/&lt;/g, "<");
    str = str.replace(/&gt;/g, ">");
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&#x27;/g, "'");
    str = str.replace(/&#x60;/g, "`");
    return str;
  }
}
