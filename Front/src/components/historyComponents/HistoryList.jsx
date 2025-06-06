import { React, useContext, useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { darkModeContext } from "../../App.jsx"
import axios from 'axios';
import {
    historyListContainer,
    historyItemContainer,
    historyItemText,
    historyButtonsContainer,
    historyOpenButton,
    historyDeleteButton,
    historyLoadingContainer,
    historyLoadingSpinner,
    historyEmptyContainer,
    historyCreateButton
} from '../../assets/Style.jsx';

export default function HistoryList() {
    const { darkMode } = useContext(darkModeContext);
    const { user } = useOutletContext();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (user) {
            axios.get(`/api/projects/${user.uid}`).then((res) => {
                setProjects(Object.values(res.data))
                setLoading(false)
                console.log(res);
            }).catch((e) => {
                console.log("error: ", e);
            })
        }
    }, [user])

    //   useEffect(() => {
    //     // Project data with name and text
    //     const fakeProjects = [
    //       {
    //         name:'getting started',
    //   loadEdges: [
    //     {
    //       id: "Student-Person",
    //       source: "Student",
    //       target: "Person",
    //       type: "step",
    //       markerEnd: {
    //         type: "arrowclosed",
    //         width: 60,
    //         height: 60,
    //         color: "#c53030"
    //       }
    //     },
    //     {
    //       id: "Lecturer-Person",
    //       source: "Lecturer",
    //       target: "Person",
    //       type: "step",
    //       markerEnd: {
    //         type: "arrowclosed",
    //         width: 60,
    //         height: 60,
    //         color: "#c53030"
    //       }
    //     },
    //     {
    //       id: "Course-Student",
    //       source: "Course",
    //       target: "Student",
    //       type: "labelled",
    //       markerEnd: {
    //         width: 20,
    //         height: 20,
    //         color: "#000000"
    //       },
    //       data: {
    //         startLabel: "1",
    //         endLabel: "*"
    //       }
    //     },
    //     {
    //       id: "Course-Lecturer",
    //       source: "Course",
    //       target: "Lecturer",
    //       type: "labelled",
    //       markerEnd: {
    //         width: 20,
    //         height: 20,
    //         color: "#000000"
    //       },
    //       data: {
    //         startLabel: "1",
    //         endLabel: "1"
    //       }
    //     }
    //   ],
    //   loadNodes: [
    //     {
    //       id: "Person",
    //       data: {
    //         className: "Person",
    //         attributes: ["name", "age", "height", "weight"],
    //         methods: [
    //           { run: [] },
    //           { jump: ["howFar", "howHigh"] },
    //           { speak: ["sentence"] }
    //         ],

    //       },
    //       position: { x: -37.31, y: 464.32 },
    //       measured: { width: 300, height: 328 }
    //     },
    //     {
    //       id: "Student",
    //       data: {
    //         childClass: "Student",
    //         attributes: ["major", "yearStarted"],
    //         methods: [
    //           { study: ["subject"] }
    //         ],

    //       },
    //       position: { x: 221.11, y: 181.03 },
    //       measured: { width: 300, height: 216 }
    //     },
    //     {
    //       id: "Lecturer",
    //       data: {
    //         childClass: "Lecturer",
    //         attributes: [],
    //         methods: [{ teach: [] }],

    //       },
    //       position: { x: -284.67, y: 225.25 },
    //       measured: { width: 300, height: 152 },
    //     },
    //     {
    //       id: "Course",
    //       data: {
    //         className: "Course",
    //         attributes: [],
    //         methods: [],
    //       },
    //       position: { x: -84.30, y: -64.95 },
    //       measured: { width: 300, height: 124 }
    //     },
    //     {
    //       id: "Grade",
    //       data: {
    //         className: "Grade",
    //         attributes: ["grade", "dateGiven"],
    //         methods: [],
    //       },
    //       position: { x: 345.48, y: -187.94 },
    //       measured: { width: 300, height: 188 }
    //     }
    //   ],
    //   loadKnownPositions: {
    //     "Grade": { x: 345.48, y: -187.94 },
    //     "Course": { x: -84.30, y: -64.95 },
    //     "Lecturer": { x: -284.67, y: 225.25 },
    //     "Student": { x: 221.11, y: 181.03 },
    //     "Person": { x: -37.31, y: 464.32 }
    //   },
    //   loadText: `# class definition: a/an __ is a class.
    // a Person is a class.

    // #  attribute definition: __ has __, __, ..., __.
    // Person has name, age, height, weight.

    // # method decleration: __ can __.
    // Person can run.

    // # method(params) decleration: __ can __ with __, __, ..., __.
    // Person can jump with howFar, howHigh. 
    // Person can speak with sentence.

    // # class definition with inheritence: a/an __ is a/an __.
    // a Student is a Person.
    // Student has major, yearStarted.
    // Student can study with subject.

    // a Lecturer is a Person.
    // Lecturer can teach.

    // a Course is a class.
    // a Grade is a class.
    // Grade has grade, dateGiven.

    // # relation : one/many __ is related to one/many __.
    // one Course is related to many Student.
    // one Course is related to one Lecturer.`
    //     },      
    //   { name: 'proj2', text: 'a student is a class.' },
    //     //   { name: 'proj3', text: 'A teacher has students.' },
    //     //   { name: 'proj4', text: 'An employee works at a company.' },
    //     //   { name: 'proj5', text: 'A manager manages employees.' }
    //     ];
    //     // const fakeProjects = [];
    //     // Simulate fetching data
    //     setTimeout(() => {
    //       setProjects(fakeProjects);
    //       setLoading(false);
    //     }, 500);
    //   }, []); // Empty dependency array as fakeProjects is now inside the effect

    if (!user) {
        return (
            <div >
                <span>Please log in to view your projects.</span>
            </div>
        );
    }


    if (loading) {
        return (
            <div className={historyLoadingContainer}>
                <div className={historyLoadingSpinner}></div>
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className={historyEmptyContainer(darkMode)}>
                <p>No projects found.</p>
                <Link to="/app">
                    <button className={historyCreateButton(darkMode)}>
                        Create Project
                    </button>
                </Link>
            </div>
        );
    }
    return (
        <div className={historyListContainer}>
            {projects.map((project, index) => (
                <div key={index} className={historyItemContainer(darkMode)}>

                    <div className={historyButtonsContainer}>
                        {project.image && (
                            <img src={project.image} width={'200px'} 
                            alt={`${project.name} thumbnail`}
                        className="rounded-lg" />
                        )}
                        <span className={historyItemText(darkMode)}>
                            {project.name}
                        </span>
                    </div>
                    <div className={historyButtonsContainer}>
                        <Link to="/app" state={{ ...project }}>
                            <button className={historyOpenButton(darkMode)}>
                                Open
                            </button>
                        </Link>
                        <button
                            className={historyDeleteButton(darkMode)}
                            onClick={() => {
                                axios.delete(`api/projects/${user.uid}/${project.name}`).then(res => setProjects(Object.values(res.data))).catch(e => { console.log(e); })
                            }
                            }
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}