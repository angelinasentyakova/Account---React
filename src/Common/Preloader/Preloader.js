import loading from './../../assets/images/loading.gif'
import "./Preloader.css";

let Preloader = (props) => {
  return (
    <div className='preloader-wrapper'>
      <img className='loading-img' src={loading}></img>
      </div>
  )
}

export default Preloader;
