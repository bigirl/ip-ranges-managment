import React, { useState } from "react";
import PropTypes from 'prop-types';
import ItemRow from './ItemRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareRight,faCaretSquareDown } from '@fortawesome/free-solid-svg-icons'

const Group = ({title, items, index, activeTab}) => {
    const disabled = !items.length;

    // TODO: fix bug - same item opened in both tabs
    const [toggeGroup, setToggeGroup] = useState(false);
    const toggle = () => !disabled && setToggeGroup(!toggeGroup);
    
    const parents = {
        activeTab,
        group: title
    };

    return (
        <div key={index} className={`toggle${disabled ? ' disabled' : ''}`}>
            <h4 onClick={toggle}>
                <FontAwesomeIcon icon={toggeGroup ? faCaretSquareDown : faCaretSquareRight} size="lg" />
                {title}{disabled && "- No items to dispaly"}
            </h4>
            {!disabled && 
                <div className={`toggle-content${toggeGroup ? " open" : ""}`}>
                    {items.map((item, idx) => <ItemRow key={idx} index={idx} item={item} {...parents}/>)}
                </div>}
        </div>
    );
}

Group.defaultProps = {
    title: "",
    items: [],
    index: 0,
    activeTab: ""
}

Group.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
    index: PropTypes.number.isRequired,
    activeTab: PropTypes.string.isRequired
}

export default Group;
