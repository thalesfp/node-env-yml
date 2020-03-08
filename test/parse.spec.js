const parse = require("../src/parse");

describe("parse", () => {
  it("should override default variables by env variables", () => {
    const object = {
      DATABASE_HOST: "127.0.0.1",
      DATABASE_USER: "root",
      DATABASE_TIMEOUT: 60,
      test: {
        DATABASE_USER: "test-user",
      },
      development: {
        DATABASE_USER: "dev-user",
        TRACING_ENABLED: true,
      },
    };
    const env = "development";

    expect(parse(object, env)).toStrictEqual({
      DATABASE_HOST: "127.0.0.1",
      DATABASE_USER: "dev-user",
      DATABASE_TIMEOUT: 60,
      TRACING_ENABLED: true,
    });
  });
});
