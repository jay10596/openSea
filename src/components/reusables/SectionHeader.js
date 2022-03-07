import React from "react";

const SectionHeader = (props) => {
    return (
        <h5 className="section-header text-center">{props.heading} <span>{props.highlight}</span></h5>
    );
};

export default SectionHeader;
