import UIHeader from "@/components/common/header";
import { NextPage } from "next";

const ShippingPage: NextPage = () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-5 px-[3vw] pb-10 pt-44 text-lg">
      <UIHeader title="SHIPPING POLICY" />
      <div className="text-justify">
        <div className="font-semibold">Sanskruti nx</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, magni
        culpa officia beatae rem non qui quod illo amet consequuntur vero ipsum
        quidem nam deleniti voluptatum eaque harum voluptas est. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Commodi eius quasi neque,
        facilis laboriosam, saepe molestias repellendus facere tempore illo
        culpa deleniti in distinctio asperiores. Cum repellat laboriosam ipsa
        eligendi? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Maxime, ipsam eaque? Nesciunt deleniti ipsum dolor, praesentium quos
        quia unde, accusamus asperiores aliquam quam ipsa, accusantium dolorum
        consectetur vero debitis officiis.
      </div>
    </div>
  );
};

export default ShippingPage;
