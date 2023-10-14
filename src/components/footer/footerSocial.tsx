"use client";

import axios from "axios";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

type Social = {
  id: string;
  media: string;
  link: string;
};
const FooterSocial: FC = () => {
  const [socials, setSocials] = useState<Social[]>([]);

  useEffect(() => {
    const _getSocial = async () => {
      axios
        .get<{ arr: Social[] }>(
          `${process.env.ENDPOINT}/api/v1/user/getSocials`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setSocials(res.data.arr);
        })
        .catch();
    };
    _getSocial();
  }, []);

  return (
    <div className="mb-5 flex flex-col gap-2">
      <h5 className="flex items-center justify-between py-2 font-bold">
        <span>FOLLOW US</span>
      </h5>
      <div className="flex flex-wrap gap-4">
        {socials.map((social) => (
          <a
            key={social.id}
            href={social.media}
            target="_blank"
            className="h-5 w-5"
          >
            <Image
              src={social.link}
              alt={social.media}
              width={50}
              height={50}
              className="h-5 w-5"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterSocial;
