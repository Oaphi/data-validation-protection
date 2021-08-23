type SetProtectionOptions = {
    skipRows?: number;
    columnBlacklist?: number[];
};

/**
 * @private
 *
 * @summary internal abstraction for setting protection
 * @param {GoogleAppsScript.Spreadsheet.Sheet} target sheet to work with
 * @param {string} prefix prefix to mark protections with
 * @param {SetProtectionOptions} [options] protections setter options
 * @returns {void}
 */
const setProtection_ = (
    target: GoogleAppsScript.Spreadsheet.Sheet,
    prefix: string,
    { skipRows = 1, columnBlacklist = [] }: SetProtectionOptions = {}
) => {
    const drange = target.getDataRange();

    const [headers] = drange.getValues();
    const validations = drange.getDataValidations();

    const validationColumns = headers.map((_, ci) =>
        validations.map((r) => r[ci]).some(Boolean)
    );

    const numRows = drange.getNumRows();

    headers.forEach((header, ci) => {
        if (!validationColumns[ci] || columnBlacklist.includes(ci)) return;

        const colRng = target.getRange(skipRows + 1, ci + 1, numRows - 1, 1);

        const prot = colRng.protect();
        prot.setDescription(`${prefix} | ${header}`);

        const protection = new Protection(prot);
        protection.removeEditors();
    });
};
