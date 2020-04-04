import React from 'react'
import "./styles/SidebarNav.scss";
import FocusTrap from "focus-trap-react";
import iQuizlogo from"../materials/iQuiz-Logo.svg";


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
                        <div className="sidebar__icon-ctn">
                        <img src={iQuizlogo} className="sidebar__icon-logo" alt="iQuiz Logo" aria-label="Welcome to iQuiz" tabIndex={0}/>
                        </div>
                        <ul className="sidebar__menu">
                            <li className="sidebar__menu-item"><a href="/" aria-label="Go to home page" className="sidebar__menu-link"> Home</a> </li>
                            <li className="sidebar__menu-item"><a href="/stats" aria-label="Check stats" className="sidebar__menu-link"> Stats </a> </li>
                            <li className="sidebar__menu-item"><a href="/about" aria-label="About iQuiz" className="sidebar__menu-link"> About iQuiz</a> </li>
                        </ul>
                    </aside>
                </div>
            </FocusTrap>
        </>

    )


}

const MemoSidebar = React.memo(SidebarNav)

export default MemoSidebar;