import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";

/**
 * Returns the human-readable date/time as 'DD.MM.YYYY, HH:mm'
 * If target timezone is not specified, uses the local TZ
 * @param dateString (for example, in ISO 8601: "2021-04-14T03:25:34+00:00")
 * @param options
 */
const toReadable = (
  dateString: string | undefined | null,
  options: { format?: string; targetTZ?: string } = {}
): string | undefined => {
  //
  if (dateString === undefined || dateString === null) return undefined;

  dayjs.extend(utc);
  dayjs.extend(timezone);
  const { format = "DD.MM.YYYY, HH:mm", targetTZ = dayjs.tz.guess() } = options;
  const date = dayjs(dateString);

  return date.tz(targetTZ).format(format);
};

/**
 * Returns the human-readable date/time relative to now.
 * @param {string} dateString (for example, in ISO 8601: "2021-04-14T03:25:34+00:00")
 * @param {string} locale locale to use, default 'en'
 * @returns {string | undefined}
 */
const toRelative = (
  dateString: string | undefined | null,
  locale = "en"
): string | undefined => {
  //
  if (dateString === undefined || dateString === null) return undefined;

  dayjs.extend(relativeTime);
  dayjs.extend(updateLocale);

  dayjs.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      m: "1 minute",
      mm: "%d minutes",
      h: "1 hour",
      hh: "%d hours",
      d: "1 day",
      dd: "%d days",
      M: "1 month",
      MM: "%d months",
      y: "1 year",
      yy: "%d years",
    },
  });

  const date = dayjs(dateString);
  const threshold = dayjs().subtract(1, "year");
  if (date.isAfter(threshold)) return date.fromNow();

  return toReadable(dateString, { format: "MM.YYYY" });
};

export const DateUtil = {
  toReadable,
  toRelative,
};
