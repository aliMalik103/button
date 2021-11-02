import React from 'react';
import  "./styles/tag-container.css";
const TagContainer = ({ data, onTagDelete }) => {
    return (
        <div className="tag-container">
            {data.map((item) => {
                return <div className="tag" key={item.id}><div className="tag--close" onClick={() => onTagDelete(item.id)}></div>{item.text}</div>
            })}
        </div>
    );
}
export default TagContainer;
