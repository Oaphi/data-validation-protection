declare namespace GoogleAppsScript {
    class DataValidationProtection {
        getColumn(column?: number): GoogleAppsScript.Spreadsheet.Protection[];

        /**
         * @summary gets data validation protections at a certain row
         */
        getRow(row?: number): GoogleAppsScript.Spreadsheet.Protection[];

        /**
         * @summary lists data validation protections
         */
        list(): GoogleAppsScript.Spreadsheet.Protection[];

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
        removeEditors(...emails: string[]): DataValidationProtection;
    }

    class Protection {
        /**
         * @summary checks if a given protection applies to coordinates
         */
        isProtectedCell(row: number, col: number): boolean;

        /**
         * @summary adds an editor from the protection
         */
        addEditor(email: string): Protection;

        /**
         * @summary removes an editor from the protection
         */
        removeEditor(email: string): Protection;

        /**
         * @summary removes all editors from the protection
         */
        removeEditors(): Protection;
    }

    interface DataValidationProtectionApp {
        /**
         * @summary instantiates a DataValidationProtection class
         */
        getInstance(
            sheet: GoogleAppsScript.Spreadsheet.Sheet
        ): DataValidationProtection;

        /**
         * @summary sets prefix to add to protection name
         */
        setPrefix(prefix: string): void;

        /**
         * @summary wraps a protection into Protection class instance
         */
        wrap(protection: GoogleAppsScript.Spreadsheet.Protection): Protection;
    }
}

declare var DataValidationProtectionApp: GoogleAppsScript.DataValidationProtectionApp;
