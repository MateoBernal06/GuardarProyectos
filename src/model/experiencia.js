const { Schema, model } = require("mongoose");

const ExperienciaSchema = new Schema(
  {
    organization: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    start: {
      type: String,
      required: true,
    },
    finish: {
      type: String,
      required: true,
    },
    responsibilities: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model("Experiencia", ExperienciaSchema);
