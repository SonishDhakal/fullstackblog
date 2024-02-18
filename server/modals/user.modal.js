import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,

    },
    profilePicture:{
        type:String,
        default: 'https://firebasestorage.googleapis.com/v0/b/fullstackblogapp.appspot.com/o/user.png?alt=media&token=ae55119c-08d8-48c6-9077-0428916e2503'


    },
    emailVerified:{
        type:Boolean,
        default:false
    },
    onBoardingComplete:{
        type:Boolean,
        default:false
    },
    bookmarks:{
        type:Array,
        default:[]
    },
    likes:{
        type:Array,
        default:[]
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },

    
},{timestamps:true})



const User = mongoose.model('User', userSchema);

export default User