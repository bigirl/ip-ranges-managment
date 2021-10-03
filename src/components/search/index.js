import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { searchItems, resetFilters } from '../../store/actions';
import './index.scss';

const Search = () => {
    const [showPIIonly, setShowPIIonly] = useState("");
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();

    const handleReset = () => {
        setShowPIIonly(false)
        setSearchText('');
        dispatch(resetFilters());
    }

    return (
        <section className="search">
            <FontAwesomeIcon className="icon" icon={faSearch} size="lg" />
            <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search" />
            <input type="checkbox" checked={showPIIonly} onChange={() => setShowPIIonly(!showPIIonly)}/>
            <button className="apply" onClick={() => dispatch(searchItems(showPIIonly,searchText))}>Apply</button> 
            <button className="reset" onClick={() => handleReset()}>Reset Filters</button>
        </section>
    )
}

export default Search;