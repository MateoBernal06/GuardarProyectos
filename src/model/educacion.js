const { Schema, model } = require("mongoose");

const EducacionSchema = new Schema(
  {
    place: {
      type: String,
      required: true,
    },
    career: {
      type: String,
      required: true,
    },
    start: {
      type: Number,
      required: true,
    },
    finish: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

module.exports = model("Educacion", EducacionSchema);
