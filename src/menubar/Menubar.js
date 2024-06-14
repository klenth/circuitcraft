/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import './Menubar.css';
import React from 'react';

export default function Menubar() {
    return (
        <>
            <nav className='menubar'>
                <ul className='bar_items'>
                    <div>
                        <li className='bar_file'>File</li>
                        <li className='bar_edit'>Edit</li>
                    </div>
                    <li className='bar_name'>CircuitCraft</li>
                    <li className='bar_toolbox'>Toolbox</li>
                </ul>
            </nav>
        </>
    )
}
