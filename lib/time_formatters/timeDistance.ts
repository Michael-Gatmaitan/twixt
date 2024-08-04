import { formatDistance, subDays } from "date-fns";

export const timeDistance = (createdAt: Date | string) => {
  return formatDistance(subDays(new Date(createdAt), 0), new Date(), {
    addSuffix: true,
  });
};
