import { apiClient } from "./apiClient";
import type {
  ListPropertiesParams,
  ListingTypeMasterItem,
  MasterDataListingTypesResponse,
  MasterDataPropertyLocationsResponse,
  PropertiesListResponse,
  PropertyLocationOption,
  SupportedUrlsResponse,
} from "../types/api";

const buildQuery = (params: ListPropertiesParams) => {
  const search = new URLSearchParams();
  if (params.page != null) search.set("page", String(params.page));
  if (params.limit != null) search.set("limit", String(params.limit));
  if (params.search?.trim()) search.set("search", params.search.trim());
  if (params.agent?.trim()) search.set("agent", params.agent.trim());
  if (params.agency?.trim()) search.set("agency", params.agency.trim());
  if (params.city?.trim()) search.set("city", params.city.trim());
  if (params.startDate?.trim()) search.set("startDate", params.startDate.trim());
  if (params.endDate?.trim()) search.set("endDate", params.endDate.trim());
  if (params.sortBy?.trim()) search.set("sortBy", params.sortBy.trim());
  if (params.listingType?.trim()) search.set("listingType", params.listingType.trim());
  if (params.transaction?.trim()) search.set("transaction", params.transaction.trim());
  const qs = search.toString();
  return qs ? `?${qs}` : "";
};

export const propertiesService = {
  listProperties(params: ListPropertiesParams = {}, signal?: AbortSignal) {
    return apiClient.get<PropertiesListResponse>(`/properties${buildQuery(params)}`, {
      auth: true,
      signal,
    });
  },
  async getSupportedUrls(signal?: AbortSignal): Promise<SupportedUrlsResponse> {
    return apiClient.get<SupportedUrlsResponse>("/master-data?types=supportedurls", {
      auth: true,
      signal,
    });
  },
  async listPropertyLocations(signal?: AbortSignal): Promise<PropertyLocationOption[]> {
    const data = await apiClient.get<MasterDataPropertyLocationsResponse>(
      "/master-data?types=propertylocations",
      { auth: true, signal }
    );
    return (data.propertyLocations ?? []).filter((loc) => loc?.displayName?.trim());
  },
  async listListingTypes(signal?: AbortSignal): Promise<ListingTypeMasterItem[]> {
    const data = await apiClient.get<MasterDataListingTypesResponse>(
      "/master-data?types=listingtypes",
      { auth: true, signal }
    );
    return (data.listingTypes ?? data.listingtypes ?? []).filter((item) => item?._id);
  },
};
