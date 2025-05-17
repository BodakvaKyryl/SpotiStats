import { formatDistanceToNow } from "date-fns";

export const formatTimeDistanceMobile = (date: Date): string => {
  const fullDistance = formatDistanceToNow(date, { addSuffix: true });

  const withoutAbout = fullDistance.replace("about ", "");

  return withoutAbout
    .replace(" hours", " h")
    .replace(" hour", " h")
    .replace(" minutes", " m")
    .replace(" minute", " m")
    .replace(" seconds", " s")
    .replace(" second", " s")
    .replace(" days", " d")
    .replace(" day", " d")
    .replace(" months", " mo")
    .replace(" month", " mo")
    .replace(" years", " y")
    .replace(" year", " y");
};
