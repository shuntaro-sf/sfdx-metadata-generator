//import { TestSession } from "@salesforce/cli-plugins-testkit";
import * as shell from "shelljs";
import * as fs from "fs";
import * as path from "path";

const inputFileName = "field_performanceTestInput.csv";
const outputDir = "force-app/main/default/objects/Account/fields/";

describe("PerformanceTest", () => {
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
    const startTime = performance.now();
    const input = "../" + inputFileName;
    shell.exec("sfdx metadata:field:generate -i " + input + " -o " + outputDir);
    const endTime = performance.now();
    console.log(endTime - startTime);
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
