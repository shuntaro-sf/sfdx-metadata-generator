//import { TestSession } from "@salesforce/cli-plugins-testkit";
import * as shell from "shelljs";
import * as fs from "fs";
import * as path from "path";

const invalidInputFileName = "inputNotFound.csv";
const validInputFileName = "object_input.csv";
const validOutputDir = "force-app/main/default/objects/";
const invalidOutputDir = "force-app/main/default/notFoundObjects/";

describe("ObjectFlagTest", () => {
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

  it("generates object-metadata", async (done) => {
    const input = "../" + invalidInputFileName;
    shell.exec("sfdx metadata:object:generate -i " + input + " -o " + validOutputDir);
    done();
  });
  it("generates object-metadata", async (done) => {
    const input = "../" + validInputFileName;
    shell.exec("sfdx metadata:object:generate -i " + input + " -o " + invalidOutputDir);
    done();
  });

  after(async () => {});
});
