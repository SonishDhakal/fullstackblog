import mongoose from 'mongoose'

const codeSchmea = new mongoose.Schema({
    code:{
       type: String,
       required:true,
       
    }
},{timestamps:true})

const Code = mongoose.model('Code', codeSchmea)

export default Code