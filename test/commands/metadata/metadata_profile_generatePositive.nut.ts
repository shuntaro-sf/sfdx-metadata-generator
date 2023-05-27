//import { TestSession } from "@salesforce/cli-plugins-testkit";
import * as shell from "shelljs";
import * as fs from "fs";
import { expect } from "chai";

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
  it("converts generated metadata to a csv file", async (done) => {
    shell.exec("sfdx metadata:profile:convert -s " + sourcePath + " -o ../");
    done();
  });
  it("compares generated values and converted values", function () {
    const input = "../" + inputFileName;
    const inputCsv = fs
      .readFileSync(input, {
        encoding: "utf8",
      })
      .toString()
      .split("\n")
      .map((e) => e.trim())
      .map((e) => e.split(",").map((e) => e.trim()));

    const generatedCsv = fs
      .readFileSync("../profile-meta.csv", {
        encoding: "utf8",
      })
      .toString()
      .split("\n")
      .map((e) => e.trim())
      .map((e) => e.split(",").map((e) => e.trim()));

    const header = generatedCsv[0];
    for (let rowIdx = 1; rowIdx < inputCsv.length; rowIdx++) {
      const indexOfFullNameInput = inputCsv[0].indexOf("fullName");
      const indexOfFullNameGenerated = generatedCsv[0].indexOf("fullName");
      for (const generatedRow of generatedCsv) {
        if (inputCsv[rowIdx][indexOfFullNameInput] !== generatedRow[indexOfFullNameGenerated]) {
          continue;
        }

        for (const tag of header) {
          const indexOfInput = inputCsv[0].indexOf(tag);
          const indexOfGenearted = generatedCsv[0].indexOf(tag);
          if (generatedRow[indexOfGenearted] === "" && inputCsv[rowIdx][indexOfInput] !== "") {
            continue;
          }
          if (inputCsv[rowIdx][indexOfInput] === "TRUE" || inputCsv[rowIdx][indexOfInput] === "FALSE") {
            expect(generatedRow[indexOfGenearted]).to.equals(inputCsv[rowIdx][indexOfInput].toLowerCase());
          }
        }
      }
    }
  });

  after(async () => {});
});
