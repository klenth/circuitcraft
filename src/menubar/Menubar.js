import './Menubar.css';
import React, {useState} from 'react';
import DownloadButton from '../canvas/DownloadButton';
import { FileDropdown } from './Dropdown';
import csLogo from "./cs.w.twotone.transparent.png";

export default function Menubar(props) {
    const [dropdown, setDropdown] = useState(false);
    const openHelpPage = () => {
        window.open('/helppage/helppage.html', '_blank');
    };
    return (
        <>
            <nav className='menubar'>
                <ul className='bar_items'>
                    <img src={csLogo} alt="CS department logo"/>
                    <div>
                        <li className='bar_file' onClick={() => setDropdown(!dropdown)} 
                        >File
                        {dropdown &&
                            <FileDropdown
                                onSave={props.onSave}
                                onOpen={props.onOpen}
                            />
                        }
                        </li>

                        {/* <li className='bar_edit'>Edit</li> */}
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
