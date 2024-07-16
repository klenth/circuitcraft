import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Menubar.css';

export function FileDropdown() {
    const [dropdown, setDropdown] = useState(false);
    return (
        <>
            <ul className={dropdown ? "dropdown clicked" : "dropdown"} onClick={() => setDropdown(!dropdown)}>
                <li className='dropdown_item'>
                    <Link to={"/"} className='link_item' onClick={() => setDropdown(false)}>New</Link>
                </li>
                <li className='dropdown_item'>Download</li>
                <li className='dropdown_item'>Upload</li>
                <li className='dropdown_item'>Export</li>
            </ul>
        </>
    );
}

export function EditDropdown() {
    return (
        <>
            <ul className='dropdown'>
                <li className='dropdown_item'>Copy</li>
                <li className='dropdown_item'>Cut</li>
                <li className='dropdown_item'>Paste</li>
                <li className='dropdown_item'>Undo</li>
            </ul>
        </>
    );
}
