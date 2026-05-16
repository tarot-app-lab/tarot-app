const { spawnSync } = require("node:child_process");
const path = require("node:path");

const easCliScript = path.join(__dirname, "eas-cli.cjs");

function run(command, options = {}) {
  const result = spawnSync(process.execPath, [easCliScript, ...command], {
    stdio: options.quiet ? "pipe" : "inherit",
    shell: false,
    encoding: "utf8",
  });

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  if (!options.allowFailure && result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  return result;
}

const whoami = run(["whoami"], { allowFailure: true });

if (whoami.status === 0) {
  console.log("EAS login already configured.");
} else {
  run(["login", "--sso"]);
  run(["whoami"]);
}

run(["init", "--non-interactive", "--force"]);
run(["build:configure", "--platform", "all"]);
