import React, {useState} from 'react';
import './Menubar.css';

export function FileDropdown(props) {
    const [dropdown, setDropdown] = useState(false);
    const onSave = props.onSave || (() => {});
    const onOpen = props.onOpen || (() => {});
    return (
        <>
            <ul className={dropdown ? "dropdown clicked" : "dropdown"} onClick={() => setDropdown(!dropdown)}>
                <li className='dropdown_item'>New</li>
                <li className='dropdown_item' onClick={() => { setDropdown(false); onSave(); }}>Save</li>
                <li className='dropdown_item' onClick={() => { setDropdown(false); onOpen(); }}>Open</li>
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
