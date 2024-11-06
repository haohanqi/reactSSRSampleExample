import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./client/App";

hydrateRoot(document.getElementById("root"), <App />);
