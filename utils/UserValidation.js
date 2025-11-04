const Joi = require("joi");

function validateUserSchema(res) {
  const schemaObject = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().required(),
  });
  return schemaObject.validate(res);
}
function validateSignin(res) {
  const schemaObject = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().required(),
  });
  return schemaObject.validate(res);
}
function validateUserEmail(res) {
  const schemaObject = Joi.object({
    email: Joi.string().email(),
  });
  return schemaObject.validate(res);
}
function validateUserPassword(res) {
  const schemaObject = Joi.object({
    password: Joi.string().required(),
  });
  return schemaObject.validate(res);
}

module.exports= {validateUserSchema,validateUserEmail,validateUserPassword,validateSignin}

