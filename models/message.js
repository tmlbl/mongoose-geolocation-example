module.exports = function (Schema, mongoose) {
  var MessageSchema = new Schema({
    body: { type: String },
    loc: { type: { type: String }, coordinates: [ ] }
  });
  MessageSchema.index({ loc: '2dsphere' });
  return mongoose.model('Message', MessageSchema);
};