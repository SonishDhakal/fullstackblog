

import mongoose from 'mongoose'



const postScheam = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true

    },

    published:{
        type:String,
        default: true
    },
    slug:{
        type:String,


    },
    title:{
        type:String,

    },
    content:{
        type:String,

    },
    category:{
        type:String,
        default:'uncategorized'

    },
    tags:{
        type:Array,
        default: []

    },
    featuredImage:{
        type:String
    },
    username:{
        type:String
    }

   
})


const Post = mongoose.model('Post', postScheam);
export default Post