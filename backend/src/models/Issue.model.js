const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      maxlength: 500,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Roads",
        "Lighting",
        "Water Supply",
        "Cleanliness",
        "Public Safety",
        "Obstructions",
      ],
    },

    status: {
      type: String,
      enum: ["Reported", "In Progress", "Resolved"],
      default: "Reported",
    },

    // Manual location (no GPS)
    location: {
      address: {
        type: String,
        required: true,
      },
      area: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
      },
    },

    images: [
      {
        type: String, // Cloudinary URLs later
      },
    ],

    // Clerk user id (string)
    reportedBy: {
      type: String,
      required: false, // anonymous allowed
    },

    isAnonymous: {
      type: Boolean,
      default: false,
    },

    isHidden: {
      type: Boolean,
      default: false, // auto-hide on spam flags later
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.models.Issue || mongoose.model("Issue", issueSchema);
