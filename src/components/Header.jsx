import logo from '/artsome.jpg'
import { useState } from 'react'
import '../styles/Header.css'

export const Header = () => {
  const [burgerClass, setBurgerClass] = useState('burger-bar unclicked')
  const [menuClass, setMenuClass] = useState('menu hidden')
  const [isMenuClicked, setIsMenuClicked] = useState(false)

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass('burger-bar clicked')
      setMenuClass('menu visible')
    } else {
      setBurgerClass('burger-bar unclicked')
      setMenuClass('menu hidden')
    }
    setIsMenuClicked(!isMenuClicked)
  }

  return (
    <header>
      <img src={logo} alt="artsome logo" id="logo" />
      <nav className={menuClass}>
        <ul className="menu-list">
          <li>Artists</li>
          <li>Category</li>
          <li>About</li>
        </ul>
      </nav>
      <div className="burger-menu" onClick={updateMenu}>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
      </div>
    </header>
  )
}
