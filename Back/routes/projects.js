// projects.js
// This file defines Express routes for managing user projects in Firestore.
// It supports creating, retrieving, and deleting projects for a given user.

import express from 'express' 
import bodyParser from 'body-parser'
import cors from 'cors'
import {db} from '../services/firebase.js'; // Firestore database instance
import { doc, getDoc, setDoc } from 'firebase/firestore';
export const Router = express.Router()

// Delete a project for a user by project name
Router.delete("/:uid/:projName",(req,res)=>{
    const {uid,projName} = req.params;
    const data = doc(db,"projects",uid);
    getDoc(data).then(d=>{
        if(d.exists()){
            const projects = d.data();
            if(projects?.[projName]){
                delete projects?.[projName]; // Remove the project from the user's project object
                setDoc(data,projects) // Update Firestore document
                res.status(201).json(projects)
            }else{
                res.status(500).send("no project named "+projName)
            }
        }else{
            res.status(204).json({}) // No projects found for this user
        }
    }).catch(e=>{
        res.status(500).send("Error: "+e)
     }
    )
})

// Get all projects for a user by UID
Router.get("/:uid",(req,res)=>{
    const {uid} = req.params;
    const data = doc(db,"projects",uid);
    getDoc(data).then(d=>{
        if(d.exists()){
            res.status(200).json(d.data()) // Return all projects for the user
        }else{
            res.status(204).json({}) // No projects found
        }
    }).catch(e=>{
        res.status(500).send("Error: "+e)
     }
    )
})

// Create or update a project for a user
Router.post("/",(req,res)=>{
    const data = doc(db,"projects",req.body.user.uid);
    getDoc(data).then(d=>{
        if(d.exists()){
            // Merge new project with existing projects
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

