import './Menubar.css';
import React, {useState} from 'react';
import { FileDropdown, EditDropdown } from './Dropdown';
import csLogo from "./cs.w.twotone.transparent.png";

export default function Menubar(props) {
    const [fileDropdown, setFileDropdown] = useState(false);
    const [editDropdown, setEditDropdown] = useState(false);
    const openHelpPage = () => {
        window.open('/helppage/helppage.html', '_blank');
    };
    return (
        <>
            <nav className='menubar'>
                <ul className='bar_items'>
                    <img src={csLogo} alt="CS department logo"/>
                    <div>
                        <li className='bar_file' onClick={() => setFileDropdown(!fileDropdown)}>File</li>
                        {fileDropdown &&
                            <FileDropdown
                                onSave={props.onSave}
                                onOpen={props.onOpen}
                                exportPng = {props.exportPng}
                            />
                        }
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
