//import { TestSession } from "@salesforce/cli-plugins-testkit";
import * as shell from "shelljs";

const alias = "sfdxPluginTest";
const inputFileName = "profile_positiveTestInput.csv";
const sourcePath = "force-app/main/default/profiles/Admin.profile-meta.xml";
const outputDir = "force-app/main/default/profiles/";

describe("ProfilePositiveTest", () => {
  //let testSession: TestSession;
  before(async () => {
    shell.cd("test/commands/metadata/resources/test");
  });

  it("generates profile-metadata", async (done) => {
    const input = "../" + inputFileName;
    shell.exec("sfdx metadata:profile:generate -i " + input + " -s " + sourcePath + " -o " + outputDir);
    done();
  });
  it("deploy to a test org to confirm the generated metadata are valid", async (done) => {
    shell.exec("sfdx force:source:deploy -p " + outputDir + " --checkonly -u " + alias);
    done();
  });

  after(async () => {});
});
