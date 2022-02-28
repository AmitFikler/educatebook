import cloudinary from 'cloudinary';
import config from '../config';

cloudinary.v2.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
  secure: true,
}); // cloudinary config

exports.uploadPhoto = async (file: any) => {
  try {
    const result = await cloudinary.v2.uploader.upload(file);
    return result;
  } catch (error) {
    throw error;
  }
};
