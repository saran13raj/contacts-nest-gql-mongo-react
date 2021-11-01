import * as mongoose from 'mongoose';

export const ContactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  picture: String,
  info: Object,
});
