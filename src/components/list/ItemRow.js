import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types';
import { setPII, setMASKED } from '../../store/actions';

const ItemRow = ({group, item, index, activeTab}) => {
    const dispatch = useDispatch();
    const {name, pii, masked, type} = item;
    // TODO: fix bug - when filtered the index is in offset (PII)
    return (
        <p key={index} className="row">
            <span>{name}</span>
            <button onClick={() => dispatch(setPII(!pii, activeTab, group, index))} className={`pii${pii ? ' on' : ''}`}>PII</button>
            <button onClick={() => dispatch(setMASKED(!masked, activeTab, group, index))} className={`masked${masked ? ' on' : ''}`}>Masked</button>
            <span className="item-type">{type}</span>
        </p>
    )
}

ItemRow.defaultProps = {
    group: "header",
    item: {},
    index: 0,
    activeTab: "request"
}

ItemRow.propTypes = {
    group: PropTypes.string.isRequired,
    item: PropTypes.shape({
        name: PropTypes.string,
        pii: PropTypes.bool,
        masked: PropTypes.bool,
        type: PropTypes.string
    }).isRequired,
    index: PropTypes.number.isRequired,
    activeTab: PropTypes.string.isRequired
}

export default ItemRow;
