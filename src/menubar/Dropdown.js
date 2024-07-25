import React, {useState} from 'react';
import './Menubar.css';

export function FileDropdown(props) {
    const [dropdown, setDropdown] = useState(false);
    const onSave = props.onSave || (() => {});
    const onOpen = props.onOpen || (() => {});
    const exportPng = props.exportPng || (() => {})
    return (
        <>
            <ul className={dropdown ? "dropdown clicked" : "file_dropdown"} onClick={() => setDropdown(!dropdown)}>
                <li className='dropdown_item'>New</li>
                <li className='dropdown_item' onClick={() => { onSave() }}>Save</li>
                <li className='dropdown_item' onClick={() => { onOpen() }}>Open</li>
                <li className='dropdown_item' onClick={() => { exportPng() }}>Export PNG</li>
            </ul>
        </>
    );
}

export function EditDropdown(props) {
    const [dropdown, setDropdown] = useState(false);
    return (
        <>
            <ul className={dropdown ? "dropdown clicked" : "edit_dropdown"} onClick={() => setDropdown(!dropdown)}>
                <li className='dropdown_item'>Copy</li>
                <li className='dropdown_item'>Cut</li>
                <li className='dropdown_item'>Paste</li>
                <li className='dropdown_item'>Undo</li>
            </ul>
        </>
    );
}
