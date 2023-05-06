import React, { useState } from "react";
import style from "./Search.module.css";
import { FaSearch } from "react-icons/fa";

export default function Search(props: { onSelect: Function }) {
  const { onSelect } = props;
  const [text, setText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<
    { name: string; zoom: number; x: number; y: number }[]
  >([]);
  const handleChaneg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    fetch(`/search/search-address?address=${e.target.value}`)
      .then((res) => res.json())
      .then((data) => setSearchResult(data));
  };

  const handleClick = (street: { zoom: number; x: number; y: number }) => {
    onSelect(street);
    setSearchResult([]);
    setText("");
  };
  return (
    <>
      <div className={style.search} dir="ltr">
        <input
          type="text"
          className={style.input}
          placeholder="Search in Tehran"
          value={text}
          onChange={(e) => handleChaneg(e)}
        />
        <FaSearch className={style.icon} />
      </div>
      {text != "" && (
        <div className={style.result}>
          {searchResult.map((street) => (
            <div
              key={street.name}
              className={style.item}
              dir="ltr"
              onClick={() => handleClick(street)}
            >
              {street.name}
            </div>
          ))}
          {searchResult.length == 0 && (
            <div className={style.no_result} dir="ltr">
              Nothing found.
            </div>
          )}
        </div>
      )}
    </>
  );
}
