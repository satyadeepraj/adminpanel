import mongoose from "mongoose";
import BlogPost from "./BlogModel";
import bcrypt from "bcrypt";
// Product Schema
const productSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  projectName: {
    type: String,
  },
  scopeUrl: {
    type: String,
  },
  type: {
    type: String,
  },
  startDate: {
    type: Date,
    default: null,
  },
  endDate: {
    type: Date,
    default: null,
  },
  images: [{ type: String }],
  // Add BlogPost as a subdocument or an array of subdocuments
  reports: [{blogId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogPost",
  }}],
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// Hash the password before saving the product document
productSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
