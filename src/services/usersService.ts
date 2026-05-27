import { apiClient } from "./apiClient";
import type { ListUsersParams, UsersListResponse } from "../types/api";

const buildQuery = (params: ListUsersParams) => {
  const search = new URLSearchParams();
  if (params.page != null) search.set("page", String(params.page));
  if (params.limit != null) search.set("limit", String(params.limit));
  if (params.search?.trim()) search.set("search", params.search.trim());
  if (params.isActive !== undefined) search.set("isActive", String(params.isActive));
  if (params.isBanned !== undefined) search.set("isBanned", String(params.isBanned));
  const qs = search.toString();
  return qs ? `?${qs}` : "";
};

export const usersService = {
  listUsers(params: ListUsersParams = {}) {
    return apiClient.get<UsersListResponse>(`/users${buildQuery(params)}`, {
      auth: true,
    });
  },
};
