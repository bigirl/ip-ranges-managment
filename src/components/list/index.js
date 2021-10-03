import React from 'react'
import Group from './Group';
import { useSelector } from 'react-redux'
import './index.scss';

const List = () => {
    const activeTab = useSelector((state) => state.activeTab);
    const showPIIonly = useSelector((state) => state.showPIIonly);
    const searchText = useSelector((state) => state.searchText);
    const list = useSelector((state) => state[activeTab]);
    return (
      <section className="list">
          <p className="row top">
            <b>Name</b>
            <b>PII</b>
            <b>Masked</b>
            <b>Type</b>
          </p>
          {list && Object.entries(list).map(([key, value], i) => {
            let items = showPIIonly ? value.filter(item => (item.pii === true)) : value;
            items = searchText ? items.filter(item => (item.type.includes(searchText))) : items;
            return <Group key={i} title={key} items={items} index={i} activeTab={activeTab}/>
          })}
      </section>
    )
  }

export default List;
