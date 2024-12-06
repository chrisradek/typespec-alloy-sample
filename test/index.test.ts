import { describe, it } from "vitest";
import { createCloudflareTestRunner } from "./test-host.js";

describe("test", () => {
  it("can be tested?", async () => {
    const runner = await createCloudflareTestRunner();
    await runner.compile(
      `
      @service
      namespace Sample;

      op foo(): void;
    `,
      {
        noEmit: false,
        emit: ["typespec-cloudflare"],
      }
    );

    for (const [file, contents] of runner.fs.entries()) {
      if (!file.startsWith(`/test/typespec-cloudflare`)) continue;
      console.log("-".repeat(50));
      console.log(`|${file.padEnd(44, " ").padStart(48, " ")}|`);
      console.log("-".repeat(50));
      console.log(contents);
    }
  });
});
