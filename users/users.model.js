import mongoose from 'mongoose';

const Schema = mongoose.Schema;
let user = new Schema({
    name: {type: String, required: true}
});

export default mongoose.model('Users', user);