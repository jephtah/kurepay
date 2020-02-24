import React from 'react';

import '../../styles/tabs.css'

const Tabs = ({ tabs }) => {
  return (
    <div className="kure-submenu">
      {tabs.map((tab, i) => (
        <div onClick={() => tab.onSelectTab()} key={i} className={tab.isSelected ? 'active' : ''}>
          <p>{tab.title}</p>
          <i className="material-icons">arrow_right</i>
        </div>
      ))}
    </div>
  )
}

export default Tabs;
