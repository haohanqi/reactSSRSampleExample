import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./client/App";
const props = window.__INITIAL_PROPS__;
console.info("props:", props);
hydrateRoot(document, <App {...props} />);
