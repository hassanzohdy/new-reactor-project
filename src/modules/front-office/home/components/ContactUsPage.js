import React from 'react';
import Helmet from 'reactor/components/Helmet';
import './ContactUsPage.scss';
import GoogleMap from '../../components/GoogleMap';
import Heading from '../../components/heading';
import ContactUsForm from './ContactUsForm';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import PinDropIcon from '@material-ui/icons/PinDrop';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Tooltip from 'reactor/components/Tooltip';
import SettingsContext from '../../context/SettingsContext';

export default function AboutUsPage() {
    const getSetting = React.useContext(SettingsContext);

    return (
        <>
            <Helmet bodyClass="page contactus-page" title="اتصل بنا" />

            <Heading text="اتصل بنا" />
            <div id="content">
                <div className="container">
                    <div className="contact-info my-5 py-5">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="contact-details">
                                    <ul className="list-unstyled info">
                                        <li className="phone">
                                            <PhoneInTalkIcon />
                                            <p>
                                                <span>رقم هاتف الفرع الرئيسي</span>
                                                <span>{getSetting('phoneNumber')}</span>
                                            </p>
                                        </li>
                                        <li className="address">
                                            <PinDropIcon />
                                            <p>
                                                <span>عنوان الفرع الرئيسي</span>
                                                <span>{getSetting('address')}</span>
                                            </p>
                                        </li>
                                        <li className="email">
                                            <MailOutlineIcon />
                                            <p>
                                                <span>البريد الإلكتروني</span>
                                                <span>{getSetting('email')}</span>
                                            </p>
                                        </li>
                                        <li className="email">
                                            <WhatsAppIcon />
                                            <p>
                                                <span>واتساب </span>
                                                <span>{getSetting('whatsappNumber')}</span>
                                            </p>
                                        </li>
                                    </ul>
                                    <ul className="list-inline social">
                                        <Tooltip title="تويتر">
                                            <li className="list-inline-item">
                                                <a href={getSetting('social.twitter')} target="_blank" rel="noopener noreferrer">
                                                    <TwitterIcon />
                                                </a>
                                            </li>
                                        </Tooltip>
                                        <Tooltip title="فيس بوك">
                                            <li className="list-inline-item">
                                                <a href={getSetting('social.facebook')} target="_blank" rel="noopener noreferrer">
                                                    <FacebookIcon />
                                                </a>
                                            </li>
                                        </Tooltip>
                                        <Tooltip title="انستجرام">
                                            <li className="list-inline-item">
                                                <a href={getSetting('social.instagram')} target="_blank" rel="noopener noreferrer">
                                                    <InstagramIcon />
                                                </a>
                                            </li>
                                        </Tooltip>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="branchs mt-5 pt-5">
                        <div className="branch">
                            <div className="map">
                                <div className="mapouter">
                                    <div className="gmap_canvas">
                                        <GoogleMap />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ContactUsForm />
                </div>
            </div>
        </>
    );
} 