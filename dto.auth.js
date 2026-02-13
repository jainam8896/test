import Joi from "joi";


export const registerDto = Joi.object().keys({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});


export const loginDto = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const verifyOtpDto = Joi.object().keys({
  type: Joi.number().valid(1, 2).required(),
  role: Joi.number().valid(1, 2).required(),
  mobileNumber: Joi.number().required(),
  countryCode: Joi.string().required(),
  otp: Joi.number().required().messages({
    "string.empty": "OTP Required",
  }),
})

export const resendOtpDto = Joi.object().keys({
  role: Joi.number().valid(1, 2).required(),
  mobileNumber: Joi.number().required(),
  countryCode: Joi.string().required(),
  type: Joi.number().valid(1, 2).required(),
})

export const refresh_token = Joi.object().keys({
  token: Joi.string().trim().required().messages({
    "string.empty": "token Required",
  }),
});

export const versionDto = Joi.object().keys({
  version: Joi.string().required()
})

export const forgetPasswordDto = Joi.object().keys({
  role: Joi.number().valid(1, 2).required(),
  mobileNumber: Joi.number().required(),
  countryCode: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmPassword: Joi.string().required(),
})
