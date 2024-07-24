import './Menubar.css';
import React, {useState} from 'react';
import { FileDropdown } from './Dropdown';

export default function Menubar(props) {
    const [dropdown, setDropdown] = useState(false);
    return (
        <>
            <nav className='menubar'>
                <ul className='bar_items'>
                    <div>
                        <li className='bar_file' onClick={() => setDropdown(!dropdown)} 
                        >File
                        {dropdown &&
                            <FileDropdown
                                onSave={props.onSave}
                                onOpen={props.onOpen}
                                exportPng = {props.exportPng}
                            />
                        }
                        </li>

                        <li className='bar_edit'>Edit</li>
                    </div>
                    <li className='bar_name'>CircuitCraft</li>
                    <li className='bar_toolbox'>Toolbox</li>
                </ul>
            </nav>
        </>
    )
}
