import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { RULE_INTERNAL, RULE_EXTERNAL } from '../../store/consts';
import { updatePopupMode, deleteGroup } from '../../store/actions';
import { MODE_EDIT } from '../../store/consts';

const ItemRow = ({item, index}) => {
    const dispatch = useDispatch();

    const {name, start, end, internal, created} = item;
    const d = new Date(created).toLocaleDateString("en-US");
    const t = new Date(created).toLocaleTimeString("en-US");
    return (
        <p key={index} className="row">
            <span>{name}</span>
            <span>{internal ? RULE_INTERNAL : RULE_EXTERNAL}</span>
            <span>{start.origin}{end && `-${end.origin}`}</span>
            <span>{d} {t}</span>
            <span>
                <FontAwesomeIcon onClick={() => dispatch(updatePopupMode(MODE_EDIT))} icon={faEdit} size="lg" />
                <FontAwesomeIcon onClick={() => dispatch(deleteGroup(index))} icon={faTrashAlt} size="lg" />
            </span>
        </p>
    )
}

ItemRow.defaultProps = {
    item: {},
    index: 0
}

ItemRow.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string,
        start: PropTypes.object,
        end: PropTypes.object,
        internal: PropTypes.bool,
        created: PropTypes.number
    }).isRequired,
    index: PropTypes.number.isRequired
}

export default ItemRow;
