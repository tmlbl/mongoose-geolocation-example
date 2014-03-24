module.exports = function (Schema, mongoose) {
  var PostSchema = new Schema({
    body: { type: String },
    loc: { type: { type: String }, coordinates: [ ] }
  });
  PostSchema.index({ loc: '2dsphere' });
  return mongoose.model('Post', PostSchema);
};