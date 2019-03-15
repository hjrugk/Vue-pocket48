const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/group', {
  useNewUrlParser: true
});

let MemberSchema = mongoose.Schema;

let memberSchema = new MemberSchema({
  mid: {
    type: Number,
    require: true
  },
  info: {
    type: Object,
    require: true
  }
});
const Member = mongoose.model('Member', memberSchema);

module.exports = Member