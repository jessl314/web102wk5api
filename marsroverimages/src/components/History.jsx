import React from 'react';

import './History.css'

const History = ({history}) => {
    return (
        <div className='history'>
            <h4>Image History</h4>
            <div className='list'>
                {history.map((img, index) => (
                <img key={index} src={img} alt={`History ${index}`} className="history-thumbnail" />
                ))}
            </div>
        </div>
    );
};

export default History;