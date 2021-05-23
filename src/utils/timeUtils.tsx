import moment from "moment";
export const toLocalTime = (time: string | Date | undefined) => {
  return moment.utc(time?.toString()).local().format("YYYY-MM-DD HH:mm:ss");
};
