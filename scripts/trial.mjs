#!/usr/bin/env node
// The template holds `__slug__` and `__Name__`, which Expo's config schema refuses (a scheme is lowercase letters).
// This proves the template makes a valid app instead: it copies the tracked files to a temporary folder, fills them as
// the product « trial » (what `init.mjs` does to a new repository), links the installed node_modules, then runs
// `expo-doctor` there. CI runs it as the `doctor` script.
import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { fill, textFiles } from "./init.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const trial = mkdtempSync(join(tmpdir(), "expo-trial-"));
try {
  for (const file of execFileSync("git", ["ls-files"], { cwd: root, encoding: "utf8" }).split("\n").filter(Boolean)) {
    mkdirSync(dirname(join(trial, file)), { recursive: true });
    cpSync(join(root, file), join(trial, file));
  }
  for (const file of textFiles(root)) {
    writeFileSync(join(trial, file), fill(readFileSync(join(root, file), "utf8"), "trial", "Trial"));
  }
  symlinkSync(join(root, "node_modules"), join(trial, "node_modules"), "dir");
  console.log(`trial: the template filled as « Trial » (com.krizaka.trial) in ${trial}`);
  execFileSync("npx", ["--yes", "expo-doctor"], { cwd: trial, stdio: "inherit" });
} finally {
  rmSync(trial, { recursive: true, force: true });
}
