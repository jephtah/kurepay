import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuItem = (props) => {
    const { icon, name, dropdown, link } = props.item;
    return (
        <React.Fragment>
            {
                dropdown ?
                    (<div className="kure-menu-item kure-submenu-items">
                        <div className="active">
                            <NavLink to={link}>
                                <div>
                                    <i className="material-icons">{icon}</i>
                                    <p>{name}</p>
                                </div>
                                <i className="material-icons arrow-right">keyboard_arrow_right</i>
                                <i className="material-icons arrow-down">keyboard_arrow_down</i>
                            </NavLink>
                            <ul>
                                {dropdown.map((item, i) => {
                                    return <NavLink key={i} to={`${link}/${item.link}`}>
                                        <li> {item.text}</li>
                                    </NavLink>
                                })}
                            </ul>
                        </div>
                    </div>) :
                    (

                        <div className="kure-menu-item">
                            <NavLink to={link} activeClassName="active">
                                <div>
                                    <i className="material-icons">{icon}</i>
                                    <p>{name}</p>
                                </div>
                            </NavLink>
                        </div>
                    )

            }
        </React.Fragment>
    );
}

export default MenuItem;
