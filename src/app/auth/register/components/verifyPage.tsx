import UIButton from "@/components/common/button";
import { Dispatch, FC, SetStateAction } from "react";
import { BiArrowBack } from "react-icons/bi";
import { BsDash } from "react-icons/bs";
import OTPInput from "react-otp-input";

interface Props {
  otp: string;
  setotp: Dispatch<SetStateAction<string>>;
  setverifyPage: Dispatch<SetStateAction<boolean>>;
  _submit: () => Promise<void>;
}
const VerifyPage: FC<Props> = ({ otp, setotp, setverifyPage, _submit }) => {
  return (
    <div className="mt-9 flex w-full flex-col justify-center gap-5 rounded-md">
      <div className="relative flex items-baseline justify-between">
        <UIButton
          className="h-8 gap-2 border-gray-400 px-3 py-2 text-black"
          onClick={() => setverifyPage(false)}
        >
          <BiArrowBack />
          <span>Back</span>
        </UIButton>
        <div className="absolute left-1/2 -translate-x-1/2 text-xl font-bold">
          REGISTER
        </div>
        <div className="font-notmal text-[14px]">2/2</div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="text-gray-500">
          Please be aware that if you go back or exit the registration process
          without filling in the OTP, your registration will not be completed.
          Please enter the OTP (One-Time Password) sent to you to complete the
          registration process. This code ensures the security of your account.
          Thank you!
        </div>
        <OTPInput
          value={otp}
          onChange={(value) => !Number.isNaN(Number(value)) && setotp(value)}
          numInputs={6}
          renderSeparator={
            <span>
              <BsDash className="text-xl" />
            </span>
          }
          renderInput={(props) => <input {...props} />}
          containerStyle={{
            width: "100%",
          }}
          inputStyle={{
            border: "2px solid gray",
            borderRadius: "6px",
            width: "100%",
            margin: "5px",
            aspectRatio: "1",
            fontSize: "20px",
          }}
          inputType="text"
          shouldAutoFocus={true}
        />

        <UIButton
          className="h-10 bg-black font-bold text-white"
          onClick={_submit}
        >
          SUBMIT
        </UIButton>
      </div>
    </div>
  );
};

export default VerifyPage;
