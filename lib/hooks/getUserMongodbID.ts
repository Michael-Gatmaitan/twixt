import { useAppSelector } from "./reduxHooks";
import { selectMongodbID } from "../slices/userSlice";

export const useGetMongodbID = () => {
  const mongodbID = useAppSelector(selectMongodbID);
  return mongodbID;
};
