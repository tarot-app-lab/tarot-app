const { spawnSync } = require("node:child_process");

const npmCli = process.env.npm_execpath;

if (!npmCli) {
  console.error("npm_execpath is not available. Run this script through npm.");
  process.exit(1);
}

const args = [
  npmCli,
  "exec",
  "--yes",
  "--package",
  "eas-cli@12",
  "--",
  "eas",
  ...process.argv.slice(2),
];

const result = spawnSync(process.execPath, args, {
  stdio: "inherit",
  shell: false,
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
