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
      Question = mongoose.Model("Question", QuestionSchema),
      sortAnswers = (a,b) => {
          //- negative a before b
          //0 no change
          //+ positive a after b
          if (a.votes === b.votes) {
              return b.updateddAt - a.updateddAt;
            }
            return b.votes - a.votes;
          }

QuestionSchema.pre('save', function(next) {
    this.answers.sort(sortAnswers);
    next();
})

AnswerSchema.method('update', function(updates, callback) {
    Object.assign(this, updates, {updateddAt: new Date()});
    this.parent().save(callback);
});

AnswerSchema.method('vote', function(vote, callback) {
    if(vote === 'up') {
        this.votes += 1;
    } else {
        this.votes -= 1;
    }
    this.parent().save(callback);
})

module.exports.Question = Question;