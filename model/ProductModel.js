import mongoose from "mongoose";
import BlogPost from "./BlogModel";

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
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
