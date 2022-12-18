import { FaPlus, FaMinus } from 'react-icons/fa';
import style from './Zoom.module.css';

export default function Zoom(props: { handleZoom: Function, zoomValue: number }) {

  const { handleZoom, zoomValue } = props;

  return (
    <div className={style.zoom}>
      <button className={style.btn} onClick={() => handleZoom(1)} title="Zoom in">
        <FaPlus />
      </button>
      <button className={style.btn} onClick={() => handleZoom(-1)} title="Zoom out">
        <FaMinus />
      </button>
    </div>
  )
}