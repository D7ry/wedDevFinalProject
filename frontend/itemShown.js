import React from 'react';

import axios from 'axios';
import { useState, useEffect } from "react";
import ItemComponent from './ItemComponent.js'


function ItemShown(){
    const [itemList, setItemList] = useState([]);
    const [item, setItem] = useState();
    const [time, setTime] = useState();
    const [location, setLocation] = useState();
    const [additional, setAdditional] = useState();

    function onSubmit() {
        
        const newList = [...itemList,
            {
                "item":item,
                "time": time,
                "location": location,
                "additional": additional
            }
        ];
        
        setItem('')
        setTime('')
        setLocation('')
        setAdditional('')
        setItemList(newList)
        

    }
    
    return (
        <div>
            <h1>HOME</h1>
            <h1>FOUND ITEMS</h1>
            {
                itemList.map((itemData) => {
                    
                    return <ItemComponent item = {itemData.item} time = {itemData.time}
                    location = {itemData.location}
                    additional = {itemData.additional}
                    />
                })
            }
            <div>
                <div className='form-inner'>
                    <div className='form-group'>
                        <input type="text" value ={item} id = "item" placeholder='WHAT DID YOU FIND?'  onChange={e => setItem(e.target.value)} ></input>
                    </div>
                    <div className='form-group'>
                        <input type="text" value ={time} id = "time" placeholder='WHEN DID YOU FIND IT?' onChange={e => setTime(e.target.value)} ></input>
                    </div>
                    <div className='form-group'>
                        <input type="text" value ={location} id = "loc" placeholder='WHERE DID YOU FIND IT?' onChange={e => setLocation(e.target.value)}></input>
                    </div>

                    <div className='additional-info'>
                        <input type="text" value = {additional} id = "additional" placeholder='ITEM DESCRIPTION' onChange={e => setAdditional(e.target.value)} ></input>
                    </div>
                </div>
                <button id = 'submitBtn' onClick={onSubmit}>SUBMIT</button>
            </div>
        </div>
    );
}

export default ItemShown;