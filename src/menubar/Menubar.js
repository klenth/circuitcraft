import './Menubar.css';
import React, {useState} from 'react';
import { FileDropdown, EditDropdown } from './Dropdown';
import csLogo from "./cs.w.white.png";

export default function Menubar(props) {
    const [fileDropdown, setFileDropdown] = useState(false);
    // const [editDropdown, setEditDropdown] = useState(false);
    const openHelpPage = () => {
        window.open('/helppage/helppage.html', '_blank');
    };
    // Function to close dropdown when an item is clicked
    const closeDropdown = () => {
        setFileDropdown(false);
    };
    return (
        <>
            <nav className='menubar'>
                <ul className='bar_items'>
                    <img src={csLogo} alt="CS department logo"/>
                    <div>
                        <li onClick={() => setFileDropdown(!fileDropdown)} className={fileDropdown ? 'bar_file_open' : 'bar_file'}>File &nbsp;
                        <i className={`fas ${fileDropdown ? 'fa-caret-up' : 'fa-caret-down'}`}></i></li>
                        {fileDropdown &&
                            <FileDropdown
                                onSave={props.onSave}
                                onOpen={props.onOpen}
                                exportPng ={props.exportPng}
                                closeDropdown= {closeDropdown}
                            />
                        }
                        {console.log('file '+fileDropdown)}
                        {/* <li className='bar_edit' onClick={() => setEditDropdown(!editDropdown)}>Edit</li>
                        {editDropdown &&
                            <EditDropdown/>
                        } */}
                    </div>
                    <li className='bar_name'>CircuitCraft</li>
                    <li className='help_icon'>
                        <button onClick={openHelpPage}>Help</button>
                    </li>
                    <li className='bar_toolbox'>Toolbox</li>

                </ul>
            </nav>
        </>
    )
}
