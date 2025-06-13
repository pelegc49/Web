// LabelledEdge.jsx: Custom edge component for ReactFlow with labels at start and end
import React from 'react';
import { getSmoothStepPath, EdgeLabelRenderer, BaseEdge, getBezierPath} from '@xyflow/react';

// EdgeLabel: Renders a label at a given transform position
function EdgeLabel({ transform, label }){
    return (
    <div
        className={"nodrag nopan bg-['#ffff'] text-red-700 text-[20px] font-bold px-[10px'] py-['5px] "}
        style={{ transform }}
        >
      {label}
    </div>
  );
}

// LabelledEdge: Draws a smooth edge with optional start and end labels
export default function LabelledEdge({ id,
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        data}) {
        // Calculate the edge path using smooth step
        const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition});   
        return (
            <>
                {/* Draw the main edge */}
                <BaseEdge id={id} path={edgePath} />
                {/* Render labels at the start and end of the edge, if present */}
                <EdgeLabelRenderer>
                {
                    data.startLabel &&(
                        <EdgeLabel
                            // transform={`-translate-x-1/2 translate-x-${sourceX} translate-y-${sourceY}`}
                            transform={`translate(${sourceX+5}px,${sourceY}px)`}
                            label={data.startLabel}
                        />
                    )
                }
                {
                    data.endLabel && (
                        <EdgeLabel
                            // transform={`-translate-x-1/2 -translate-x-full translate-x-[${targetX}px] translate-y-[${targetY}px]`}
                            transform={`translate(${-15+targetX}px,${-55+targetY}px)`}
                            label={data.endLabel}
                        />
                    )
                }
                </EdgeLabelRenderer>
            </>
        )
  }