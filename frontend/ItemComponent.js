import React from 'react';

import axios from 'axios';
import { useState, useEffect } from "react";


function ItemComponent(props){
    return(
        
        <div>
        <div class = "itemBackground">
            <div class = "itemHeader"> {props.item}</div>

            <div class = "itemDesc">date found:</div>
            <div>{props.time}</div>

            <div class = "itemDesc">location:</div>
            <div>{props.location}</div>

            <div class = "itemDesc">additional information:</div>
            <div>
                {props.additional}
            </div>

            
        </div>
        

        </div>
    );
}

export default ItemComponent;