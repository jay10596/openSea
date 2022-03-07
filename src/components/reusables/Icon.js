import React, { useEffect, useState } from "react";
import Avatar from "boring-avatars";

function Icon() {
    useEffect(() => {
        setRandomColors()
    }, [])

    // State variables
    const [colors, setColors] = useState();

    const setRandomColors = () => {
        const randomColors = []

        for(var i = 0; i < 2; i++) {
            randomColors.push("#" + (Math.floor(Math.random() * 16777215).toString(16))) // Random color code
        }

        // Bind values
        setColors(randomColors)
    }

    return (
        <Avatar
            size={40}
            name="Anne Bradstreet"
            variant="marble"
            colors={colors}
        />
    );
}

export default Icon;