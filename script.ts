// it is being used in utils/track.ts - this is just a copy of that file
import { apiTrack } from "../services/event";
import { getAnonymousUserId, getSessionId } from "./helpers";
import { AnalyticsEvent } from "~/types";

export async function trackEvent(
  eventName: string,
  eventData: Record<string, any> = {}
) {
  if (typeof window === "undefined") {
    console.warn(
      "window is not defined. Skipping tracking event on server-side:",
      eventName
    );
    return;
  }

  const { userId, sessionId, durationMs, products, ...remainingEventData } =
    eventData;

  const userID = userId || getAnonymousUserId();

  const goBackendPayload: AnalyticsEvent = {
    eventType: eventName,
    userId: String(userID),
    sessionId: sessionId || getSessionId(),
    timestamp: new Date().toISOString(),
    pagePath: window.location.pathname,
    referrer: document.referrer || "",
    userAgent: navigator.userAgent || "",
    durationMs: Math.round(performance.now() || 0),
    products: products || {},
    location: Intl.DateTimeFormat().resolvedOptions().timeZone || undefined,
    eventData:
      Object.keys(remainingEventData).length > 0
        ? { eventData: { ...remainingEventData } }
        : {},
  };

  const payloadArray = [goBackendPayload];
  await apiTrack(payloadArray);
}
