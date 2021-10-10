import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updatePopupMode,addGroup, editGroup } from '../../store/actions';

import './index.scss';

const titles = {
    mode_add: "Insert New Group",
    mode_edit: "Edit Group"
}

const actions = {
  mode_add: addGroup,
  mode_edit: editGroup
}

const GroupForm = () => {
  const [nameGroup, setNameGroup] = useState("");
  const [startGroup, setStartGroup] = useState("");
  const [endGroup, setEndGroup] = useState("");
  const [internal, setInternal] = useState(false);
  const [errorName, setErrorName] = useState(false);

    const popupMode = useSelector((state) => state.popupMode);
    const dispatch = useDispatch();

    const validateName = (e) => {
      const nameNew = e.target.value;
      setErrorName(nameNew.length > 20 || nameNew.length === 0);
    }

    const saveGroup = (e) => {
      console.log('dispatch save');

      const groupData = {
        name: nameGroup,
        start: {},
        end: {},
        internal
      }

      dispatch(actions[popupMode](groupData));
    }

    const {name} = {name:"333"};

    return (
      <section className="form">
         <header>{titles[popupMode]}</header>
         <button onClick={() => dispatch(updatePopupMode(false))} className="closeGroup">X</button>
            
         <label>Group Name</label>
        <input
              onChange={validateName}
              value={name}
              type="text"
              placeholder="Employee Name"
            />
          

      </section>
    )
  }

export default GroupForm;
