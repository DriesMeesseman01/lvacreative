import React from "react";
import "./../../css/about.css"

export function About() {
    return (
        <div className="about-container">
			   <div className="image-container">
                <img
                    className="logo-footer-img"
                    src={require('../../images/Portret.jpg')}
                    alt="logo"
                />
            </div>
            <div className="text-container">
                <h2 style={{color:"#00326d"}}>About Me</h2>
                <p>
                    Hi! My name is Lander Van Assche and I’m an aspiring videographer/cinematographer/photographer from
                    Belgium. Basically a guy with a camera. For as long as I can remember I’m passionate about cinema.
                    When I graduated in Multimedia Technology: Audio Video, I decided to expand my knowledge furthermore
                    and study Film and Television Studies at the University of Ghent. Meanwhile I finished two short
                    films and worked as a news editor at VRT NWS, our national news channel, where I gained a lot of
                    audiovisual experience. I also got into different types of photography as you can see on this
                    website.
                </p>
                <p>
                    A year ago I decided to start up LVA Creative to give myself the opportunity to work for all kinds
                    of clients. With my broad knowledge in the audiovisual sector I can be deployed in various fields
                    with creative minds. Cinema, television, video clips, corporate video, event aftermovies, festivals…
                </p>
				<p>
                    Let’s get creative together!
                </p>
            </div>
        </div>
    );
}

export default About;
