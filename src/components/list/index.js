import React from 'react'
import ItemRow from './ItemRow';
import { useSelector } from 'react-redux'
import './index.scss';

const List = () => {
    const groups = useSelector((state) => state.groups);

    return (
      <section className="groups">
          <p className="row top">
            <b>Group Name</b>
            <b>Asset rule</b>
            <b>IPs</b>
            <b>Created On</b>
          </p>
          {groups && groups.length > 0 && groups.map((item, idx) => <ItemRow key={idx} {...item}/>)}
      </section>
    )
  }

export default List;
