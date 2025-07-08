import React from 'react'
import "./AttributeDisplay.css"

function AttributeDisplay({attributes, onClick}) {
    return (
        <div className="attributes">
            {attributes.map((attr, index) => {
                return (
                <div 
                key={index}
                className="attr-rect"
                onClick={() => onClick(attr)}
                >
                <p>{attr.label}: {attr.value}</p>
                </div>
                );
            })}

        </div>
    )
}

export default AttributeDisplay;