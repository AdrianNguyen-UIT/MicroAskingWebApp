import React, { useEffect, useState, useRef } from 'react'
import '../css/SearchBar.css'
import SearchInput from './SearchInput'
import SearchItem from './SearchItem'
import PropTypes from 'prop-types'
import SearchHistory from '../singletons/SearchHistory'
import Question from '../singletons/Question'

const SearchHistoryInstance = SearchHistory.Instance;

const SearchBar = ({ searchItemCount, askQuestion, searchWord, changeSearchWord }) => {
    const [isFocus, setFocus] = useState(false);
    const [filterData, setFilterData] = useState([]);
    const searchBarRef = useRef();

    useEffect(() => {
        const closeSearchBar = (event) => {
            let close = true;
            event.path.forEach(element => {
                if (element === searchBarRef.current) close = false;
            });
            if (close) setFocus(false);
        };
        document.body.addEventListener("click", closeSearchBar);
        return () => document.body.removeEventListener("click", closeSearchBar);
    }, []);

    const BoldedText = (text) => {
        if (searchWord === '') return text;
        const textArray = text.split(RegExp(searchWord, "ig"));
        const match = text.match(RegExp(searchWord, "ig"));
        return (
            <>
                {textArray.map((item, index) => (
                    <span key={index}>
                        {item}
                        {index !== textArray.length - 1 && match && (
                            <b>{match[index]}</b>
                        )}
                    </span>
                ))}
            </>
        );
    }

    const filterWithSearchWord = () => {
        let newFilter = SearchHistoryInstance.getData().filter(value => {
            return value.toLowerCase().includes(searchWord.toLowerCase());
        });
        setFilterData(newFilter);
    }

    const setIsFocus = () => {
        filterWithSearchWord();
        setFocus(true);
    }

    const handleInputChange = (event) => {
        changeSearchWord(event.target.value);
        filterWithSearchWord();
    }

    const clearSearchWord = () => {
        changeSearchWord("");
        filterWithSearchWord();
    }

    const submitSearch = (data) => {
        const validQuestion = data.replace(/\s\s+/g, '');
        setFocus(false);
        if (validQuestion.length === 0) {
            console.log("Empty");
        }
        else {
            Question.Instance.setData(validQuestion);
            askQuestion();
        }
    }

    return (
        <div>
            <div className='searchBar' ref={searchBarRef}>
                <SearchInput
                    searchData={searchWord}
                    onFocus={setIsFocus}
                    onChange={handleInputChange}
                    onClearSearchData={clearSearchWord}
                    onSubmitSearch={submitSearch} />
                {isFocus &&
                    filterData.slice(0, searchItemCount).map((value, index) => {
                        return <SearchItem
                            key={index}
                            isHistory={true}
                            data={BoldedText(value)}
                            onSubmitSearch={submitSearch} />
                    })}
            </div>
        </div >
    )
}


SearchBar.defaultProps = {
    searchItemCount: 10,
}

SearchBar.propTypes = {
    searchItemCount: PropTypes.number.isRequired,
    askQuestion: PropTypes.func.isRequired,
    searchWord: PropTypes.string.isRequired,
}
export default SearchBar