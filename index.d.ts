/// <reference path="./src/validation.ts" />

declare namespace GoogleAppsScript {
    interface DataValidationProtectionApp {
        getInstance(
            sheet: GoogleAppsScript.Spreadsheet.Sheet
        ): DataValidationProtection;
        setPrefix(prefix: string): void;
    }
}

declare var DataValidationProtectionApp: GoogleAppsScript.DataValidationProtectionApp;
