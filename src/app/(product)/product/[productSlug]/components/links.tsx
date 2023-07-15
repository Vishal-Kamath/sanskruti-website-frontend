import UIButton from "@/components/common/button";
import { cn } from "@/utils/lib";
import { FC, useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { BsFacebook, BsPinterest, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  PinterestShareButton,
} from "react-share";

const LinksButton: FC<{ deepLinkUrl: string; imageLink: string }> = ({
  deepLinkUrl,
  imageLink,
}) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyTextFunction = () => {
    navigator.clipboard.writeText(deepLinkUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <UIButton onClick={() => setOpen(true)} className="flex gap-2 p-2">
        <IoMdShareAlt className="h-4 w-4" />
        Share
      </UIButton>
      <div
        className={cn(
          "fixed left-0 top-0 z-[100] flex min-h-screen w-full items-center justify-center bg-black bg-opacity-25 p-[3vw]",
          !open && "hidden"
        )}
      >
        <div className="relative flex w-full max-w-[20rem] flex-col items-center gap-6 rounded-sm bg-white p-6">
          <RxCross1
            onClick={() => setOpen(false)}
            className="absolute right-2 top-2 h-5 w-5"
          />

          <h4 className="text-xl font-semibold">Share</h4>

          <div className="flex h-9 w-full gap-1">
            <input
              type="text"
              value={deepLinkUrl}
              contentEditable={false}
              className="h-9 w-full rounded-md border-[1px] border-gray-300 p-2 outline-none"
            />
            <AiOutlineLink
              className={cn(
                "h-9 w-9 cursor-pointer rounded-md border-[1px] p-2",
                copied
                  ? "border-green-600 bg-green-100 text-green-600"
                  : "border-gray-300"
              )}
              onClick={copyTextFunction}
            />
          </div>

          <div className="flex w-full justify-evenly [&>*>*]:h-7 [&>*>*]:w-7">
            <FacebookShareButton url={deepLinkUrl}>
              <BsFacebook className="fill-facebook" />
            </FacebookShareButton>

            <TwitterShareButton url={deepLinkUrl}>
              <BsTwitter className="fill-twitter" />
            </TwitterShareButton>

            <WhatsappShareButton url={deepLinkUrl}>
              <BsWhatsapp className="fill-whatsapp" />
            </WhatsappShareButton>

            <PinterestShareButton url={deepLinkUrl} media={imageLink}>
              <BsPinterest className="fill-pinterest" />
            </PinterestShareButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinksButton;
