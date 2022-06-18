import React, { useState } from 'react'
import "../css/ResultItem.css"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Tooltip from '@mui/material/Tooltip';

const ResultItem = ({ data }) => {
    const [isHover, setHover] = useState(false);
    const toggleOnHover = () => {
        setHover(true);
    }
    const toggleOffHover = () => {
        setHover(false);
    }

    const openURL = () => {
        window.open(data.domain, '_blank')?.focus();
    }

    return (
        <div className='resultItem'>
            <div className={isHover ? 'resultText border-hover' : 'resultText border-normal'} >
                <p>{data.answer}</p>
            </div>
            <Tooltip title={data.domain} arrow>
                <div className={isHover ? 'naviIcon border-hover' : 'naviIcon border-normal'}
                    onMouseEnter={toggleOnHover}
                    onMouseLeave={toggleOffHover}
                    onClick={openURL}>
                    <NavigateNextIcon />
                </div>
            </Tooltip>

        </div>
    )
}

export default ResultItem