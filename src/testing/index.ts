import {
  createTestLibrary,
  findTestPackageRoot,
} from "@typespec/compiler/testing";

export const AlloyCloudflareTestLibrary = createTestLibrary({
  name: "typespec-cloudflare",
  packageRoot: await findTestPackageRoot(import.meta.url),
});
