class Protection {
    constructor(public protection: GoogleAppsScript.Spreadsheet.Protection) {}

    /**
     * @summary adds an editor from the protection
     * @param {string} email editor's email address
     * @returns {Protection}
     */
    addEditor(email: string) {
        const { protection } = this;
        protection.addEditor(email);
        return this;
    }

    /**
     * @summary removes an editor from the protection
     * @param {string} email editor's email address
     * @returns {Protection}
     */
    removeEditor(email: string) {
        const { protection } = this;
        protection.removeEditor(email);
        return this;
    }

    /**
     * @summary removes all editors from the protection
     * @returns {Protection}
     */
    removeEditors() {
        const { protection } = this;
        protection.removeEditors(protection.getEditors());
        return this;
    }
}
