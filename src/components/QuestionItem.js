import React from 'react'
import "../css/QuestionItem.css"
import Question from '../singletons/Question';

const QuestionItem = ({ data, onClick }) => {

    const askTopQuestion = () => {
        Question.Instance.setData(data.question);
        onClick();
    };

    return (
        <div className='questionItem' onClick={askTopQuestion}>
            <p>{data.question}</p>
        </div>
    )
}

export default QuestionItem