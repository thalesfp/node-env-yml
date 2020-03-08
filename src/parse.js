/**
 * Parse object keys overrinding default keys with env keys
 * @param {Object} object - object to be parsed
 * @param {String} env - env section
 * @returns {Object} - object parsed
 */
const parse = (object, env) => {
  const parsedObject = {};

  Object.keys(object).forEach(key => {
    if (typeof object[key] === "object") {
      if (key === env) {
        Object.keys(object[key]).forEach(keyObject => {
          parsedObject[keyObject] = object[key][keyObject];
        });
      }
    } else {
      parsedObject[key] = object[key];
    }
  });

  return parsedObject;
};

module.exports = parse;
