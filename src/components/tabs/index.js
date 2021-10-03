import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveTab } from '../../store/actions';
import { ACTIVE_TAB_REQUEST, ACTIVE_TAB_RESPONSE} from '../../store/consts';
import './index.scss';

const Tabs = () => {
    const activeTab = useSelector((state) => state.activeTab);
    const dispatch = useDispatch();

    const buttons = [
      {
        type: ACTIVE_TAB_REQUEST,
        isActive: activeTab === ACTIVE_TAB_REQUEST,
        title: "Request"
      },
      {
        type: ACTIVE_TAB_RESPONSE,
        isActive: activeTab === ACTIVE_TAB_RESPONSE,
        title: "Response"
      }
    ];

    return (
      <nav>
        {buttons.map(({type, isActive, title}, i) => 
          <button key={i} onClick={() => dispatch(setActiveTab(type))} className={`${isActive ? 'on' : ''}`}>{title}</button>
        )}
      </nav>
    )
}

export default Tabs;