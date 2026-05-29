import { IconType } from "../components/CustomIcon";

export type User = {
  username: string;
  fullname: string;
  email: string;
};

export type CategoryIcon={
  name:string,
  type:IconType,
  icon:string
}