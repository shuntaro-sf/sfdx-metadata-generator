//import { TestSession } from "@salesforce/cli-plugins-testkit";
import * as shell from "shelljs";
import * as fs from "fs";
import * as path from "path";
import { expect } from "chai";

const alias = "sfdxPluginTest";
const inputFileName = "object_positiveTestInput.csv";
const outputDir = "force-app/main/default/objects/";

describe("objectPositiveTest", () => {
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

  it("generates object-metadata", async (done) => {
    const input = "../" + inputFileName;
    shell.exec("sfdx metadata:object:generate -i " + input + " -o " + outputDir);
    done();
  });
  it("deploy to a test org to confirm the generated metadata are valid", async (done) => {
    shell.exec("sfdx force:source:deploy -p " + outputDir + " --checkonly -u " + alias);
    done();
  });
  it("converts generated metadata to a csv file", async (done) => {
    shell.exec("sfdx metadata:object:convert -s " + outputDir + " -o ../");
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
      .readFileSync("../object-meta.csv", {
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

  after(async () => {
    fs.readdir(outputDir, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        shell.rm(path.join(outputDir, file));
      }
    });
    shell.rm("../template.csv");
  });
});
