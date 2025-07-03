import React, {useState} from 'react';
import './BanList.css'
import menu from '../assets/hamburgermenu.svg';
import close from '../assets/close.svg';


const BanList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    return (
        <>
            <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                 {isOpen ? (
                    <img src={close} alt="close ban list"/>
                 ) : (
                    <img src={menu} alt="open ban list"/>
                 )}
            </div>
            <div className={`banlist ${isOpen ? 'open' : ''}`}>
                <h3>Ban List</h3>
                <nav className="menu">
                </nav>
            </div>
        </>
    );
}

export default BanList;