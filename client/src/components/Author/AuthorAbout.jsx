import React from "react";
import {Link} from 'react-router-dom'
import {FaYoutube,FaXTwitter,FaInstagram,FaGlobe} from 'react-icons/fa6'
import {Button} from 'flowbite-react'

const AuthorAbout = () => {
  return (
    <div className="flex flex-col gap-4">
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla dolor,
        odit molestias exercitationem obcaecati libero sunt minima excepturi
        perferendis nostrum praesentium officia esse totam illo ex ipsa ipsam
        nam recusandae numquam et, non debitis! Aperiam, eligendi aspernatur.
        Illum ipsa voluptatem vel rerum dolorem ad voluptas quis quas non iste
        error ipsum totam laudantium iure exercitationem, eligendi esse harum
        alias doloribus? Corporis, deserunt iusto non illo ipsum voluptatibus
        laboriosam ut nobis illum harum nulla exercitationem consequatur
        expedita maiores eos qui sint, dolorem temporibus, facere quae cumque
        mollitia maxime. Obcaecati ipsa corrupti vel dolore at excepturi, esse
        amet animi rem sint laboriosam.
      </p>
    <ul className="flex gap-2 text-2xl">
<Link><FaYoutube /></Link>
<Link><FaXTwitter /></Link>
<Link><FaInstagram /></Link>
<Link><FaGlobe /></Link>

    </ul>
    <div className="flex justify-end">
      <Button outline pill>Edit About</Button>
    </div>
    </div>
  );
};

export default AuthorAbout;
