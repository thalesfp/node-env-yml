const fs = require("fs");
const yaml = require("js-yaml");

const parse = require("./parse");

const defaultConfigPath = ".app.yml";
const defaultEncoding = "utf8";
const defaultEnv = "development";

/**
 * Load yml file considering options configuration.
 * @param {Object} options - options for parse yml file
 * @param {String} [options.path=.app.yml] - path to yml file
 * @param {String} [options.encoding=utf8] - encoding of yml file
 * @param {String} [options.env=development] - enviroment section
 */
const load = (options = {}) => {
  const configPath = options.path ? options.path : defaultConfigPath;
  const encoding = options.encoding ? options.encoding : defaultEncoding;
  const env = process.env.NODE_ENV ? process.env.NODE_ENV : defaultEnv;

  const doc = yaml.safeLoad(fs.readFileSync(configPath, encoding));
  const parsedObject = parse(doc, env);

  Object.keys(parsedObject).forEach((key) => {
    if (!(key in process.env)) {
      process.env[key] = parsedObject[key];
    }
  });
};

module.exports = load;
