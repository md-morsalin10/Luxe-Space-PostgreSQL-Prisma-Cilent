import { serverFetch } from "../core/server-api";

export const getUsers = async() => {
    return await serverFetch(`/api/users`);
};