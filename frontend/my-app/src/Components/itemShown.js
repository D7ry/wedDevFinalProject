import React from 'react';
import { useState } from "react";
import ItemComponent from './ItemComponent.js';


function ItemShown(){
    /*List of all items displayed on screen */
    const [itemList, setItemList] = useState([]);

    const [buffer_name, setName] = useState();
    const [buffer_time, setTime] = useState();
    const [buffer_location, setLocation] = useState();
    const [buffer_misc, setMisc] = useState();
    const [buffer_detail, setDetail] = useState();
    
    /*Reset all input buffer back to empty*/
    function clearInputBuffer() {
        setName('');
        setTime('');
        setLocation('');
        setMisc('');
    };

    const method_post = {method: 'POST'};
    /*Update item list with items contained in a_json*/
    function updateItemList(a_json) {
        setItemList(a_json);
    }

    /*Fetch all lost items from the backend, and push them to be displayed.*/
    async function fetchAllItem() {
        let fetchRes = fetch(
            "http://localhost:3000/list");
            fetchRes.then(res =>
                res.json()).then(a_json => {
                    console.log(a_json)
                    updateItemList(a_json);
                })
    }

    function onSubmit() {
        let a_body = {
            name: buffer_name,
            found_Date: buffer_time,
            found_Location: buffer_location,
            misc: buffer_misc,
            detail: buffer_detail,
            
        }
        let test_body = {
            "name": "a name",
            "found_Location": "East asian library",
            "claim_Location": "moffitt",
            "imageUrl": "ww.goo",
            "misc": "this is not expensive"
        }
        let a_header = {
             'Cache-Control': 'no-cache',
             'Connection': 'keep-alive',
             'Accept-Encoding': 'gzip, deflate, br',
             'Accept': 'application/json',
             'Content-Type': 'application/json',
        }
        let a_fetchSetting = {
                method: "POST",
                body: test_body,
                header: a_header
        };

        console.log("fetch setting:");
        console.log(a_fetchSetting);
        let fetchRes = fetch(
            "http://localhost:3000/post", 
            a_fetchSetting
        );
        fetchRes.then(res =>
            res.json()).then(a_json => {
                console.log(a_json)
                //updateItemList(a_json);
                //clearInputBuffer();
            });
    }

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
                        <input type="text" value ={buffer_name} id = "name" placeholder='WHAT DID YOU FIND?'  onChange={e => setName(e.target.value)} ></input>
                    </div>
                    <div className='form-group'>
                        <input type="text" value ={buffer_time} id = "time" placeholder='WHEN DID YOU FIND IT?' onChange={e => setTime(e.target.value)} ></input>
                    </div>
                    <div className='form-group'>
                        <input type="text" value ={buffer_location} id = "loc" placeholder='WHERE DID YOU FIND IT?' onChange={e => setLocation(e.target.value)}></input>
                    </div>
                    <div className='additional-info'>
                        <input type="text" value = {buffer_detail} id = "detail" placeholder='DETAIL' onChange={e => setDetail(e.target.value)} ></input>
                    </div>
                    <div className='additional-info'>
                        <input type="text" value = {buffer_misc} id = "misc" placeholder='MISC INFO' onChange={e => setMisc(e.target.value)} ></input>
                    </div>
                </div>
                <button id = 'submitBtn' onClick={onSubmit}>SUBMIT</button>
            </div>
        </div>
    );

}

export default ItemShown;