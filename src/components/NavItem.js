import React from 'react'

export default function NavItem({name}) {
    return (
        <li className="nav-item">
            <a className="nav-link active" href="orders.html">
                <span className="nav-icon">
                    
                </span>
                <span className="nav-link-text">{name}</span>
            </a>
        </li>
    )
}

