"use client";

import UIHeader from "@/components/common/header";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { getData } from "../utils/getData";
import { useState, useEffect, FC } from "react";

const PrivacyPolicyPage: FC = () => {
  const [reply, setReply] = useState("");

  useEffect(() => {
    const FetchData = async () => {
      setReply(await getData("privacyPolicy"));
    };
    FetchData();
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-5 px-[3vw] pb-10 pt-44 text-justify text-[16px]">
      <UIHeader title="PRIVACY POLICY" />
      <ReactMarkdown className="w-full leading-9">{reply}</ReactMarkdown>
    </div>
  );
};

export default PrivacyPolicyPage;
