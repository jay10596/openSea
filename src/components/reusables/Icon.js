import React from 'react';
import Avatar from "boring-avatars";

function Icon() {
    const randomColors = []
    const colorCode = () => {
        return '#' + Math.floor(Math.random()*16777215).toString(16)
    }

    for(let i = 0; i <= 2; i++) {
        randomColors.push(colorCode())
    }

    return (
        <Avatar
            size={40}
            name="Sarah Winnemucca"
            variant="marble"
            colors={randomColors}
        />
    );
}

export default Icon;