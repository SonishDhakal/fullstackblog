import React from "react";
import {Link} from 'react-router-dom'
import {FaYoutube,FaXTwitter,FaInstagram,FaGlobe} from 'react-icons/fa6'
import {Button} from 'flowbite-react'

const AuthorAbout = ({profile}) => {
  return (
    <div className="flex flex-col gap-4">
      <p>
        {profile?.about ? profile.about : 'Nothing to see'}
      </p>
    <ul className="flex gap-2 text-2xl">

{profile?.socials?.instagram && <a  target="_blank" href={profile?.socials?.instagram}><FaInstagram /> </a>}
{profile?.socials?.x && <a  target="_blank" href={profile?.socials?.x}><FaXTwitter /> </a>}
{profile?.socials?.linkdin &&<a  target="_blank" href={profile?.socials?.linkdin}><FaInstagram /> </a>}
{profile?.socials?.website && <a target="_blank"  href={profile?.socials?.website}><FaGlobe /> </a> }

    </ul>

    </div>
  );
};

export default AuthorAbout;
