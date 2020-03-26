const fs = require("fs");
const path = require("path");

const load = require("../src/load");

const configFilePath = path.join(path.dirname(__filename), "app.yml");

const resetEnvVars = () =>
  ["DATABASE_HOST", "DATABASE_PORT", "DATABASE_USER"].forEach(
    (key) => delete process.env[key],
  );

describe("load", () => {
  beforeEach(() => {
    resetEnvVars();
    jest.resetAllMocks();
  });

  it("should load parsed values to process env", () => {
    expect.assertions(3);

    load({ path: configFilePath });

    expect(process.env["DATABASE_HOST"]).toEqual("127.0.0.1");
    expect(process.env["DATABASE_PORT"]).toEqual("5432");
    expect(process.env["DATABASE_USER"]).toEqual("user-test");
  });

  it("should load yml file .app.yml by default", () => {
    expect.assertions(1);

    const readFileSyncSpy = jest.spyOn(fs, "readFileSync");
    readFileSyncSpy.mockImplementation();

    load();

    expect(readFileSyncSpy).toHaveBeenNthCalledWith(1, ".app.yml", "utf8");

    readFileSyncSpy.mockRestore();
  });

  it("should have development as default node environment", () => {
    expect.assertions(3);

    delete process.env.NODE_ENV;

    load({ path: configFilePath });

    process.env.NODE_ENV = "test";

    expect(process.env["DATABASE_HOST"]).toEqual("127.0.0.1");
    expect(process.env["DATABASE_PORT"]).toEqual("5432");
    expect(process.env["DATABASE_USER"]).toEqual("user-dev");
  });

  it("should load yml file using a alternative encoding", () => {
    expect.assertions(1);

    const readFileSyncSpy = jest.spyOn(fs, "readFileSync");

    load({ path: configFilePath, encoding: "latin1" });

    expect(readFileSyncSpy).toHaveBeenNthCalledWith(
      1,
      configFilePath,
      "latin1",
    );
  });
});
