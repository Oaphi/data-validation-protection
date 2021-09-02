class Protection {
    constructor(public protection: GoogleAppsScript.Spreadsheet.Protection) {}

    /**
     * @summary checks if a given protection applies to coordinates
     * @param {GoogleAppsScript.Spreadsheet.Protection} protection
     * @param {number} row 1-based row position
     * @param {number} col 1-based column position
     * @returns {boolean}
     */
    static isProtectedCell(
        protection: GoogleAppsScript.Spreadsheet.Protection | Protection,
        row: number,
        col: number
    ): boolean {
        const rng = protection.getRange();
        return rng.getColumn() === col && rng.getRow() === row;
    }

    /**
     * @summary proxy method for getting protected Range
     * @returns {GoogleAppsScript.Spreadsheet.Range}
     */
    getRange(): GoogleAppsScript.Spreadsheet.Range {
        const { protection } = this;
        return protection.getRange();
    }

    /**
     * @summary adds an editor from the protection
     * @param {string} email editor's email address
     * @returns {Protection}
     */
    addEditor(email: string): Protection {
        const { protection } = this;
        protection.addEditor(email);
        return this;
    }

    /**
     * @summary removes an editor from the protection
     * @param {string} email editor's email address
     * @returns {Protection}
     */
    removeEditor(email: string): Protection {
        const { protection } = this;
        protection.removeEditor(email);
        return this;
    }

    /**
     * @summary removes all editors from the protection
     * @returns {Protection}
     */
    removeEditors(): Protection {
        const { protection } = this;
        protection.removeEditors(protection.getEditors());
        return this;
    }
}
