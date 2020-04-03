import React from 'react'
import "./styles/SidebarNav.scss";
import FocusTrap from "focus-trap-react";
import Logo from "../Logo";


const SidebarNav = ({ isOpen, onClose }) => {
    let asideClassName = "sidebar"
    if (!isOpen) {
        asideClassName += " sidebar--closed"
    }
   
    const onKeyDown =(e)=>{
        console.log(e.keyCode)
        if(e.keyCode === 27){
            onClose();
        }
    }


    return (
        <>
            <FocusTrap active={isOpen} >
                <div onKeyDown={onKeyDown}>
                    {isOpen && (
                        <label
                            className="mask"
                        >
                            <button className="mask-btn" aria-label="close sidebar menu" onClick={onClose}>Close</button>
                        </label>
                    )}
                    <aside className={asideClassName}>
                        <Logo className="sidebar__icon-logo" role="img" aria-label="Welcome to iQuiz" tabIndex={0}/>
                        <ul className="sidebar__menu">
                            <li className="sidebar__menu-item"><a href="/" aria-label="Go to home" className="sidebar__menu-link"> Home</a> </li>
                            <li className="sidebar__menu-item"><a href="/stats" aria-label="Check stats" className="sidebar__menu-link"> Stats </a> </li>
                            <li className="sidebar__menu-item"><a href="/about" aria-label="about iQuiz" className="sidebar__menu-link"> About iQuiz</a> </li>
                        </ul>
                    </aside>
                </div>
            </FocusTrap>
        </>

    )


}

const MemoSidebar = React.memo(SidebarNav)

export default MemoSidebar;