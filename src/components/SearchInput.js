import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import '../css/SearchInput.css'
import PropTypes from 'prop-types'

const placeHolder = "Bạn muốn hỏi gì?";

const SearchInput = ({ searchData, onFocus, onChange, onClearSearchData, onSubmitSearch }) => {
    const search = () => {
        onSubmitSearch(searchData);
    }

    return (
        <div className='searchInput'>
            <div
                className="searchIcon search-submit"
                onClick={search}>
                <SearchIcon />
            </div>
            <input
                type="text"
                value={searchData}
                placeholder={placeHolder}
                onFocus={onFocus}
                onChange={onChange} />
            {
                searchData.length === 0 ? <></> :
                    <div className="closeIcon">
                        <CloseIcon onClick={onClearSearchData} />
                    </div>
            }

        </div >
    )
}
SearchInput.defaultProps = {
    searchData: ""
}
SearchInput.propTypes = {
    searchData: PropTypes.string.isRequired,
    onFocus: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onClearSearchData: PropTypes.func.isRequired,
    onSubmitSearch: PropTypes.func.isRequired
}
export default SearchInput