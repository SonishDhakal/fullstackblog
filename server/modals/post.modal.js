

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
        type:String,
        default:'https://firebasestorage.googleapis.com/v0/b/fullstackblogapp.appspot.com/o/default.jpg?alt=media&token=872aaa22-28c9-4252-804e-9dfc7736e377'
    },
    username:{
        type:String
    },
    likes:{
        type:Array
    }

   
},{timestamps:true})


const Post = mongoose.model('Post', postScheam);
export default Post