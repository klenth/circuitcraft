import React from 'react';
import './Toolbox.css';
import {AndGate, OrGate, NotGate} from './gates/Gates'


export default function Toolbox() {
    return (
      <div className="toolbox_container">
        <h1>Hello?</h1>
        <AndGate />
      </div>
    );
  }
  
  