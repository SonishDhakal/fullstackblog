import mongoose from 'mongoose'


const profileSchema = new mongoose.Schema({
    userId:{
        type:String,
        required: true,
        unique:true

    },
    firstName:{
        type:String,
        required: true,

    },
    lastName:{
        type:String,
        required: true,

    },

    socialLinks:{
        default:[],
        type:Array
    },
    profilePicture:{
        type:String,
        default: 'https://firebasestorage.googleapis.com/v0/b/fullstackblogapp.appspot.com/o/user.png?alt=media&token=ae55119c-08d8-48c6-9077-0428916e2503'


    },
    bio:{
        type:String
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
    featured:{
        type:Array,
        default:[]
    },
    about:{
        type:String,
        default:''

    },
    socials:{
        type:Object,
        default:{}
        
    },
    gender:{
        type:String
    }
   


    
},{timestamps:true})



const Profile = mongoose.model('Profile', profileSchema);

export default Profile