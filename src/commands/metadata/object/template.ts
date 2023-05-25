/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.generate/licenses/BSD-3-Clause
 */
import * as os from "os";
import { existsSync, writeFileSync } from "fs";
import { flags, SfdxCommand } from "@salesforce/command";
import { Messages, SfError } from "@salesforce/core";
import { AnyJson } from "@salesforce/ts-types";

//@ts-ignore
import * as TemplateData from "../../../../src_config/metadata_object_template.json";

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages("sfdx-metadata-generator", "metadata_object_template");

export default class template extends SfdxCommand {
  public static description = messages.getMessage("commandDescription");

  public static examples = messages.getMessage("examples").split(os.EOL);

  public static args = [{ name: "file" }];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
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

  private static templateInput = TemplateData.template;

  public async run(): Promise<AnyJson> {
    if (!existsSync(this.flags.outputdir)) {
      throw new SfError(messages.getMessage("errorPathOfOutput") + this.flags.outputdir);
    }

    let csvTemplate = "";
    const firstRowKey = Object.keys(template.templateInput)[0];
    const firstRow = template.templateInput[firstRowKey];
    csvTemplate += Object.keys(firstRow).join(",") + "\n";
    for (const rowName in template.templateInput) {
      csvTemplate += Object.values(template.templateInput[rowName]).join(",") + "\n";
      //  writeFileSync(this.flags.outputdir + "/" + meta.fullName + ".object-meta.xml", meta.metaStr);
    }
    writeFileSync(this.flags.outputdir + "/template.csv", csvTemplate, "utf8");
    console.log(messages.getMessage("success") + this.flags.outputdir + ".");
    // Return an object to be displayed with --json*/
    return { input: this.flags.outputdir };
  }
}
