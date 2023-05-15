//import { TestSession } from "@salesforce/cli-plugins-testkit";
import * as shell from "shelljs";

const invalidInputFileName = "inputNotFound.csv";
const validInputFileName = "profile_NegativeTestInput.csv";
const validSourcePath = "force-app/main/default/profiles/Admin.profile-meta.xml";
const invalidSourcePath = "force-app/main/default/profiles/NotFound.xml";
const validOutputDir = "force-app/main/default/profiles/";
const invalidOutputDir = "force-app/main/default/NotFound/";

describe("ProfileFlagTest", () => {
  //let testSession: TestSession;
  before(async () => {
    shell.cd("test/commands/metadata/resources/test/");
  });

  it("generates field-metadata", async (done) => {
    const input = "../" + invalidInputFileName;
    shell.exec("sfdx metadata:profile:generate -i " + input + " -s " + validSourcePath + " -o " + validOutputDir);
    done();
  });
  it("generates field-metadata", async (done) => {
    const input = "../" + validInputFileName;
    shell.exec("sfdx metadata:profile:generate -i " + input + " -s " + validSourcePath + " -o " + invalidOutputDir);
    done();
  });
  it("generates field-metadata", async (done) => {
    const input = "../" + validInputFileName;
    shell.exec("sfdx metadata:profile:generate -i " + input + " -s " + invalidSourcePath + " -o " + validOutputDir);
    done();
  });

  after(async () => {});
});
