import './Intro.css';
import React from 'react';

function Intro() {
    return (
        <div className="intro_wrapper">
            <div className="title_wrapper">
                <img className="intro_img" src="https://raw.githubusercontent.com/naveendb92/star-wars/master/src/assets/img/logo.png" />
                <div className="title_text">API CHALLENGE</div>
            </div>
            <div className="intro_text">
                A long time ago in a galaxy far, far away, a recruitment challenge has been issued by the universe's most respected space-crew: Tikal Knowledge 2.0.
                <br />
                In order to be worthy to join Tikal space-crew, one has to prove his top skills by analyzing data gathered from the farthest corners of the galaxy.
                <br />
                The challenge consists of 2 tasks that were built to find the ultimate candidates to join the ranks of Tikal Knowledge 2.0.
            </div>
        </div>
    );
}

export default Intro;