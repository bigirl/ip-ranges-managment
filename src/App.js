import React from 'react';
import List from './components/list';
import { useSelector, useDispatch } from 'react-redux'
import { updatePopupMode } from './store/actions';
import { MODE_ADD } from './store/consts';
import GroupForm from './components/groupForm'

export default function App() {
  const popupMode = useSelector((state) => state.popupMode);
  const dispatch = useDispatch();

  return (
    <div className="testApp">
          <main>
            <button onClick={() => dispatch(updatePopupMode(MODE_ADD))} className="addGroup">Add Group</button>
            <List/> 
            {popupMode && <GroupForm/>}
          </main>
      </div>
  );
}
