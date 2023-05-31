"use client";

import React, { HTMLAttributes } from "react";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

interface Props extends HTMLAttributes<typeof Provider> {}
const ProviderComponent: React.FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderComponent;
