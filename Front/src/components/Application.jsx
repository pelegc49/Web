import React from 'react'
import TextArea from './TextArea.jsx'
import {ReactFlow, Background, useEdgesState, useNodesState} from '@xyflow/react'
import "@xyflow/react/dist/style.css"
export default function Application() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    function handleChange(){
        
    }
  return (
    <div className='flex'>
        <div className='w-[25%]'>
            <TextArea onContentChange={handleChange}/>
        </div>
        <div className='w-[75%]'>
            <ReactFlow nodes={nodes} edges={edges}>
                <Background/>
            </ReactFlow>
        </div>
    </div>
  )
}


