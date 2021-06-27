import {useTheme} from '../../hooks/useTheme'

import './styles.scss'
 

export function ButtonToggleTheme(){
  const {theme, toggleTheme} = useTheme();

  return (
    <>
      <label >
        {/* <button
          className = {`${theme} toggle-button`}
          onClick = {() => toggleTheme()}
        > */}
          <input type="checkbox"/>
          <div className="switch" onClick = {() => toggleTheme()}>
          <div></div>
          <div></div>
          <span></span>
          </div>
        {/* </button> */}
      </label>
    </>
  );
}