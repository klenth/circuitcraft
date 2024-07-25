import './Menubar.css';
import React, {useState} from 'react';
import { FileDropdown, EditDropdown } from './Dropdown';

export default function Menubar(props) {
    const [fileDropdown, setFileDropdown] = useState(false);
    const [editDropdown, setEditDropdown] = useState(false);
    return (
        <>
            <nav className='menubar'>
                <ul className='bar_items'>
                    <div>
                        <li className='bar_file' onClick={() => setFileDropdown(!fileDropdown)}>File</li>
                        {fileDropdown &&
                            <FileDropdown
                                onSave={props.onSave}
                                onOpen={props.onOpen}
                                exportPng = {props.exportPng}
                            />
                        }
                        <li className='bar_edit' onClick={() => setEditDropdown(!editDropdown)}>Edit</li>
                        {editDropdown &&
                            <EditDropdown/>
                        }
                    </div>
                    <li className='bar_name'>CircuitCraft</li>
                    <li className='bar_toolbox'>Toolbox</li>
                </ul>
            </nav>
        </>
    )
}
