class DataValidationProtection {
    static prefix = "DVP";

    /**
     * @param {GoogleAppsScript.Spreadsheet.Sheet} [target] sheet to work with
     */
    constructor(public target = SpreadsheetApp.getActiveSheet()) {}

    /**
     * @summary gets data validation protections at a certain column
     * @param {number} [column] column position
     * @returns {GoogleAppsScript.Spreadsheet.DataValidation[]}
     */
    getColumn(column = 1) {
        const protections = this.list();
        return protections.filter(
            (prot) => prot.getRange().getColumn() === column
        );
    }

    /**
     * @summary gets data validation protections at a certain row
     * @param {number} [row] row position
     * @returns {GoogleAppsScript.Spreadsheet.DataValidation[]}
     */
    getRow(row = 1) {
        const protections = this.list();
        return protections.filter((prot) => prot.getRange().getRow() === row);
    }

    /**
     * @summary lists data validation protections
     * @returns {GoogleAppsScript.Spreadsheet.DataValidation[]}
     */
    list() {
        const { target } = this;
        const { prefix } = DataValidationProtection;

        const prots = target.getProtections(
            SpreadsheetApp.ProtectionType.RANGE
        );

        const regex = new RegExp(`^${prefix}\\s+\\|`);

        return prots.filter((prot) => regex.test(prot.getDescription()));
    }

    /**
     * @summary adds data validation protection
     * @param {number} [skipRows] rows to skip when setting protection
     * @returns {DataValidationProtection}
     */
    protect(skipRows = 1) {
        const { target } = this;
        const { prefix } = DataValidationProtection;

        const drange = target.getDataRange();

        const [headers] = drange.getValues();
        const validations = drange.getDataValidations();

        const validationColumns = headers.map((_, ci) =>
            validations.map((r) => r[ci]).some(Boolean)
        );

        const numRows = drange.getNumRows();

        headers.forEach((header, ci) => {
            if (!validationColumns[ci]) return;

            const colRng = target.getRange(
                skipRows + 1,
                ci + 1,
                numRows - 1,
                1
            );

            const prot = colRng.protect();
            prot.setDescription(`${prefix} | ${header}`);

            const protection = new Protection(prot);
            protection.removeEditors();
        });

        return this;
    }

    /**
     * @summary removes data validation protection
     * @returns {DataValidationProtection}
     */
    unprotect() {
        const protections = this.list();
        protections.forEach((prot) => prot.remove());
        return this;
    }

    /**
     * @summary adds editors to a column of data validations
     * @param {number} column column position
     * @param {...string} emails list of editor emails to add
     * @returns {DataValidationProtection}
     */
    addToColumn(column: number, ...emails: string[]) {
        const protections = this.getColumn(column);
        protections.forEach((prot) => prot.addEditors(emails));
        return this;
    }

    /**
     * @summary adds editors to a row of data validations
     * @param {number} row row position
     * @param {...string} emails list of editor emails to add
     * @returns {DataValidationProtection}
     */
    addToRow(row: number, ...emails: string[]) {
        const protections = this.getRow(row);
        protections.forEach((prot) => prot.addEditors(emails));
        return this;
    }

    /**
     * @summary removes editors from a column of data validations
     * @param {number} column column position
     * @param {...string} emails list of editor emails to remove
     * @returns {DataValidationProtection}
     */
    removeFromColumn(column: number, ...emails: string[]) {
        const protections = this.getColumn(column);
        protections.forEach((prot) => prot.removeEditors(emails));
        return this;
    }

    /**
     * @summary removes editors from a row of data validations
     * @param {number} row row position
     * @param {...string} emails list of editor emails to remove
     * @returns {DataValidationProtection}
     */
    removeFromRow(row: number, ...emails: string[]) {
        const protections = this.getRow(row);
        protections.forEach((prot) => prot.removeEditors(emails));
        return this;
    }

    /**
     * @summary adds editors to the data validation protection
     * @param {...string} emails list of editor emails to add
     * @returns {DataValidationProtection}
     */
    addEditors(...emails: string[]) {
        const protections = this.list();
        protections.forEach((prot) => prot.addEditors(emails));
        return this;
    }

    /**
     * @summary removes editors from the data validation protection
     * @param {...string} emails list of editor emails to remove
     * @returns {DataValidationProtection}
     */
    removeEditors(...emails: string[]) {
        const protections = this.list();
        protections.forEach((prot) => prot.removeEditors(emails));
    }
}
