import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../helpers/reducers/Theme';

import Switch from "react-switch";

function ToogleSwitch() {
    const dispatch = useDispatch()

    const theme = useSelector((state) => state.theme)
    
    // State variables
    const [checked, setChecked] = useState(false);

    // Bind values
    const handleChange = () => {
        setChecked(!checked)
        dispatch(setTheme({ color: theme === 'light' ? 'dark' : 'light' }))
    };
    
    return (
        <Switch 
            onChange={handleChange} 
            checked={checked} 
            offColor={'#454545'}
            onColor={'#2081E2'}
            uncheckedIcon={false}
            checkedIcon={false}
        />
    );
}

export default ToogleSwitch;