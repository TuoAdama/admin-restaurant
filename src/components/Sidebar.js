import React from 'react'
import { Logo, NavBar } from './Index'

export default function Sidebar() {
    return (
        <div id="app-sidepanel" className="app-sidepanel">
            <div id="sidepanel-drop" className="sidepanel-drop"></div>
            <div className="sidepanel-inner d-flex flex-column">
                <a href="#" id="sidepanel-close" className="sidepanel-close d-xl-none">&times;</a>
                <Logo />
                <NavBar />
            </div>
        </div>
    )
}