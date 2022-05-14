import React, { useEffect, useRef, useState } from "react";
import Logo from "../Logo";
import "./_header.scss";

type MenuTypes = 1 | 2 | 3;

const Header: React.FC<{}> = () => {
  const [menu, setMenu] = useState<MenuTypes>(1);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const changeMenu = () => {
    const windowWidth = window.innerWidth;
    // @ https://stackoverflow.com/questions/6665997/switch-statement-for-greater-than-less-than

    console.log("chaing");
    if (windowWidth > 1200) {
      // если окно как у комьютера
      setMenu(1);
      setOpenMenu(false);
    } else if (windowWidth > 920) {
      // large-size планшеты
      setMenu(2);
    } else if (windowWidth > 580) {
      // mid-size планшеты
      setMenu(2);
    } else {
      //  телефоны
      setMenu(3);
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", changeMenu, false);
    changeMenu();
    return () => {
      window.removeEventListener("resize", changeMenu, false);
    };
  }, []);

  const Menu: React.FC<{ currentType: MenuTypes }> = ({ currentType }) => {
    var ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (openMenu) {
          if (ref.current && !ref.current.contains(event!.target as Node)) {
            setOpenMenu(false);
          }
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);

    switch (currentType) {
      case 1: {
        return (
          <div className='content'>
            <Logo size='l' />
            <ul>
              <li>
                <a href='#'>Главная</a>
              </li>
              <li>
                <a href='#'>Технология</a>
              </li>
              <li>
                <a href='#'>График полетов</a>
              </li>
              <li>
                <a href='#'>Гарантии</a>
              </li>
              <li>
                <a href='#'>О компании</a>
              </li>
              <li>
                <a href='#'>Контакты</a>
              </li>
            </ul>
          </div>
        );
      }
      case 2: {
        return (
          <div className='content'>
            <Logo size='l' />
            <div className='menu-btn-wrapper'>
              <ul className='menu-btn menu-btn-open corners' onClick={() => setOpenMenu(true)}>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div className={`side-menu side-menu-${openMenu ? "open" : "closed"} borders`} ref={ref}>
              <ul>
                <li className='corners'>
                  <a href='#'>Главная</a>
                </li>
                <li className='corners'>
                  <a href='#'>Технология</a>
                </li>
                <li className='corners'>
                  <a href='#'>График полетов</a>
                </li>
                <li className='corners'>
                  <a href='#'>Гарантии</a>
                </li>
                <li className='corners'>
                  <a href='#'>О компании</a>
                </li>
                <li className='corners'>
                  <a href='#'>Контакты</a>
                </li>
              </ul>
            </div>
          </div>
        );
      }
      case 3: {
        return (
          <div className='content'>
            <Logo size='l' onClick={() => setOpenMenu(true)} />
            <div className={`side-menu side-menu-${openMenu ? "open" : "closed"} borders`} ref={ref}>
              <Logo size='m' />
              <ul>
                <li className='corners' onClick={() => setOpenMenu(false)}>
                  <a href='#'>Главная</a>
                </li>
                <li className='corners' onClick={() => setOpenMenu(false)}>
                  <a href='#'>Технология</a>
                </li>
                <li className='corners' onClick={() => setOpenMenu(false)}>
                  <a href='#'>График полетов</a>
                </li>
                <li className='corners' onClick={() => setOpenMenu(false)}>
                  <a href='#'>Гарантии</a>
                </li>
                <li className='corners' onClick={() => setOpenMenu(false)}>
                  <a href='#'>О компании</a>
                </li>
                <li className='corners' onClick={() => setOpenMenu(false)}>
                  <a href='#'>Контакты</a>
                </li>
              </ul>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <nav className={`borders ${menu === 3 ? "menu-bottom" : ""}`}>
      <Menu currentType={menu} />
    </nav>
  );
};

export default Header;
