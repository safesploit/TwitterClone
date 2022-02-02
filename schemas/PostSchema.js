/***
 * @summary
 * 
 * MongoDB is has its own Schemas. Hence,
 * postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
 * 
 * Which allows us to specify Schema.Types.ObjectId, and use ObjectId 
 * as opposed to getting Username associated with the post. 
 *  
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    content: { type: String, trim: true },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    pinned: { type: Boolean },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    retweetUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    retweetData: { type: Schema.Types.ObjectId, ref: 'Post' },
    replyTo: { type: Schema.Types.ObjectId, ref: 'Post' }
}, { timestamps: true });

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;