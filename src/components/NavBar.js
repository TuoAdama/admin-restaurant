import React from 'react';
import {NavItem} from './Index'

export default function NavBar({children}) {
    return (
        <nav id="app-nav-main" className="app-nav app-nav-main flex-grow-1">
            <ul className="app-menu list-unstyled accordion" id="menu-accordion">
                <NavItem name={"Commande"}/>
            </ul>
        </nav>
    )
}
