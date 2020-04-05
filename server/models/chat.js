const chatSchema = new Schema(
  {
    playerAmessages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    playerBmessages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
