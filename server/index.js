const express=require('express')
const mysql=require('mysql')
const app=express()
const cors=require('cors')
const multer=require('multer')
app.listen(3000)
app.use(express.json())
app.use(cors())

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'Uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mern'
})

const upload=multer({storage:storage})

app.post('/upload',upload.single("file"),async(req,res)=>{
    try{
        if(req.file){
            res.send({
                status:true,
                message:"File successfully uploaded"
            })
            const file3=req.file.destination
            const file2=req.file.filename

            const sql="insert into fupload (fpath) values (?)"
            con.query(sql,[file3]+[file2],function(err,res){
                if(err){
                    console.log("insert failed")
                }else{
                    console.log("insert successfull")
                }
            })
        }else{
            res.status(400).send({
                status:false,
                message:"File not found"
            })
        }
    }
    catch(err){
        res.status(500).send(err)
    }
})