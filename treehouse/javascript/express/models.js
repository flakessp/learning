const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      AnswerSchema = new Schema({
          text: String,
          createdAt: {type: Date, default: Date.now},
          updateddAt: {type: Date, default: Date.now},
          votes: {type: Number, default: 0}
      }),
      QuestionSchema = new Schema({
          text: String,
          createdAt: {type: Date, default: Date.now}, // auto Date creation
          answers: [AnswerSchema]
      }),
      Question = mongoose.Model("Question", QuestionSchema);

module.exports.Question = Question;