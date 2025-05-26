import React from 'react';
import { getSmoothStepPath, EdgeLabelRenderer, BaseEdge, getBezierPath} from '@xyflow/react';

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

export default function LabelledEdge({ id,
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        data}) {
        const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition});   
        return (
            <>
                <BaseEdge id={id} path={edgePath} />
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