import { cn } from "@/utils/lib";
import { FC, useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { BsPinterest, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  PinterestShareButton,
} from "react-share";

const LinksButton: FC<{
  deepLinkUrl: string;
  imageLink: string;
  title: string;
}> = ({ deepLinkUrl, imageLink, title }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyTextFunction = () => {
    navigator.clipboard.writeText(deepLinkUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <IoMdShareAlt
        onClick={() => setOpen(true)}
        className="h-7 w-7 cursor-pointer rounded-full border-[1px] border-gray-500 p-1 hover:outline hover:outline-4 hover:outline-slate-200"
      />
      <div
        className={cn(
          "fixed left-0 top-0 z-[100] flex min-h-screen w-full items-center justify-center bg-black bg-opacity-30 p-[3vw]",
          !open && "hidden"
        )}
      >
        <div className="relative flex w-full max-w-md flex-col items-center gap-6 rounded-lg bg-white p-8">
          <RxCross1
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 h-5 w-5"
          />

          <h4 className="text-xl font-semibold">SHARE</h4>

          <div className="flex h-9 w-full gap-1">
            <input
              type="text"
              defaultValue={deepLinkUrl}
              readOnly
              className="h-11 w-full rounded-md border-[1px] border-gray-300 px-3 text-[16px] outline-none"
            />
            <AiOutlineLink
              title="Add to clipboard"
              className={cn(
                "h-11 w-11 cursor-pointer rounded-md border-[1px] p-2",
                copied
                  ? "border-green-600 bg-green-100 text-green-600"
                  : "border-gray-300"
              )}
              onClick={copyTextFunction}
            />
          </div>

          <div className="grid w-full grid-cols-2 gap-2 text-lg [&>*]:w-full">
            <FacebookShareButton
              url={deepLinkUrl}
              quote={title}
              hashtag="#sanskrutinx"
            >
              <div className="flex w-full cursor-pointer justify-center gap-2 rounded-md border-0 bg-facebook p-2 text-white">
                <BiLogoFacebook
                  title="Share on facebook"
                  className="h-7 w-7 fill-white"
                />
                Facebook
              </div>
            </FacebookShareButton>

            <TwitterShareButton title={title} hashtags={[]} url={deepLinkUrl}>
              <div className="flex w-full cursor-pointer justify-center gap-2 rounded-md border-0 bg-twitter p-2 text-white">
                <BsTwitter
                  title="Share on twitter"
                  className="h-7 w-7 fill-white"
                />
                Twitter
              </div>
            </TwitterShareButton>

            <WhatsappShareButton title={title} url={deepLinkUrl}>
              <div className="flex w-full cursor-pointer justify-center gap-2 rounded-md border-0 bg-whatsapp p-2 text-white">
                <BsWhatsapp
                  title="Share on whatsapp"
                  className="h-7 w-7 fill-white"
                />
                Whatsapp
              </div>
            </WhatsappShareButton>

            <PinterestShareButton
              description={title}
              url={deepLinkUrl}
              media={imageLink}
            >
              <div className="flex w-full cursor-pointer justify-center gap-2 rounded-md border-0 bg-pinterest p-2 text-white">
                <BsPinterest
                  title="Share on pinterest"
                  className="h-7 w-7 fill-white"
                />
                Pinterest
              </div>
            </PinterestShareButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinksButton;
