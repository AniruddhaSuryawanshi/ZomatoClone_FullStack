import express from "express";
import Joi from "joi";

export const ValidateId = (id) => {
  const Schema = Joi.object({
    _id: Joi.string().required(),
  });
  return Schema.validateAsync(id);
};

export const ValidateCategory = (category) => {
  const Schema = Joi.object({
    category: Joi.string().required(),
  });
  return Schema.validateAsync(category);
};

export const ValidateSearchString = (searchString) => {
  const Schema = Joi.object({
    searchString: Joi.string().required(),
  });
  return Schema.validateAsync(searchString);
};
