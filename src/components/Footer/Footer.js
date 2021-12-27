import './Footer.css';
import React from 'react';

function Footer() {
    return (
        <div className="footer_wrapper">
            <p className="footer_text">Created by Osher Sebbag -&nbsp;</p>
            <p className="footer_text"><a className="footer_link" href="mailto:osher.sabag@gmail.com">osher.sabag@gmail.com</a>&nbsp;&nbsp;|&nbsp;&nbsp;</p>
            <p className="footer_text"><a className="footer_link" href="tel:+972528468462">+972-528468462</a></p>
        </div>
    );
}

export default Footer;