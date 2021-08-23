import {
    parseJsonConfigFileContent,
    readConfigFile,
    sys,
    transpile,
} from "typescript";
import { runInThisContext } from "vm";

const configContent = readConfigFile("./tsconfig.json", sys.readFile);
const tsconfig = parseJsonConfigFileContent(configContent.config, sys, "./");

const protectionContent = sys.readFile("./src/validation.ts")!;
const protection = transpile(protectionContent, tsconfig.options);

runInThisContext(
    protection + "\n\nObject.assign(this, { DataValidationProtection });"
);

describe("DataValidationProtection", () => {
    it.skip("should list protections correctly", () => {});

    it.skip("should get protections by column correctly", () => {});

    it.skip("should get protections by row correctly", () => {});

    it.skip("should protect validations correctly", () => {});

    it.skip("should unprotect validations correctly", () => {});

    it.skip("should add editors to column correctly", () => {});

    it.skip("should remove editors from column correctly", () => {});

    it.skip("should add editors to row correctly", () => {});

    it.skip("should remove editors from row correctly", () => {});

    it.skip("should remove all editors from protections correctly", () => {});

    it.skip("should protect columns except blacklisted indices", () => {});
});
