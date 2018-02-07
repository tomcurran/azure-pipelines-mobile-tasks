import tl = require('vsts-task-lib/task');
import trm = require('vsts-task-lib/toolrunner');
import * as cp from "child_process";

async function run() {
    try {
        let tool: trm.ToolRunner;

        var git = tl.which("git", true);
        var args = ["show", "-s", "--format=%ci"];
        var gitDir = tl.getVariable("Build.Repository.LocalPath");
        console.log("[command]" + git + " " + args.join(" "));
        var gitLastCommitDate = (cp.execFileSync(git, args, {
            encoding: "utf8",
            cwd: gitDir
        }) as string).trim();
        console.log(gitLastCommitDate);

        tl.setVariable("GitLastCommitDate", gitLastCommitDate);
        console.log("Git last commit date: " + gitLastCommitDate + " -> Saved to GitLastCommitDate environment variable.");

        let pattern = new RegExp("[0-9][0-9]([0-9][0-9])-([0-9][0-9])-([0-9][0-9]) ([0-9][0-9]):([0-9][0-9])");
        if (!pattern.test(gitLastCommitDate)) {
            throw new Error("Could not parse numbers from git last commit date");
        }
        let result = pattern.exec(gitLastCommitDate);
        let gitLastCommitDateNumbers = result[1] + result[2] + result[3] + result[4] + result[5];

        tl.setVariable("GitLastCommitDateNumbers", gitLastCommitDateNumbers);
        console.log("Git last commit date numbers: " + gitLastCommitDateNumbers + " -> Saved to GitLastCommitDateNumbers environment variable.");
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();