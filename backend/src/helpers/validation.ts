import Joi from "@hapi/joi";

export const loginSchema = Joi.object({
  email: Joi.string()
    .regex(/\S+@\S+\.\S+/)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "co", "net"] } }),
  password: Joi.string().trim().required().min(6),
});
