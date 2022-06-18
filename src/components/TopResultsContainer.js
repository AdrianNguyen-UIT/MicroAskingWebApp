import React from 'react'
import "../css/TopResultsContainer.css"
import QuestionItem from './QuestionItem'

const TopResultsContainer = ({ topResults, askQuestion }) => {
    return (
        <div className='topResultsContainer'>
            <div className='topResultTitle'>
                <h2>
                    Top câu hỏi được hỏi nhiều nhất
                </h2>
            </div>

            <div className='topResultContentContainer'>
                {
                    topResults.map((value, index) => {
                        return <QuestionItem key={index} data={value} onClick={askQuestion} />
                    })
                }
            </div>
        </div >
    )
}

export default TopResultsContainer