import { apiClient } from "./apiClient";
import type { DevelopersListResponse, ListDevelopersParams } from "../types/api";

const buildQuery = (params: ListDevelopersParams) => {
  const search = new URLSearchParams();
  if (params.page != null) search.set("page", String(params.page));
  if (params.limit != null) search.set("limit", String(params.limit));
  if (params.search?.trim()) search.set("search", params.search.trim());
  if (params.sortBy?.trim()) search.set("sortBy", params.sortBy.trim());
  const qs = search.toString();
  return qs ? `?${qs}` : "";
};

export const developersService = {
  listDevelopers(params: ListDevelopersParams = {}) {
    return apiClient.get<DevelopersListResponse>(
      `/developers${buildQuery(params)}`,
      { auth: true }
    );
  },
};
