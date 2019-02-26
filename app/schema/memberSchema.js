const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/member', {
  useNewUrlParser: true
});

let MemberSchema = mongoose.Schema;

let memberSchema = new MemberSchema({
  info: {
    type: Object,
    require: true
  },
  delete: {
    type: Number,
    default: 0
  }
});
const Member = mongoose.model('Member', memberSchema);

module.exports = Member