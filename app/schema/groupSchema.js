const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/group', {
  useNewUrlParser: true
});

let GroupSchema = mongoose.Schema;

let groupSchema = new GroupSchema({
  list: {
    type: Array,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  delete: {
    type: Number,
    default: 0
  }
});
const Group = mongoose.model('Group', groupSchema);

module.exports = Group