import React from 'react';
import { useState } from "react";
import ItemComponent from './ItemComponent.js';


function ItemShown(){
    const [itemList, setItemList] = useState([]);

    const [name, setName] = useState();
    const [time, setTime] = useState();
    const [location, setLocation] = useState();
    const [additional, setAdditional] = useState();


    function updateItemList(d) {
        const a_list = d.map((a_data) => {
            
            name = {a_data.name}
            time = {a_data.upload_Date}
            location = {a_data.found_Location}
            additional = {a_data.misc}
        })
        setItemList(a_list);
    }
    async function fetchData() {
        let fetchRes = fetch(
            "http://localhost:3000/list");
            fetchRes.then(res =>
                res.json()).then(d => {
                    console.log(d)
                    //d is the jason file
                    updateItemList(d);
                })
    }

    function onSubmit() {


        
        setName('')
        setTime('')
        setLocation('')
        setAdditional('')
        fetchData();
        

        
    }

    return (
        <div>
            <h1>HOME</h1>
            <h1>FOUND ITEMS</h1>
            {
                itemList.map((itemData) => {
                    
                    return <ItemComponent name = 
                    {itemData.name} 
                    time = {itemData.time}
                    location = {itemData.location}
                    additional = {itemData.additional}
                    />
                })
            }
            <div>
                <div className='form-inner'>
                    <div className='form-group'>
                        <input type="text" value ={name} id = "name" placeholder='WHAT DID YOU FIND?'  onChange={e => setName(e.target.value)} ></input>
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