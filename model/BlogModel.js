import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  vulnerability: {
    type: String,
  },
  severity: {
    type: String,
    enum: ["Critical", "High", "Medium", "Low"],
  },
  images: [{ type: String }],
});


const authorSchema = new mongoose.Schema({
  preparedby: {
    type: String,
  },
  approvedby: {
    type: String,
  },
  dateOfTesting: {
    type: Date,
    default: null,
  },
  dateOfTestingCompletion: {
    type: Date,
    default: null,
  },
  dateOfApproval: {
    type: Date,
    default: null,
  },
});

const blogPostSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  documentype: {
    type: String,
  },
  documentversion: {
    type: String,
  },
  dateOfReport: {
    type: Date,
  },
  maintitle: {
    type: String,
  },
  maincontent: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Open", "PendingForReview", "PendingForApproval", "Closed"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  datePublished: {
    type: Date,
    default: Date.now,
  },

  images: [{ type: String }],
  author: [authorSchema],
  sections: [sectionSchema],
});

const BlogPost =
  mongoose.models.BlogPost || mongoose.model("BlogPost", blogPostSchema);

export default BlogPost;
