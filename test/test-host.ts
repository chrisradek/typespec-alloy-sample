import { createTestHost, createTestWrapper } from "@typespec/compiler/testing";
import { HttpTestLibrary } from "@typespec/http/testing";
import { StreamsTestLibrary } from "@typespec/streams/testing";
import { AlloyCloudflareTestLibrary } from "../src/testing/index.js";

export async function createCloudflareTestHost() {
  return createTestHost({
    libraries: [
      HttpTestLibrary,
      StreamsTestLibrary,
      AlloyCloudflareTestLibrary,
    ],
  });
}

export async function createCloudflareTestRunner() {
  const host = await createCloudflareTestHost();
  return createTestWrapper(host);
}
