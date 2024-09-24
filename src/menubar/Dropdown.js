import React, {useState} from 'react';
import './Menubar.css';

export function FileDropdown(props) {
    const [dropdown, setDropdown] = useState(false);
    const onSave = props.onSave || (() => {});
    const onOpen = props.onOpen || (() => {});
    const exportPng = props.exportPng || (() => {})
    const closeDropdown = props.closeDropdown || (() => {})

    
    return (
        <>
            <ul className={dropdown ? "dropdown clicked" : "file_dropdown"} onClick={() => setDropdown(!dropdown)}>
                <li className='dropdown_item' onClick={() => { closeDropdown() }}>New</li>
                <li className='dropdown_item' onClick={() => { onSave(); closeDropdown() }}>Save</li>
                <li className='dropdown_item' onClick={() => { onOpen(); closeDropdown() }}>Open</li>
                <li className='dropdown_item' onClick={() => { exportPng(); closeDropdown() }}>Export PNG</li>
            </ul>
            {console.log({dropdown})}
        </>
    );
}

// export function EditDropdown(props) {
//     const [dropdown, setDropdown] = useState(false);
//     return (
//         <>
//             <ul className={dropdown ? "dropdown clicked" : "edit_dropdown"} onClick={() => setDropdown(!dropdown)}>
//                 <li className='dropdown_item'>Copy</li>
//                 <li className='dropdown_item'>Cut</li>
//                 <li className='dropdown_item'>Paste</li>
//                 <li className='dropdown_item'>Undo</li>
//             </ul>
//         </>
//     );
// }
