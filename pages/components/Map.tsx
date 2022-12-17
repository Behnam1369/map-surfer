import React, { useState, useEffect } from 'react'
import style from './Map.module.css'
import coordinate from '../models/coordinate';

export default function Map() {
  const [coordinate, setCoordinate] = useState<coordinate>({ x: 10528, y: 6450 });
  const [zoom, setzoom] = useState<number>(14);
  const [dragging, setDragging] = useState<boolean>(false);
  const [mapPosition, setMapPosition] = useState<coordinate>({ x: -128, y: -128 });

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
  }, [mapPosition])

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

  return (
    <div className={style.container}>
      <div
        className={style.map}
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseUp={(e) => handleMouseUp(e)}
        draggable={true}
        style={{ left: mapPosition.x, top: mapPosition.y }}
      >
        <img src={`https://maps.wikimedia.org/osm-intl/${zoom}/${coordinate.x - 1}/${coordinate.y - 1}.png`} />
        <img src={`https://maps.wikimedia.org/osm-intl/${zoom}/${coordinate.x}/${coordinate.y - 1}.png`} />
        <img src={`https://maps.wikimedia.org/osm-intl/${zoom}/${coordinate.x + 1}/${coordinate.y - 1}.png`} />
        <img src={`https://maps.wikimedia.org/osm-intl/${zoom}/${coordinate.x - 1}/${coordinate.y}.png`} />
        <img src={`https://maps.wikimedia.org/osm-intl/${zoom}/${coordinate.x}/${coordinate.y}.png`} />
        <img src={`https://maps.wikimedia.org/osm-intl/${zoom}/${coordinate.x + 1}/${coordinate.y}.png`} />
        <img src={`https://maps.wikimedia.org/osm-intl/${zoom}/${coordinate.x - 1}/${coordinate.y + 1}.png`} />
        <img src={`https://maps.wikimedia.org/osm-intl/${zoom}/${coordinate.x}/${coordinate.y + 1}.png`} />
        <img src={`https://maps.wikimedia.org/osm-intl/${zoom}/${coordinate.x + 1}/${coordinate.y + 1}.png`} />
      </div>
    </div>
  )
}