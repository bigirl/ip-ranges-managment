import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updatePopupMode,addGroup, editGroup } from '../../store/actions';
import { MODE_EDIT, MODE_ADD, DEFAULT_VALIDATION_OBJ, DEFAULT_IP_OBJ, ValidateIPaddress, ip2int } from '../../store/consts';
import './index.scss';


const GetModeDefaults = () => {
  const popUpMode = useSelector((state) => state.popupMode);
  const groupId = useSelector((state) => state.groupId);
  const groups = useSelector((state) => state.groups);
  
  if(popUpMode === MODE_ADD) {
    return {
      popup_title: "Insert New Group",
      groupId: groups.length+1,
      nameGroup: "",
      startRange: DEFAULT_IP_OBJ,
      endRange: DEFAULT_IP_OBJ,
      internal: false,
      saveGroup: addGroup,
      groups,
      validation: DEFAULT_VALIDATION_OBJ
    }
  } else if (popUpMode === MODE_EDIT) {
    const group = groups.filter(group => group.groupId === groupId) || [];

    const {name, startRange, endRange, internal } = group[0];
    return {
      popup_title: "Edit Group",
      groupId,
      nameGroup: name,
      startRange,
      endRange,
      internal,
      saveGroup: editGroup,
      groups: groups.filter(group => group.groupId !== groupId) || [],
      validation: {
        isValidName: true,
        isValidStartIP: true,
        isValidEndIP: true,
        errorMessage: null
    }
    }
  }
  return {};
}

const GroupForm = () => {
  
    const MODE_DATA = GetModeDefaults();
  
    const [nameGroup, setNameGroup] = useState(MODE_DATA.nameGroup);
    const [startRange, setStartRange] = useState(MODE_DATA.startRange);
    const [endRange, setEndRange] = useState(MODE_DATA.endRange);
    const [internal, setInternal] = useState(MODE_DATA.internal);
    const [isValidForm, setIsValidForm] = useState(MODE_DATA.validation);

    
    const dispatch = useDispatch();

    const validateName = (e) => {
      const nameNew = e.target.value;
      let isValidName = false, errorMessage = null;

      if (nameNew.length === 0 || nameNew.length > 20) {
        errorMessage = 'Group name is invalid';
        isValidName = false;
      } else if (MODE_DATA.groups.filter(item => item.name === nameNew).length) {
        errorMessage = 'Group name allready excists';
        isValidName = false;
      }
      else {
        errorMessage = null;
        isValidName = true;
      } 

      setIsValidForm(Object.assign({}, isValidForm, {isValidName, errorMessage}));
      setNameGroup(nameNew);
    }

    const isIPIntercepts = (ipValue) => {
      return MODE_DATA.groups.filter(item => item.startRange?.number === ipValue || item.endRange?.number === ipValue).length;
    }

    const validateStartIPRange = (e) => {
      const ipString = e.target.value.trim();
      const ipValue = ip2int(ipString);
      let isValidStartIP = false;
      let errorMessage = null;

      if(!ValidateIPaddress(ipString)) {
        errorMessage = 'Please enter valid IP address';
        isValidStartIP = false
      } else if(ipValue === 0) {
        errorMessage = 'IP is out of range';
        isValidStartIP = false
      } else if(endRange.number> 0 && ipValue >= endRange.number) {
        errorMessage = 'Start range should be lower then the end';
        isValidStartIP = false;
      } else if (isIPIntercepts(ipValue)) {
        errorMessage = 'IP range intercepts exciststing group.';
        isValidStartIP = false;
      } else {
        errorMessage = null;
        isValidStartIP = true
      }
      
      setStartRange({
        origin: ipString,
        number: ipValue
      });

      setIsValidForm(Object.assign({}, isValidForm, {errorMessage, isValidStartIP}));
    }

    const validateEndIPRange = (e) => {
      const ipString = e.target.value.trim();
      const ipValue = ip2int(ipString);
      let isValidEndIP = true;
      let errorMessage = null;

      if(ipString.length === 0) {
        errorMessage = null;
        isValidEndIP = true;
      } else if(!ValidateIPaddress(ipString)) {
        errorMessage = 'Please enter valid IP address';
        isValidEndIP = false;
      } else if(ipValue === 0) {
        errorMessage = 'IP is out of range';
        isValidEndIP = false;
      } else if(ipValue <= startRange.number) {
        errorMessage = 'End of range should be greater then the start';
        isValidEndIP = false;
      } else if (isIPIntercepts(ipValue)) {
        errorMessage = 'IP range intercepts exciststing group.';
        isValidEndIP = false;
      } else {
        errorMessage = null;
        isValidEndIP = true;
      }
    
      setEndRange({
        origin: ipString,
        number: ipValue
      });
    
      setIsValidForm(Object.assign({}, isValidForm, {errorMessage, isValidEndIP}));
    }

    const isFormValid = () => {
      const {errorMessage, isValidName, isValidStartIP, isValidEndIP} = isValidForm;
      return errorMessage === null && isValidName && isValidStartIP && isValidEndIP;
    }

    const inFreeRange = () => {
      const newStart = startRange.number;
      const newEnd = endRange?.number;

      let noIntercepts = MODE_DATA.groups.filter(group => {
        const currentStart = group.startRange.number;
        const currentEnd = group.endRange?.number;

        //check is new start or end intercepts existing range
        let isNewInCurrent = (newStart >= currentStart && newStart <= currentEnd)
        || (newEnd >= currentStart && newEnd <= currentEnd);

        //check is current start or end intercepts new range
        let isCurrentInNew = (currentStart >= newStart && currentStart <= newEnd)
        || (currentEnd >= newStart && currentEnd <= newEnd);

        return (isNewInCurrent || isCurrentInNew);
      }).length === 0;


      return noIntercepts;
    }

    const saveGroup = (e) => {
      let errorMessage = null;

      if(!inFreeRange()) {
        errorMessage = "IP range intercepts exciststing group.";
        setIsValidForm(Object.assign({}, isValidForm, {errorMessage}));
      } else if(isFormValid()) {
        const groupData = {
          groupId: MODE_DATA.groupId,
          name: nameGroup,
          startRange,
          endRange,
          internal,
          created: + new Date()
        }
        dispatch(MODE_DATA.saveGroup(groupData));
        closePopup();
      }
      else {
        errorMessage = "Please complete all required fields";
        setIsValidForm(Object.assign({}, isValidForm, {errorMessage}));
      }
    }

    const closePopup = () => {
      dispatch(updatePopupMode(false));
    }

    const startOrigin = startRange ? startRange.origin : '';
    const endOrigin = endRange ? endRange.origin : '';
    const {errorMessage} = isValidForm;

    return (
      <section className="modal-container">
        <header>{MODE_DATA.popup_title}</header>
        <button onClick={closePopup} className="closeGroup">X</button>
         
        <p><label>Group Name</label>
          <input onChange={validateName}
              value={nameGroup}
              type="text"
              placeholder="Group Name"
            /></p>
        <p><label>Start IP</label>
          <input onChange={validateStartIPRange}
              value={startOrigin}
              type="text"
              placeholder="Range start IP"
            /></p>
        <p><label>End IP</label>
            <input onChange={validateEndIPRange}
              value={endOrigin}
              type="text"
              placeholder="Range end IP"
            /></p>
        <p><label>Internal Asset</label>
            <input type="checkbox" checked={internal} onChange={e => setInternal(e.target.checked)}/></p>
        <p>
            <button onClick={saveGroup} className="saveGroup">Save</button>
            {!isFormValid() ? <span className="err-message"> {errorMessage}</span> : ''}
        </p>
      </section>
    )
  }

export default GroupForm;
