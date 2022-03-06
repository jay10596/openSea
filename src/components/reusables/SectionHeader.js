import React from 'react';

const SectionHeader = (props) => {
    return (
        <h6 className="text-center">{props.heading} <span>{props.highlight}</span> </h6>
    );
};

export default SectionHeader;
