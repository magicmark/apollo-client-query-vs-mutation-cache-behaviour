import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./apollo-client";
import App from "./App";

async function bootstrap() {
  // Register the service worker that intercepts /graphql requests.
  // Wait for it to be ready before rendering so the first fetch is caught.
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.register("/sw.js");

    // If the SW is installing for the first time, wait until it activates
    if (registration.installing) {
      await new Promise<void>((resolve) => {
        registration.installing!.addEventListener("statechange", (e) => {
          if ((e.target as ServiceWorker).state === "activated") {
            resolve();
          }
        });
      });
    }

    // Ensure this page is controlled by the service worker
    if (!navigator.serviceWorker.controller) {
      // skipWaiting + clients.claim() in the SW should handle this,
      // but wait for the controllerchange event just in case
      await new Promise<void>((resolve) => {
        navigator.serviceWorker.addEventListener("controllerchange", () => resolve());
        // Resolve immediately if already controlled after a brief tick
        setTimeout(() => resolve(), 100);
      });
    }
  }

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </React.StrictMode>
  );
}

bootstrap();
