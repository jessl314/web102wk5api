import React from 'react'
import "./AttributeDisplay.css"

function AttributeDisplay({attributes}) {
    return (
        <div className="attributes">
            {attributes.map((attr, index) => {
                return (
                <div key={index} className="attr-rect">   
                <p>{attr.label}: {attr.value}</p>
                </div>
                );
            })}

        </div>
    )
}

export default AttributeDisplay;