import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import style from './Pointer.module.css';
import coordinate from '../models/ICoordinate';

export default function Pointer(props: { position: coordinate, location: coordinate, onChange: Function }) {
  const { onChange } = props;
  const { x, y } = props.position;
  const lat: number = props.location.x;
  const lng: number = props.location.y;


  useEffect(() => {
    const { worker } = require('../mocks/browser');
    worker.start();

    return () => { worker.stop(); }
  }, []);

  useEffect(() => {
    // console.log(lat, lng);
    onChange('Loading...');
    let timer = setTimeout(() => {
      fetch(`/search/get-address?lat=${lat}&lng=${lng}`).then((res) => res.json()).then((data) => onChange(`${data[1]} (${data[0]})`));
    }, 2000);
    return () => { clearTimeout(timer); };
  }, [props.location])




  return (
    <div className={style.pointer} style={{ left: x, top: y }}>
      <FaMapMarkerAlt />
    </div>
  )
}