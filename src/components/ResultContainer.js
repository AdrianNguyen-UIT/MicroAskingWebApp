import React from 'react'
import "../css/ResultContainer.css"
import ResultItem from './ResultItem'

const ResultContainer = ({ results }) => {
    return (
        <div className='resultContainer'>
            {
                results.map((value, index) => {
                    return <ResultItem key={index} data={value} />
                })
            }
        </div>
    )
}

export default ResultContainer