Object.assign(this, {
    /**
     * @summary instantiates a DataValidationProtection class
     * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet target sheet
     * @returns {DataValidationProtection}
     */
    getInstance(
        sheet: GoogleAppsScript.Spreadsheet.Sheet
    ): DataValidationProtection {
        return new DataValidationProtection(sheet);
    },

    /**
     * @summary sets prefix to add to protection name
     * @param {string} prefix prefix to set
     * @returns {void}
     */
    setPrefix(prefix: string): void {
        DataValidationProtection.prefix = prefix;
    },

    /**
     * @summary wraps a protection into Protection class instance
     * @param {GoogleAppsScript.Spreadsheet.Protection} protection protection to wrap
     * @returns {Protection}
     */
    wrap(protection: GoogleAppsScript.Spreadsheet.Protection): Protection {
        return new Protection(protection);
    },
});
