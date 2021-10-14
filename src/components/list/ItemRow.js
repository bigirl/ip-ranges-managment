import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { RULE_INTERNAL, RULE_EXTERNAL } from '../../store/consts';
import { updatePopupMode, deleteGroup } from '../../store/actions';
import { MODE_EDIT } from '../../store/consts';

const ItemRow = (item) => {
    const dispatch = useDispatch();

    const {groupId, name, startRange, endRange, internal, created} = item;
    const formatedDate = `${new Date(created).toLocaleDateString("en-US")} ${new Date(created).toLocaleTimeString("en-US")}`;
    const ipRange = getRange();
    function getRange() {
        if(startRange.origin || endRange.origin) {
            return `${startRange.origin} ${ endRange?.origin ? `-${endRange?.origin}` : ''}`;
        }
        return 'error';
    }

    return (
        <p key={groupId} className="row">
            <span>{name}</span>
            <span>{internal ? RULE_INTERNAL : RULE_EXTERNAL}</span>
            <span>{ipRange}</span>
            <span>{formatedDate}</span>
            <span>
                <FontAwesomeIcon onClick={() => dispatch(updatePopupMode(MODE_EDIT, groupId))} icon={faEdit} size="lg" />
                <FontAwesomeIcon onClick={() => dispatch(deleteGroup(groupId))} icon={faTrashAlt} size="lg" />
            </span>
        </p>
    )
}

ItemRow.defaultProps = {
    item: {}
}

ItemRow.propTypes = {
    item: PropTypes.shape({
        groupId: PropTypes.number,
        name: PropTypes.string,
        startRange: PropTypes.object,
        endRange: PropTypes.object,
        internal: PropTypes.bool,
        created: PropTypes.number
    }).isRequired
}

export default ItemRow;
