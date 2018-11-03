import tl = require('azure-pipelines-task-lib/task');
import trm = require('azure-pipelines-task-lib/toolrunner');
import fs = require('fs');

async function run() {
    try {
        let tool: trm.ToolRunner;

        let sourcePath: string = tl.getPathInput("SourcePath", true, true);
        console.log("Provided changelog path: " + sourcePath);

        let changelog: string = fs.readFileSync(sourcePath, 'utf8');

        // pattern with named groups: /\[(?<version>(?<major>\d+)(\.(?<minor>\d+))?(\.(?<patch>\d+))?(\-(?<pre>[0-9A-Za-z\-\.]+))?(\+(?<build>[0-9A-Za-z\-\.]+))?)\]\s+\-\s+(?<date>.*)(?<notes>[^#]*)/;
        let pattern = /\[((\d+)(\.(\d+))?(\.(\d+))?(\-([0-9A-Za-z\-\.]+))?(\+([0-9A-Za-z\-\.]+))?)\]\s+\-\s+(.*)([^#]*)/;
        if (!pattern.test(changelog)) {
            throw new Error("No change found in the changelog");
        }
        else
        {
            let matches = pattern.exec(changelog);

            let changlelogVersion: string = matches[1];
            tl.setVariable("ChanglelogVersion", changlelogVersion);
            console.log("Changlelog Version: " + changlelogVersion + " -> Saved to ChanglelogVersion environment variable.");
            
            let changlelogChanges: string = matches[12].trim();
            tl.setVariable("ChanglelogChanges", changlelogChanges);
            console.log("Changlelog Changes: " + changlelogChanges + " -> Saved to ChanglelogChanges environment variable.");

            let changlelogDate: string = matches[11];
            tl.setVariable("ChanglelogDate", changlelogDate);
            console.log("Changlelog Date: " + changlelogDate + " -> Saved to ChanglelogDate environment variable.");
        }
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();