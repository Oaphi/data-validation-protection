import { expect } from "chai";
import * as sinon from "sinon";
import {
    parseJsonConfigFileContent,
    readConfigFile,
    sys,
    transpile,
} from "typescript";
import { runInThisContext } from "vm";

const configContent = readConfigFile("./tsconfig.json", sys.readFile);
const tsconfig = parseJsonConfigFileContent(configContent.config, sys, "./");

const protectionContent = sys.readFile("./src/protection.ts")!;
const protection = transpile(protectionContent, tsconfig.options);

runInThisContext(protection + "\n\nObject.assign(this, { Protection });");

type P = typeof Protection;

declare namespace globalThis {
    const Protection: P;
}

describe("Protection", () => {
    const mockRange = {
        getRow() {
            return 1;
        },
        getColumn() {
            return 1;
        },
    };

    const mockProtection = {
        _users: [],

        getRange() {
            return mockRange;
        },

        addEditor(
            this: { _users: Partial<GoogleAppsScript.Base.User>[] },
            tgt: string | GoogleAppsScript.Base.User
        ) {
            const newUser =
                typeof tgt === "string"
                    ? {
                          getEmail() {
                              return tgt;
                          },
                      }
                    : tgt;

            this._users.push(newUser);
            return this;
        },
        removeEditor(
            this: { _users: GoogleAppsScript.Base.User[] },
            tgt: string | GoogleAppsScript.Base.User
        ) {
            const email = typeof tgt === "string" ? tgt : tgt.getEmail();
            this._users.splice(
                this._users.findIndex((u) => u.getEmail() === email),
                1
            );
            return this;
        },
        removeEditors(
            this: { _users: GoogleAppsScript.Base.User[] },
            tgts: (string | GoogleAppsScript.Base.User)[]
        ) {
            const emails = tgts.map((u) =>
                typeof u === "string" ? u : u.getEmail()
            );

            this._users = this._users.filter(
                (u: GoogleAppsScript.Base.User) =>
                    !emails.includes(u.getEmail())
            );
            return this;
        },
        getEditors(this: { _users: GoogleAppsScript.Base.User[] }) {
            return [...this._users];
        },
    } as unknown as GoogleAppsScript.Spreadsheet.Protection;

    const protection = new globalThis.Protection(mockProtection);

    const sandbox = sinon.createSandbox();

    beforeEach(() => sandbox.spy(mockProtection));
    afterEach(() => {
        sandbox.restore();
        mockProtection.removeEditors(mockProtection.getEditors());
    });

    describe("Editors", () => {
        it("should correctly attempt to add an editor", () => {
            const editor = "jane@doe.com";
            protection.addEditor(editor);

            const emails = mockProtection.getEditors().map((u) => u.getEmail());

            expect(emails).to.have.length(1);
            expect(emails).to.contain(editor);
        });

        it("should correctly attempt to remove an editor", () => {
            const editor = "john@doe.org";
            protection.addEditor(editor);
            protection.removeEditor(editor);

            expect(mockProtection.getEditors()).to.be.empty;
        });

        it("should correctly attempt to remove all editors", () => {
            const editors = ["jeanne@darc.fr", "jacques@darc.fr"];
            editors.forEach((editor) => protection.addEditor(editor));

            protection.removeEditors();

            expect(mockProtection.getEditors()).to.be.empty;
        });
    });

    describe("isProtectedCell", () => {
        it("should correctly check if a given protection matches cell coordinates", () => {
            const prot = Protection.isProtectedCell(protection, 1, 1);
            const unprot = Protection.isProtectedCell(protection, 2, 2);

            expect(prot).to.be.true;
            expect(unprot).to.be.false;
        });
    });
});
