//import { TestSession } from "@salesforce/cli-plugins-testkit";
import * as shell from "shelljs";
import * as fs from "fs";
import * as path from "path";

const alias = "sfdxPluginTest";
const inputFileName = "object_input.csv";
const outputDir = "force-app/main/default/objects/";

describe("Test", () => {
  //let testSession: TestSession;
  before(async () => {
    shell.cd("test/commands/metadata/resources/test/");
    fs.readdir(outputDir, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        shell.rm(path.join(outputDir, file));
      }
    });
  });

  it("generates object-metadata", async (done) => {
    const input = "../" + inputFileName;
    shell.exec("sfdx metadata:object:generate -i " + input + " -o " + outputDir);
    done();
  });
  it("deploy to a test org to confirm the generated metadata are valid", async (done) => {
    shell.exec("sfdx force:source:deploy -p " + outputDir + " --checkonly -u " + alias);
    done();
  });

  after(async () => {
    const input = "../" + inputFileName;
    const csv = fs
      .readFileSync(input, {
        encoding: "utf8",
      })
      .toString()
      .split("\n")
      .map((e) => e.trim())
      .map((e) => e.split(",").map((e) => e.trim()));

    let fullNames = [];
    csv.forEach((row) => {
      fullNames.push(row[0]);
    });

    console.log(fullNames);
    fs.readdir(outputDir, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        console.log(file);
        if (fullNames.includes(file)) {
          shell.rm("-r", path.join(outputDir, file));
        }
      }
    });
  });
});
