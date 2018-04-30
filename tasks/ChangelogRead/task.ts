import tl = require('vsts-task-lib/task');
import trm = require('vsts-task-lib/toolrunner');
import fs = require('fs');

async function run() {
    try {
        let tool: trm.ToolRunner;

        let sourcePath: string = tl.getPathInput("SourcePath", true, true);
        console.log("Provided changelog path: " + sourcePath);

        let changelog: string = fs.readFileSync(sourcePath, 'utf8');

        let pattern = new RegExp("\[(?<version>(?<major>\d+)(\.(?<minor>\d+))?(\.(?<patch>\d+))?(\-(?<pre>[0-9A-Za-z\-\.]+))?(\+(?<build>[0-9A-Za-z\-\.]+))?)\]\s+\-\s+(?<date>.*)(?<notes>[^#]*)");
        if (!pattern.test(changelog)) {
            throw new Error("No match found for version string in changelog");
        }
        else
        {
            let matches = pattern.exec(changelog);
            let changlelogVersion: string = matches[0];
            tl.setVariable("ChanglelogVersion", changlelogVersion);
            console.log("Changlelog Version: " + changlelogVersion + " -> Saved to ChanglelogVersion environment variable.");
        }
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();