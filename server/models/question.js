const questionSchema = new Schema(
  {
    optionA: String,
    optionB: String,
    factor: Number,
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
