import axios from "axios";
import { cache } from "react";

export const revalidate = 60;

export const getData = cache(
  async (field: "returnPolicy" | "termsAndConditions" | "privacyPolicy") => {
    try {
      const response = await axios.get(
        `${process.env.ENDPOINT}/api/v1/user/getMarkdown?field=${field}`
      );
      return response.data.markdown;
    } catch (err) {
      return "Something went wrong";
    }
  }
);
