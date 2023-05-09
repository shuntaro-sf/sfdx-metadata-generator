//import { TestSession } from "@salesforce/cli-plugins-testkit";
import * as shell from "shelljs";
import * as fs from "fs";
import * as path from "path";

const alias = "sfdxPluginTest";
const inputFileName = "positiveTestInput.csv";
const outputDir = "force-app/main/default/objects/Account/fields/";

describe("PositiveTest", () => {
  //let testSession: TestSession;
  before(async () => {
    shell.cd("test/commands/metadata/resources/test");
    fs.readdir(outputDir, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        shell.rm(path.join(outputDir, file));
      }
    });
  });

  it("generates field-metadata", async (done) => {
    const input = "../" + inputFileName;
    shell.exec("sfdx metadata:field:generate -i " + input + " -o " + outputDir);
    done();
  });
  it("deploy to a scratch org to confirm the generated metadata are valid", async (done) => {
    shell.exec("sfdx force:source:deploy -p " + outputDir + " --checkonly -u " + alias);
    done();
  });

  after(async () => {
    fs.readdir(outputDir, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        shell.rm(path.join(outputDir, file));
      }
    });
  });
});
