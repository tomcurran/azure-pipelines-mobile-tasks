## Mobile App Tasks for VSTS

These tasks assist with mobile app builds.

# Android

## Manfiest Read

Read common values from an Android manifest file at build time.

Inputs:

* SourcePath: Path to android manifest

Outputs:

The following environment variables will be set with corresponding values from the android manifest file specified by the SourcePath input. If a value cannot be found in the manifest the environment variable will not be set.

* AndroidManifestVersionCode: manifest android:versionCode value
* AndroidManifestVersionName: manifest android:versionName value
* AndroidManifestPackage: manifest package value
* AndroidManifestMinSdkVersion: manifest uses-sdk android:minSdkVersion value
* AndroidManifestTargetSdkVersion: manifest uses-sdk android:targetSdkVersion value

# General

## Git Last Commit Date

Reads the date of the last git commit, then export that data to environemnt variables.

Outputs:

* GitLastCommitDate: The date for the last git commit in ISO 8601 format.
* GitLastCommitDateNumbers: The date for the last git commit in format YYMMDDHHmm. The date numbers are intended to fit in the 32-bit signed two's complement integer range.

## Changelog Read

Reads the latest change information from a changelog following keepachangelog.com format, then export that data to environemnt variables.

Outputs:

* ChanglelogVersion: The version for the last change log entry e.g 1.2.3
* ChanglelogChanges: The changes for the last change log entry.
* ChanglelogDate: The date for the last change log entry e.g 2018-12-31
