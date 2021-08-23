declare namespace GoogleAppsScript {
    class DataValidationProtection {
        getColumn(
            column?: number
        ): GoogleAppsScript.Spreadsheet.DataValidation[];

        /**
         * @summary gets data validation protections at a certain row
         */
        getRow(row?: number): GoogleAppsScript.Spreadsheet.DataValidation[];

        /**
         * @summary lists data validation protections
         */
        list(): GoogleAppsScript.Spreadsheet.DataValidation[];

        /**
         * @summary adds data validation protection
         */
        protect(skipRows?: number): DataValidationProtection;

        /**
         * @summary removes data validation protection
         */
        unprotect(): DataValidationProtection;

        /**
         * @summary adds data validation protection to columns except blacklisted
         */
        protectColumnsExcept(
            blacklist: number[],
            skipRows?: number
        ): DataValidationProtection;

        /**
         * @summary adds editors to a column of data validations
         */
        addToColumn(
            column: number,
            ...emails: string[]
        ): DataValidationProtection;

        /**
         * @summary adds editors to a row of data validations
         */
        addToRow(row: number, ...emails: string[]): DataValidationProtection;

        /**
         * @summary removes editors from a column of data validations
         */
        removeFromColumn(
            column: number,
            ...emails: string[]
        ): DataValidationProtection;

        /**
         * @summary removes editors from a row of data validations
         */
        removeFromRow(
            row: number,
            ...emails: string[]
        ): DataValidationProtection;

        /**
         * @summary adds editors to the data validation protection
         */
        addEditors(...emails: string[]): DataValidationProtection;

        /**
         * @summary removes editors from the data validation protection
         */
        removeEditors(...emails: string[]): void;
    }

    interface DataValidationProtectionApp {
        getInstance(
            sheet: GoogleAppsScript.Spreadsheet.Sheet
        ): DataValidationProtection;
        setPrefix(prefix: string): void;
    }
}

declare var DataValidationProtectionApp: GoogleAppsScript.DataValidationProtectionApp;
