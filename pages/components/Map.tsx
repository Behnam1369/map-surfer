import React, { useState, useEffect } from 'react'
import style from './Map.module.css'
import coordinate from '../models/ICoordinate';
import Pointer from './Pointer';
import Zoom from './Zoom';
import Search from './Search';

const tileServer = 'https://raster.snappmaps.ir/styles/snapp-style'
// const tileServer = 'https://maps.wikimedia.org/osm-intl'

export default function Map() {
  const [coordinate, setCoordinate] = useState<coordinate>({ x: 10528, y: 6450 });
  const [zoom, setzoom] = useState<number>(14);
  const [dragging, setDragging] = useState<boolean>(false);
  const [mapPosition, setMapPosition] = useState<coordinate>({ x: -128, y: -128 });
  const [showPointer, setShowPointer] = useState<boolean>(false);
  const [pointerPosition, setPointerPosition] = useState<coordinate>({ x: -100, y: -100 });
  const [locationTitle, setLocationTitle] = useState<string>('');



  useEffect(() => {
    if (mapPosition.x > 0) {
      setMapPosition({ ...mapPosition, x: mapPosition.x - 256 });
      setCoordinate({ ...coordinate, x: coordinate.x - 1 });
    } else if (mapPosition.x < -256) {
      setMapPosition({ ...mapPosition, x: mapPosition.x + 256 });
      setCoordinate({ ...coordinate, x: coordinate.x + 1 });
    }
    if (mapPosition.y > 0) {
      setMapPosition({ ...mapPosition, y: mapPosition.y - 256 });
      setCoordinate({ ...coordinate, y: coordinate.y - 1 });
    } else if (mapPosition.y < -256) {
      setMapPosition({ ...mapPosition, y: mapPosition.y + 256 });
      setCoordinate({ ...coordinate, y: coordinate.y + 1 });
    }
  }, [mapPosition]);

  useEffect(() => {
    const { worker } = require('../mocks/browser');
    worker.start();
    return () => { worker.stop(); }
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // only left mouse button
    if (e.button !== 0) return
    setDragging(true);
    e.stopPropagation();
    e.preventDefault();
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (dragging) {
      setMapPosition({ x: mapPosition.x + e.movementX, y: mapPosition.y + e.movementY })
    }
    e.stopPropagation();
    e.preventDefault();
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDragging(false);
    e.stopPropagation();
    e.preventDefault();
  }

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShowPointer(true);
    setPointerPosition({ x: e.clientX, y: e.clientY });
  }

  const handleZoom = (n: number) => {
    if (zoom + n <= 1 || zoom + n >= 20) return;
    setzoom(zoom + n);
    if (n > 0) {
      setCoordinate({ x: coordinate.x * 2, y: coordinate.y * 2 });
    } else {
      setCoordinate({ x: Math.floor(coordinate.x / 2), y: Math.floor(coordinate.y / 2) });
    }
  }

  const handleSelect = (street: { zoom: number, x: number, y: number }) => {
    setzoom(street.zoom);
    setCoordinate({ x: street.x, y: street.y });
    setShowPointer(true);

    setPointerPosition({ x: window.innerWidth / 2, y: 256 });
  }

  return (
    <div className={style.container}>
      <div
        className={style.map}
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseUp={(e) => handleMouseUp(e)}
        draggable={true}
        onDoubleClick={(e) => handleDoubleClick(e)}
        style={{ left: mapPosition.x, top: mapPosition.y }}
      >
        <img src={`${tileServer}/${zoom}/${coordinate.x - 1}/${coordinate.y - 1}.png`} />
        <img src={`${tileServer}/${zoom}/${coordinate.x}/${coordinate.y - 1}.png`} />
        <img src={`${tileServer}/${zoom}/${coordinate.x + 1}/${coordinate.y - 1}.png`} />
        <img src={`${tileServer}/${zoom}/${coordinate.x - 1}/${coordinate.y}.png`} />
        <img src={`${tileServer}/${zoom}/${coordinate.x}/${coordinate.y}.png`} />
        <img src={`${tileServer}/${zoom}/${coordinate.x + 1}/${coordinate.y}.png`} />
        <img src={`${tileServer}/${zoom}/${coordinate.x - 1}/${coordinate.y + 1}.png`} />
        <img src={`${tileServer}/${zoom}/${coordinate.x}/${coordinate.y + 1}.png`} />
        <img src={`${tileServer}/${zoom}/${coordinate.x + 1}/${coordinate.y + 1}.png`} />
      </div>
      {showPointer && <Pointer position={pointerPosition} location={coordinate} onChange={(val: string) => setLocationTitle(val)} />}
      {locationTitle && <p className={style.location} dir="rtl">موقعیت: {locationTitle} </p>}
      <Zoom handleZoom={(val: number) => handleZoom(val)} zoomValue={zoom} />
      <Search onSelect={(street: { zoom: number, x: number, y: number }) => handleSelect(street)} />
    </div>
  )
}