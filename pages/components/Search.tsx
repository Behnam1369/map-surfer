import React, { useState } from 'react';
import style from './Search.module.css';
import { FaSearch } from 'react-icons/fa';

export default function Search(props: { onSelect: Function }) {
  const { onSelect } = props;
  const [text, setText] = useState<string>('');
  const [searchResult, setSearchResult] = useState<{ name: string, zoom: number, x: number, y: number }[]>([]);
  const handleChaneg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    fetch(`/search/search-address?address=${e.target.value}`)
      .then((res) => res.json())
      .then((data) => setSearchResult(data));
  }

  const handleClick = (street: { zoom: number, x: number, y: number }) => {
    onSelect(street);
    setSearchResult([]);
    setText('');
  }
  return (
    <>
      <div className={style.search} dir="rtl">
        <FaSearch className={style.icon} />
        <input type="text" className={style.input} placeholder="جستجو در تهران" value={text} onChange={(e) => handleChaneg(e)} />
      </div>
      {text != "" && <div className={style.result}>
        {searchResult.map((street) => <div key={street.name} className={style.item} dir="rtl" onClick={() => handleClick(street)}>{street.name}</div>)}
        {searchResult.length == 0 && <div className={style.no_result} dir="rtl">نتیجه ای یافت نشد</div>}
      </div>}
    </>
  )
}