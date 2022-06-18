import React from 'react'
import PropTypes from 'prop-types'
import '../css/SearchItem.css'
import '../css/SearchInput.css'
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';

const SearchItem = ({ isHistory, data, onSubmitSearch }) => {
    const search = () => {
        onSubmitSearch(data);
    }

    return (
        <div className='searchItem' onClick={search}>
            <div className="searchIcon">
                {isHistory ? <HistoryIcon /> : <SearchIcon />}
            </div>
            <div className='searchItem-text'>{data}</div>
        </div >
    )
}

SearchItem.defaultProps = {
    isHistory: true,
    data: "History Search or Relevant Question"
}

SearchItem.propTypes = {
    isHistory: PropTypes.bool,
    onSubmitSearch: PropTypes.func.isRequired
}

export default SearchItem