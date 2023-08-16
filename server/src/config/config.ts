import joi from 'joi';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = joi
	.object()
	.keys({
		ENV: joi.string().valid('development', 'production').required(),
		MONGO_URI: joi.string().required(),
		CLIENT_URL: joi.string().required(),
		JWT_SECRET_KEY: joi.string().min(32).required(),
		CLOUDINARY_CLOUD_NAME: joi.string().required(),
		CLOUDINARY_API_KEY: joi.string().required(),
		CLOUDINARY_API_SECRET: joi.string().required()
	})
	.unknown();

const { value: envVars, error } = envSchema
	.prefs({ errors: { label: 'key' } })
	.validate(process.env);

if (error) throw new Error(`config validation error: ${error.message}`);

export const env = envVars.ENV;
export const mongoUri = envVars.MONGO_URI;
export const clientUrl = envVars.CLIENT_URL;
export const jwtSecretKey = envVars.JWT_SECRET_KEY;
export const cloudinaryCloudName = envVars.CLOUDINARY_CLOUD_NAME;
export const cloudinaryApiKey = envVars.CLOUDINARY_API_KEY;
export const cloudinaryApiKeySecret = envVars.CLOUDINARY_API_SECRET;
