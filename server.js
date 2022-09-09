const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const multer=require('multer');
const Image=require('./image');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
mongoose.connect(
    'mongodb://localhost:27017/IMAGE-UPLOADING',
{ useNewUrlParser:true}
)
.then(()=>console.log("db is connected"))
.catch((err)=>console.log(err,"It has an error"));
const Storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,filr,cb)=>{
        cb(null,file.originalname);
    },
});
const upload=multer({
    storage:Storage
}).single('textImage')
app.get("/",(req,res)=>{
    res.send("upload file");
});
app.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newImage=new ImageModels({
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png || image/jpg'
        
                }
   
            })
            newImage.save()
                .then(()=>res.send('successfully uploaded')).catch(err=>console.log(err));
        }
    })
})
app.listen(3000,function(){
    console.log("Server is running on port 3000");
})