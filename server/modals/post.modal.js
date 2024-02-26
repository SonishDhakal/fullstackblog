
import { type } from 'express/lib/response'
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
        required:true,
        unique:true,
    },
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    tags:{
        type:Array,
        default: []

    },
    featuredImage:{
        type:String
    }

   
})


const Post = mongoose.model('Post', postScheam);
export default Post