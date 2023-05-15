/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.generate/licenses/BSD-3-Clause
 */
import * as os from "os";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { flags, SfdxCommand } from "@salesforce/command";
import { Messages, SfError } from "@salesforce/core";
import { AnyJson } from "@salesforce/ts-types";
import { join } from "path";

//@ts-ignore
import * as ConfigData from "../../../../src_config/metadata_profile_convert.json";

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages("sfdx-metadata-generator", "metadata_profile_convert");

export default class convert extends SfdxCommand {
  public static description = messages.getMessage("commandDescription");

  public static examples = messages.getMessage("examples").split(os.EOL);

  public static args = [{ name: "file" }];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    source: flags.string({
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

  private static permissionTags = ConfigData.permissionTags;
  private static header = ConfigData.header;

  public async run(): Promise<AnyJson> {
    if (!existsSync(this.flags.source)) {
      throw new SfError(messages.getMessage("errorPathOfSource") + this.flags.source);
    }
    if (!existsSync(this.flags.outputdir)) {
      throw new SfError(messages.getMessage("errorPathOfOutput") + this.flags.outputdir);
    }

    const metastr = readFileSync(this.flags.source, { encoding: "utf8" });

    const csvDataStr = this.convertXmlToRowOfCsv(metastr);

    writeFileSync(join(this.flags.outputdir, "profile-meta.csv"), csvDataStr, "utf8");

    // Return an object to be displayed with --json*/
    return { source: this.flags.source };
  }

  private convertXmlToRowOfCsv(metastr: string): string {
    let csvDataStr = convert.header.join(",") + "\n";
    for (const type in convert.permissionTags) {
      const keyTag = convert.permissionTags[type]["keyTag"];
      const regexp = new RegExp("<" + type + ">");
      let tagMetastrs = metastr.split(regexp);
      for (const tagMetastr of tagMetastrs) {
        this.addRowStrToCsvStr(keyTag, type, csvDataStr, tagMetastr);
      }
    }
    return csvDataStr;
  }

  private addRowStrToCsvStr(keyTag: string, type: string, csvDataStr: string, tagMetastr: string) {
    const indexOfFullName = convert.header.indexOf("fullName");
    let row = Array(convert.header.length);
    const keyTagRegexp = new RegExp("<" + keyTag + ">(.+)<\\/" + keyTag + ">");
    const keyTagValue = tagMetastr.match(keyTagRegexp);
    if (keyTagValue === null) {
      return;
    }
    row[indexOfFullName] = this.convertSpecialChars(keyTagValue[1]);
    for (const tag of convert.permissionTags[type]["tags"]) {
      const indexOfTag = convert.header.indexOf(tag);
      const tagRegexp = new RegExp("<" + tag + ">(.+)<\\/" + tag + ">");
      const tagValue = tagMetastr.match(tagRegexp);
      if (tagValue === null) {
        return;
      }
      row[indexOfTag] = this.convertSpecialChars(tagValue[1]);
    }
    csvDataStr += row.join(",") + "\n";
    return csvDataStr;
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
