import { clientMutation } from "../core/client-api";

export const createProperty = async (data: any) => {
  return await clientMutation("/api/property", data);
};