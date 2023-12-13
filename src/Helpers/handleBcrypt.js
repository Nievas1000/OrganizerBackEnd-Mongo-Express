const bcrypt = require("bcrypt");

const encrypt = async (fieldToEncrypt) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(fieldToEncrypt, salt);
  return hash;
};

const compare = async (plainField, hashField) => {
  return await bcrypt.compare(plainField, hashField);
};

module.exports = {
  encrypt,
  compare,
};
