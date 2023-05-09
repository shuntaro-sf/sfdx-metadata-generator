//import { TestSession } from "@salesforce/cli-plugins-testkit";
import * as shell from "shelljs";
import * as fs from "fs";
import * as path from "path";

const invalidInputFileName = "inputNotFound.csv";
const validInputFileName = "input.csv";
const validOutputDir = "force-app/main/default/objects/Account/fields/";
const invalidOutputDir = "force-app/main/default/objects/ObjectNotFound/fields/";

describe("FlagTest", () => {
  //let testSession: TestSession;
  before(async () => {
    shell.cd("test/commands/metadata/resources/test/");
    fs.readdir(validOutputDir, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        shell.rm(path.join(validOutputDir, file));
      }
    });
  });

  it("generates field-metadata", async (done) => {
    const input = "../" + invalidInputFileName;
    shell.exec("sfdx metadata:field:generate -i " + input + " -o " + validOutputDir);
    done();
  });
  it("generates field-metadata", async (done) => {
    const input = "../" + validInputFileName;
    shell.exec("sfdx metadata:field:generate -i " + input + " -o " + invalidOutputDir);
    done();
  });

  after(async () => {
    fs.readdir(validOutputDir, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        shell.rm(path.join(validOutputDir, file));
      }
    });
  });
});
