import React, {useState} from 'react'
import "./styles/SidebarNav.scss";
import FocusTrap from "focus-trap-react";




const SidebarNav = ({isOpen, onClose}) =>{
    let asideClassName="sidebar"
    if(!isOpen){
        asideClassName += " sidebar--closed"
    }


    return(
        <> 
        <FocusTrap active={isOpen} >
            <div>
        {isOpen && (
            <label
              className="mask"
            >
                <button  className="mask-btn" aria-label="close sidebar menu" onClick={onClose}>Close</button>
            </label>
        )}
        <aside className={asideClassName}>
            <ul className="sidebar__menu">
            <li className="sidebar__menu-item"><a href="/"  className="sidebar__menu-link"> Play Ground</a> </li>
            <li className="sidebar__menu-item"><a href="/stats"  className="sidebar__menu-link"> Stats </a> </li>
            <li className="sidebar__menu-item"><a href="/about" className="sidebar__menu-link"> About iQuiz</a> </li>  
            </ul>

        </aside>
        </div>
        </FocusTrap>
        </>

    )


}

export default SidebarNav;