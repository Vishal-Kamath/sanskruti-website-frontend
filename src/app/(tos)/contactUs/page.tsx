import WhatsappNumber from "@/components/common/whatsappNumber";
import { NextPage } from "next";
import { PiWhatsappLogoThin } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
import ContactUsForm from "./contactUsForm";
import VisitOurStore from "@/components/footer/visitOurStore";

const ContactUsPage: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col gap-5 pb-10 pt-36">
      <div className="relative isolate w-full sm:px-[3vw] sm:pt-[5rem]">
        {/* Background */}
        <div className="absolute left-1/2 top-0 -z-10 h-[40vh] w-full -translate-x-1/2 bg-gradient-to-br from-amber-200 via-yellow-300 to-orange-400 object-cover sm:h-[60vh]"></div>

        {/* Contact Card */}
        <div className="mx-auto flex w-full max-w-4xl justify-between gap-4 overflow-hidden border-gray-400 bg-white max-sm:flex-col sm:rounded-md sm:border-[1px]">
          <div className="flex w-full flex-col gap-6 p-6">
            <h3 className="text-xl font-semibold">Get in touch</h3>

            <div className="flex flex-col gap-3">
              <div className="flex w-full gap-4 rounded-md border-[1px] border-gray-200 px-6 py-4">
                <CiMail className="h-8 w-8 text-gray-600" />
                <div className="flex flex-col gap-3 font-light">
                  <h4>MAIL US</h4>
                  <a
                    href="mailto:info@sanskrutinx.com"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="border-b-[1px] border-transparent hover:border-gray-600"
                  >
                    info@sanskrutinx.com
                  </a>
                </div>
              </div>
              <div className="flex w-full gap-4 rounded-md border-[1px] border-gray-200 px-6 py-4">
                <PiWhatsappLogoThin className="h-8 w-8 text-gray-600" />
                <div className="flex flex-col gap-3 font-light">
                  <h4>WHATSAPP</h4>
                  <WhatsappNumber className="border-b-[1px] border-transparent hover:border-gray-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full max-w-[30rem] flex-col gap-6 bg-slate-100 p-6">
            <h3 className="text-xl font-semibold">Contact us</h3>
            <ContactUsForm />
          </div>
        </div>
      </div>

      {/* Our Store */}
      <div className="mx-auto flex max-w-4xl flex-col gap-9 px-[3vw] pb-6">
        <VisitOurStore />
      </div>

      <hr className="mx-auto w-full max-w-4xl px-[3vw]" />

      {/* Customer Care */}
      <div className="mx-auto flex max-w-4xl flex-col gap-9 px-[3vw] py-6">
        <h3 className="text-2xl font-semibold">Customer Care</h3>
        <div className="flex flex-col gap-2 text-sm text-gray-500">
          <p>
            Whatsapp: <WhatsappNumber />
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:info@sanskrutinx.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              info@sanskrutinx.com
            </a>
          </p>

          <p className="mt-4 max-w-lg">
            Shop No. 2, 3, 4, Yashoda Vinayak Sankul, Agra Rd, Opposite Suchak
            Petrol Pump, Kalyan(West), Maharashtra 421301
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
