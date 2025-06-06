import express from 'express' 
import bodyParser from 'body-parser'
import cors from 'cors'
import {db} from '../services/firebase.js'; // Import Firebase auth functions
import { doc, getDoc, setDoc } from 'firebase/firestore';
export const Router = express.Router()

Router.delete("/:uid/:projName",(req,res)=>{
    
    const {uid,projName} = req.params;
    const data = doc(db,"projects",uid);
    getDoc(data).then(d=>{
        if(d.exists()){
            const projects = d.data();
            if(projects?.[projName]){
                delete projects?.[projName];
                setDoc(data,projects)
                res.status(201).json(projects)
            }else{
                res.status(500).send("no project named "+projName)
            }
        }else{
            res.status(204).json({})
        }
    }).catch(e=>{
        res.status(500).send("Error: "+e)
     }
    )
})
Router.get("/:uid",(req,res)=>{
    const {uid} = req.params;
    const data = doc(db,"projects",uid);
    getDoc(data).then(d=>{
        if(d.exists()){
            res.status(200).json(d.data())
        }else{
            res.status(204).json({})
        }
    }).catch(e=>{
        res.status(500).send("Error: "+e)
     }
    )
})


Router.post("/",(req,res)=>{
    const data = doc(db,"projects",req.body.user.uid);
    
    getDoc(data).then(d=>{
        if(d.exists()){
            setDoc(data,{
                ...d.data(),
                [req.body.project.name]:req.body.project
            }) 
        }else{
           setDoc(data,{[req.body.project.name]:req.body.project}) 
        }
        res.status(201).send("Saved!")
    }).catch(e=>{
       res.status(500).send("Error: "+e)
    })
    
});

