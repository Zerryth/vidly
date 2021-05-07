import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_URL,
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
