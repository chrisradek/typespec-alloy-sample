import { EmitContext, emitFile, resolvePath } from "@typespec/compiler";
import { output } from "./sample.jsx";
import { OutputDirectory, OutputFile } from "@alloy-js/core";

export async function $onEmit(context: EmitContext) {
  if (context.program.compilerOptions.noEmit) {
    // do something
    console.log(output);
    return;
  }

  await writeOutput(context, output);
}

async function writeOutput(context: EmitContext, output: OutputDirectory) {
  const basePath = context.emitterOutputDir;

  const pendingContent: Array<OutputDirectory | OutputFile> = [output];

  while (pendingContent.length) {
    const content = pendingContent.pop()!;

    const path = resolvePath(basePath, content.path);

    if (content.kind === "directory") {
      pendingContent.push(...content.contents);
    } else if (content.kind === "file") {
      await emitFile(context.program, { path, content: content.contents });
    }
  }
}
