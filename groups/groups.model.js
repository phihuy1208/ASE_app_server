import mongoose from "mongoose"

const Schema = mongoose.Schema
let group = new Schema({
    name: {type: String, required: true},
    owner: {type: String, required: true},
    co_owners: [String],
    members: [String],
})

export default mongoose.model('Groups', group)