import axios from "axios";

export const getData = async (
  field: "returnPolicy" | "termsAndConditions" | "privacyPolicy"
) => {
  try {
    const response = await axios.get(
      `${process.env.ENDPOINT}/api/v1/user/getMarkdown?field=${field}`
    );
    return response.data.markdown;
  } catch (err) {
    return "Something went wrong";
  }
};
