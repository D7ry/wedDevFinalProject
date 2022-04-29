import React from 'react';
import { useState, Component } from "react";
import ItemComponent from './ItemComponent.js';
import Select from 'react-select'

function ItemShown(){
    /*List of all items displayed on screen */
    const [itemList, setItemList] = useState([]);

    const [buffer_name, setName] = useState();
    const [buffer_time, setTime] = useState();
    const [buffer_location, setLocation] = useState();
    const [buffer_misc, setMisc] = useState();
    const [buffer_detail, setDetail] = useState();
    const [buffer_type, setType] = useState();

    /*Reset all input buffer back to empty*/
    function clearInputBuffer() {
        setName('');
        setTime('');
        setLocation('');
        setMisc('');
        setType();
    };

    /*Update item list with items contained in a_json*/
    function updateItemList(a_json) {
        setItemList(a_json);
    }

    /*Fetch all lost items from the backend, and push them to be displayed.*/
    async function listAllItem() {
        let fetchRes = fetch(
            "http://localhost:3000/list");
            fetchRes.then(res =>
                res.json()).then(a_json => {
                    console.log(a_json)
                    updateItemList(a_json);
                })
    }

    async function onFilter() {
        let fetchRes = fetch(
            "http://localhost:3000/list");
            fetchRes.then(res =>
                res.json()).then(a_json => {
                    console.log(a_json)
                    let filtered_json = a_json.filter(element => element._itemType === buffer_type);
                    console.log(filtered_json);
                    updateItemList(filtered_json);
                })
    }

    function onSubmit() {
        console.log(buffer_detail);
        let a_body = {
            name: buffer_name,
            found_Date: buffer_time,
            found_Location: buffer_location,
            misc: buffer_misc,
            detail: buffer_detail,
            itemType: buffer_type
        }
        let a_header = {'Content-Type': 'application/json'};
        let a_fetchSetting = {
                method: "POST",
                _body: true,
                body: JSON.stringify(a_body),
                headers: a_header
        };

        console.log("fetch setting:");
        console.log(a_fetchSetting);
        let fetchRes = fetch(
            "http://localhost:3000/post", 
            a_fetchSetting,
        );
        fetchRes.then(res =>
            res.json()).then(a_json => {
                console.log(a_json)
                listAllItem();
                //clearInputBuffer();
            });
    }

    const item_type = [
        { value: 'phone', label: 'phone' },
        { value: 'laptop', label: 'laptop' },
        { value: 'earphone', label: 'earphone' },
        { value: 'card', label: 'card' },
        { value: 'wallet', label: 'wallet' },
        { value: 'earphone', label: 'apparel' },
        { value: 'misc', label: 'misc'}
      ]

    return (
        <div>
            <h1>HOME</h1>
            <h1>FOUND ITEMS</h1>
            {
                itemList.map((a_item) => {
                    return <ItemComponent name = 
                    {a_item._name} 
                    time = {a_item._found_Date}
                    location = {a_item._found_Location}
                    misc = {a_item._misc}
                    detail = {a_item._detail}
                    />
                })
            }
            <div>
                <div className='form-inner'>
                    <div className='form-group'>
                        <d>Found Date: </d>
                        <input type="date" value ={buffer_time} id = "time" placeholder='WHEN DID YOU FIND IT?' onChange={e => setTime(e.target.value)} ></input>
                    </div>
                    <div className='form-group'>
                        <d>Item Name: </d>
                        <input type="text" value ={buffer_name} id = "name" placeholder='WHAT DID YOU FIND?'  onChange={e => setName(e.target.value)} ></input>
                    </div>
                    <div className='form-group'>
                        <d>Found Location:</d>
                        <input type="text" value ={buffer_location} id = "loc" placeholder='WHERE DID YOU FIND IT?' onChange={e => setLocation(e.target.value)}></input>
                    </div>
                    <div className='detail'>
                        <d>Item Detail: </d>
                        <input type="text" value = {buffer_detail} id = "detail" placeholder='DETAIL' onChange={e => setDetail(e.target.value)} ></input>
                    </div>
                    <div className='miselaneous'>
                        <d>Misc Info: </d>
                        <input type="text" value = {buffer_misc} id = "misc" placeholder='MISC INFO' onChange={e => setMisc(e.target.value)} ></input>              
                    </div>
                    <div className='additional-info'>
                    <Select options={item_type} id = 'type' onChange={e =>setType(e.value)} />
                    </div>
                </div>
                <button id = 'submitBtn' onClick={onSubmit}>SUBMIT</button>
                <button id = 'button_filter' onClick={onFilter}>FILTER</button>
                </div>
        </div>
    );

}

export default ItemShown;