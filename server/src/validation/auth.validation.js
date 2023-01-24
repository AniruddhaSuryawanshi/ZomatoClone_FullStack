import express from "express";
import Joi from "joi";

export const ValidateSignup = (userData) => {
  const Schema = Joi.object({
    fullName: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    address: Joi.array()
      .items(Joi)
      .object({ details: Joi.string(), for: Joi.string() }),
    phoneNumber: Joi.array().items(joi.number().min(10).max(10)),
  });
  return Schema.validateAsync(userData);
};

export const ValidateSignin = (userData) => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  return Schema.validateAsync(userData);
};
