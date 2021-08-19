# Data Validation Protection

DVP is a utility library for Google Apps Script that makes protecting, unprotecting, and manipulating data validations in Google Sheets easy and convenient.

# Usage

The library exposes the following methods (accessible via the `userSymbol` you included it as):

| Method        | Description                                                                    |
| ------------- | ------------------------------------------------------------------------------ |
| `getInstance` | Instantiates the utility class given a Google Sheets sheet                     |
| `setPrefix`   | Sets the prefix to prepend when naming new data validations (`DVP` by default) |

# Install

If developing locally, add the project info to manifest file's `dependencies.libraries` list:

| Field             | Required | Value                                                                    |
| ----------------- | -------- | ------------------------------------------------------------------------ |
| `libraryId`       | yes      | `1j32xAwEOn2sUWfUQsHjumwFO3rknOZxAGRRf-TQCZdvgPgwzJ2m4tptx`              |
| `version`         | yes      | Library version you want to use                                          |
| `userSymbol`      | no       | The library name, `DataValidationProtectionApp` by default               |
| `developmentMode` | no       | Include the library in dev mode (will use any latest _unstable_ version) |

Sample JSON object to add:

```json
{
    "libraryId": "1j32xAwEOn2sUWfUQsHjumwFO3rknOZxAGRRf-TQCZdvgPgwzJ2m4tptx",
    "userSymbol": "DataValidationProtectionApp",
    "version": 1,
    "developmentMode": false
}
```

Otherwise, use the new online editor UI to add the library (the id is the same as in `libraryId`):

![adding library via the online editor](./assets/library.png)
