/* eslint-disable no-console */
import React, { useState } from 'react';
import { Input } from 'antd';
import { getTunes } from '@services/iTunesApi';

const { Search } = Input;

export default function() {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);

    const handleSearch = () => {
        getTunes(searchText)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };
    return (
        <div>
            <Search value={searchText} onChange={e => setSearchText(e.target.value)} onSearch={handleSearch} />
            {JSON.stringify(data)}
        </div>
    );
}
