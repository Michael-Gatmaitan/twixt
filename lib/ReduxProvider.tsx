"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "./store";

interface ReduxProviderType {
  children: React.ReactNode;
}

const ReduxProvider = ({ children }: ReduxProviderType) => {
  // Call an API for checking if user is authorized
  // Store
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
