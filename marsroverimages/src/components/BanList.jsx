import React, {useState} from 'react';
import './BanList.css'
import menu from '../assets/hamburgermenu.svg';
import close from '../assets/close.svg';


const BanList = ({ bannedAttributes, onBan }) => {
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
                    {bannedAttributes.map((attr, index) => (
                        <div
                        key={index}
                        className="attr-rect"
                        onClick={() => onBan(attr)}
                        style={{ backgroundColor: "#fcc", cursor: "pointer" }}
                        >
                        <p><strong>{attr.label}</strong>: {attr.value}</p>
                        </div>
                    ))}
                </nav>
            </div>
        </>
    );
}

export default BanList;