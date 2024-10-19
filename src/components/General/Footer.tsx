import '../../css/footer.css';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CopyrightIcon from '@mui/icons-material/Copyright';
import {Link} from 'react-router-dom';

export function Footer() {
    return (
        <footer className="footer-background">
            <div className="container-footer w-container">
                <div className="w-row">
                    <div className="footer-container">
                        <img className="logo-footer" src={require('../../images/logo_wit.png')} alt="logo"/>
                        <div className="contact-footer">
                            <div className="footer-column w-col w-col-8">
                                <div className="w-row">
                                    <div className="column-center-mobile w-col w-col-4">
                                        <h3 className="footer-titles">Follow Me!</h3>
                                        <article className="socials">
                                            <Link to="https://www.instagram.com/lvacreative/" target="_blank">
                                                <InstagramIcon className="instaLogo"/>
                                            </Link>
                                            <Link to="https://www.facebook.com/profile.php?id=100086740820460"
                                                  target="_blank">
                                                <FacebookIcon className="facebookLogo"/>
                                            </Link>
                                            <Link to="https://www.linkedin.com/in/lander-van-assche-9ab771151/"
                                                  target="_blank">
                                                <LinkedInIcon className="linkedIn"/>
                                            </Link>
											<Link to="https://www.youtube.com/@lvacreative"
                                                  target="_blank">
                                                <YouTubeIcon className="youtube"/>
                                            </Link>
                                        </article>
                                        <article style={{display: "flex", color: "white", marginBottom: "1rem"}}>
                                            <EmailIcon/>
                                            <strong style={{marginLeft: "1rem"}}
                                                    className="link-email-footer">lvacreative@gmail.com</strong><br/>
                                        </article>
                                        <article style={{display: "flex", color: "white"}}>
                                            <CallIcon/>
                                            <strong style={{marginLeft: "1rem"}} className="link-email-footer">+32 472
                                                01 54 88</strong><br/>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
					<div style={{display:"flex", justifyContent:"center", alignItems:"center", color:"white"}}>
					<CopyrightIcon/> 
					<p style={{paddingLeft:"0.2rem", paddingBottom:"0.2rem"}}>2023 LVA CREATIVE - ALL RIGHTS RESERVED</p>
					</div>
                </div>
            </div>
        </footer>
    );
}
