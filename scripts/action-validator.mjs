// @ts-check

import fs from "fs/promises";
import path from "path";
import child_process from "child_process";
import chalk from "chalk";

let dirents = await fs.readdir(".github/workflows");
dirents = dirents
  .filter((dirent) => dirent.endsWith(".yml"))
  .map((dirent) => path.join(".github/workflows", dirent));

let exitCode = 0;

for (const dirent of dirents) {
  console.log(chalk.underline(`Validating ${dirent}...`));
  try {
    child_process.execSync(`npx action-validator ${dirent}`, {
      stdio: "inherit",
    });
  } catch (error) {
    console.error(chalk.bgRed.bold(` >> Validation failed for ${dirent} << `));
    exitCode = 1;
  }
}

console.log();

if (exitCode) {
  console.log(chalk.red("Validation failed!"));
} else {
  console.log(chalk.green("Validation passed!"));
}

process.exit(exitCode);
