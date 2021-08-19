Object.assign(this, {
    getInstance(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
        return new DataValidationProtection(sheet);
    },
    setPrefix(prefix: string) {
        DataValidationProtection.prefix = prefix;
    },
});
