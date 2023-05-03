import { expect, test } from "@salesforce/command/lib/test";
import { ensureJsonMap, ensureString } from "@salesforce/ts-types";

describe("metadata:field:generate", () => {
  test
    .withOrg({ username: "test@generate.com" }, true)
    .withConnectionRequest((request) => {
      const requestMap = ensureJsonMap(request);
      if (/generateanization/.exec(ensureString(requestMap.url))) {
        return Promise.resolve({
          records: [
            {
              Name: "Super Awesome generate",
              TrialExpirationDate: "2018-03-20T23:24:11.000+0000",
            },
          ],
        });
      }
      return Promise.resolve({ records: [] });
    })
    .stdout()
    .command(["metadata:field:generate", "--targetusername", "test@generate.com"])
    .it("runs metadata:field:generate --targetusername test@generate.com", (ctx) => {
      expect(ctx.stdout).to.contain("generate world! This is generate: Super Awesome generate and I will be around until Tue Mar 20 2018!");
    });
});
