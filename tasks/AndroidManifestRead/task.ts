import tl = require('vsts-task-lib/task');
import trm = require('vsts-task-lib/toolrunner');
import fs = require('fs');
import sam = require('samchon-framework');
import { isNullOrUndefined } from 'util';

async function run() {
    try {
        let tool: trm.ToolRunner;

        let sourcePath: string = tl.getPathInput("SourcePath", true, true);
        console.log("Provided manifest path: " + sourcePath);

        let xmlString: string = fs.readFileSync(sourcePath, 'utf8');
        let xml: sam.library.XML = new sam.library.XML(xmlString);

        if (xml.hasProperty("android:versionCode"))
        {
            let versionCode = xml.getProperty("android:versionCode");
            tl.setVariable("AndroidManifestVersionCode", versionCode);
            console.log("Version code: " + versionCode + " -> Saved to AndroidManifestVersionCode environment variable.");
        }
        else
        {
            console.log("No version code found in manifest");
        }

        if (xml.hasProperty("android:versionName"))
        {
            let versionName = xml.getProperty("android:versionName");
            tl.setVariable("AndroidManifestVersionName", versionName);
            console.log("Version name: " + versionName + " -> Saved to AndroidManifestVersionName environment variable.");
        }
        else
        {
            console.log("No version name found in manifest");
        }

        if (xml.hasProperty("package"))
        {
            let packageName = xml.getProperty("package");
            tl.setVariable("AndroidManifestPackage", packageName);
            console.log("Package: " + packageName + " -> Saved to AndroidManifestPackage environment variable.");
        }
        else
        {
            console.log("No package found in manifest");
        }

        if (xml.has("uses-sdk"))
        {
            let usesSdk = xml.get("uses-sdk").at(0);

            if (usesSdk.hasProperty("android:minSdkVersion"))
            {
                let minSdkVersion = usesSdk.getProperty("android:minSdkVersion");
                tl.setVariable("AndroidManifestMinSdkVersion", minSdkVersion);
                console.log("Minimum SDK version: " + minSdkVersion + " -> Saved to AndroidManifestMinSdkVersion environment variable.");
            }
            else
            {
                console.log("No minimum SDK version found in manifest");
            }

            if (usesSdk.hasProperty("android:targetSdkVersion"))
            {
                let targetSdkVersion = usesSdk.getProperty("android:targetSdkVersion");
                tl.setVariable("AndroidManifestTargetSdkVersion", targetSdkVersion);
                console.log("Target SDK version: " + targetSdkVersion + " -> Saved to AndroidManifestTargetSdkVersion environment variable.");
            }
            else
            {
                console.log("No target SDK version found in manifest");
            }
        }
        else
        {
            console.log("No uses sdk tag found in manifest");
        }
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();