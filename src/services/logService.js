import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
// import { config } from "config";

function init() {
  const sentryUrl = process.env.sentryUrl;
  console.log("sentryUrl", sentryUrl);
  Sentry.init({
    dsn: sentryUrl,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  console.log(error);
  Sentry.captureException(error);
}

const logger = {
  init,
  log,
};

export default logger;
