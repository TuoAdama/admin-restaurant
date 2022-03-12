import React from 'react'

export default function Logo() {
    var url = require("../assets/images/users/user-1.jpg");
    console.log(url);
    return (
        <div className="app-branding">
            <a className="app-logo" href="index.html">
                <img className="logo-icon me-2" src={url} alt="logo"/>
                <span className="logo-text">Restaurant admin</span>
            </a>
        </div>
    )
}
