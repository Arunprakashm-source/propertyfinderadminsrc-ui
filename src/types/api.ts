export type ApiEnvelope<T> = {
  status?: boolean;
  message?: string;
  code?: string;
  data?: T;
  details?: unknown;
};

export type UserCountryRef = {
  _id?: string;
  name?: string;
  code?: string;
  phoneCode?: string;
  flag?: string;
};

export type AdminUserListItem = {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  profilePicture?: string | null;
  profilePictureUrl?: string | null;
  country?: UserCountryRef | null;
  isActive?: boolean;
  isBanned?: boolean;
  createdAt?: string;
  lastLogin?: string;
};

export type UsersListPagination = {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type UsersListResponse = {
  users: AdminUserListItem[];
  pagination: UsersListPagination;
  counts?: {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    bannedUsers: number;
    verifiedEmails?: number;
    verifiedPhones?: number;
  };
};

export type ListUsersParams = {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  isBanned?: boolean;
  sortBy?: "all" | "active" | "inactive" | "banned";
};

export type AdminDeveloperListItem = {
  _id: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  profilePicture?: string | null;
  logo?: string | null;
  profilePictureUrl?: string | null;
  isActive?: boolean;
  isVerified?: boolean;
  isFeatured?: boolean;
  invitationStatus?: string;
  totalProjects?: number;
  projectCount?: number;
  nationality?: UserCountryRef | null;
  createdAt?: string;
  lastLogin?: string;
};

export type DevelopersListPagination = {
  currentPage: number;
  totalPages: number;
  totalDevelopers: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type DevelopersListCounts = {
  totalDevelopers: number;
  activeDevelopers: number;
  inactiveDevelopers: number;
  approvalPendingDevelopers: number;
  declinedDevelopers: number;
  invitedDevelopers: number;
  expiredDevelopers: number;
};

export type DevelopersListResponse = {
  developers: AdminDeveloperListItem[];
  pagination: DevelopersListPagination;
  counts?: DevelopersListCounts;
};

export type AdminAgencyListItem = {
  _id: string;
  agencyName?: string;
  email?: string;
  phoneNumber?: string;
  orn?: string;
  profilePicture?: string | null;
  profilePictureUrl?: string | null;
  isActive?: boolean;
  isVerified?: boolean;
  invitationStatus?: string;
  nationality?: UserCountryRef | null;
  createdAt?: string;
  lastLogin?: string;
  agentCount?: number;
};

export type AgenciesListPagination = {
  currentPage: number;
  totalPages: number;
  totalAgencies: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type AgenciesListCounts = {
  totalAgencies: number;
  activeAgencies: number;
  inactiveAgencies: number;
  approvalPendingAgencies: number;
  declinedAgencies: number;
  invitedAgencies: number;
  expiredAgencies: number;
};

export type AgenciesListResponse = {
  agencies: AdminAgencyListItem[];
  pagination: AgenciesListPagination;
  counts?: AgenciesListCounts;
};

export type ListAgenciesParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
};

export type AgencyDropdownItem = {
  _id: string;
  agencyName?: string;
  email?: string;
  profilePicture?: string | null;
  profilePictureUrl?: string | null;
  isVerified?: boolean;
  isActive?: boolean;
  invitationStatus?: string;
};

export type AgenciesDropdownResponse = {
  agencies: AgencyDropdownItem[];
};

export type AgentTypeOption = {
  name: string;
  value: string;
};

export type MasterDataAgentTypesResponse = {
  agentTypes?: AgentTypeOption[];
};

export type AgentExperienceOption = {
  name: string;
  value: string;
};

export type MasterDataAgentExperienceResponse = {
  agentExperience?: AgentExperienceOption[];
};

export type AdminAgentListItem = {
  _id: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  agentType?: string;
  profilePicture?: string | null;
  profilePictureUrl?: string | null;
  isActive?: boolean;
  isVerified?: boolean;
  invitationStatus?: string;
  agency?: {
    _id?: string;
    agencyName?: string;
    email?: string;
    profilePicture?: string | null;
    profilePictureUrl?: string | null;
  } | null;
  createdAt?: string;
  lastLogin?: string;
};

export type AgentsListPagination = {
  currentPage: number;
  totalPages: number;
  totalAgents: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type AgentsListCounts = {
  totalAgents: number;
  activeAgents: number;
  inactiveAgents: number;
  approvalPendingAgents: number;
  declinedAgents: number;
  invitedAgents: number;
  expiredAgents: number;
};

export type AgentsListResponse = {
  agents: AdminAgentListItem[];
  pagination: AgentsListPagination;
  counts?: AgentsListCounts;
};

export type ListAgentsParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  agency?: string;
};

export type InviteAgentPayload = {
  agencyId: string;
  email: string;
  fullName?: string;
  agentType?: string;
};

export type InviteAgentResponse = {
  email?: string;
  invitationToken?: string;
  expiresAt?: string;
};

export type JobTitleOption = {
  _id: string;
  title?: string;
  description?: string;
  isActive?: boolean;
};

export type JobTitleRecord = {
  _id: string;
  title: string;
  description?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type JobTitleListCounts = {
  totalJobTitles: number;
  activeJobTitles: number;
  inactiveJobTitles: number;
};

export type JobTitlesListPagination = {
  currentPage: number;
  totalPages: number;
  totalJobTitles: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type JobTitlesListResponse = {
  jobTitles: JobTitleRecord[];
  pagination: JobTitlesListPagination;
  counts?: JobTitleListCounts;
};

export type MasterDataJobTitlesResponse = {
  jobTitles?: JobTitleOption[];
};

export type LanguageRecord = {
  _id: string;
  name: string;
  code?: string;
  nativeName?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type LanguageListCounts = {
  totalLanguages: number;
  activeLanguages: number;
  inactiveLanguages: number;
};

export type LanguagesListPagination = {
  currentPage: number;
  totalPages: number;
  totalLanguages: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type LanguagesListResponse = {
  languages: LanguageRecord[];
  pagination: LanguagesListPagination;
  counts?: LanguageListCounts;
};

export type CountryCurrency = {
  code?: string;
  symbol?: string;
};

export type CountryRecord = {
  _id: string;
  name: string;
  code: string;
  phoneCode?: string;
  flag?: string;
  currency?: CountryCurrency;
  isActive: boolean;
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type CountryListCounts = {
  totalCountries: number;
  activeCountries: number;
  inactiveCountries: number;
};

export type CountriesListPagination = {
  currentPage: number;
  totalPages: number;
  totalCountries: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type CountriesListResponse = {
  countries: CountryRecord[];
  pagination: CountriesListPagination;
  counts?: CountryListCounts;
};

export type PropertyLocationRecord = {
  _id: string;
  cityKey: string;
  displayName: string;
  propertyCount: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ProjectLocationRecord = {
  _id: string;
  cityKey: string;
  displayName: string;
  projectCount: number;
  createdAt?: string;
  updatedAt?: string;
};

/** @deprecated Use PropertyLocationRecord or ProjectLocationRecord */
export type ListingSearchCityRecord = PropertyLocationRecord & {
  projectCount?: number;
};

export type PropertyLocationListCounts = {
  totalLocations: number;
  withPropertyListings?: number;
};

export type ProjectLocationListCounts = {
  totalLocations: number;
  withProjectListings?: number;
};

export type ListingSearchCitiesListPagination = {
  currentPage: number;
  totalPages: number;
  totalLocations: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type PropertyLocationsListResponse = {
  propertyLocations: PropertyLocationRecord[];
  pagination: ListingSearchCitiesListPagination;
  counts?: PropertyLocationListCounts;
};

export type ProjectLocationsListResponse = {
  projectLocations: ProjectLocationRecord[];
  pagination: ListingSearchCitiesListPagination;
  counts?: ProjectLocationListCounts;
};

export type PropertyTypeRecord = PropertyTypeMasterItem & {
  description?: string;
  totalListings?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type PropertyTypeListCounts = {
  totalPropertyTypes: number;
  activePropertyTypes: number;
  inactivePropertyTypes: number;
};

export type PropertyTypesListPagination = {
  currentPage: number;
  totalPages: number;
  totalPropertyTypes: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type PropertyTypesListResponse = {
  propertyTypes: PropertyTypeRecord[];
  pagination: PropertyTypesListPagination;
  counts?: PropertyTypeListCounts;
};

export type ListingTypeRecord = ListingTypeMasterItem & {
  category?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ListingTypeListCounts = {
  totalListingTypes: number;
  activeListingTypes: number;
  inactiveListingTypes: number;
};

export type ListingTypesListPagination = {
  currentPage: number;
  totalPages: number;
  totalListingTypes: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type ListingTypesListResponse = {
  listingTypes: ListingTypeRecord[];
  pagination: ListingTypesListPagination;
  counts?: ListingTypeListCounts;
};

export type AgentStatistics = {
  totalRevenueSales?: number;
  totalRevenueRent?: number;
  activeListings?: number;
  totalListings?: number;
  totalRentProperties?: number;
  totalSaleProperties?: number;
  totalInquiries?: number;
  newInquiries?: number;
  dealsClosedSales?: number;
  dealsClosedRent?: number;
  totalDeals?: number;
};

export type AdminAgentDetail = {
  _id: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  phoneNumberWithoutCode?: string;
  phoneCode?: string;
  whatsappNumber?: string;
  agentType?: string;
  profilePicture?: string | null;
  profilePictureUrl?: string | null;
  nationality?: UserCountryRef | null;
  specialization?: { _id?: string; title?: string } | null;
  agency?: {
    _id?: string;
    agencyName?: string;
    email?: string;
  } | null;
  invitationStatus?: string;
  isActive?: boolean;
  isVerified?: boolean;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  brokerLicenseNumber?: string;
  experience?: string | number;
  description?: string;
  aboutMe?: string;
  preferences?: {
    notificationSettings?: {
      email?: boolean;
      push?: boolean;
    };
  };
  statistics?: AgentStatistics;
  createdAt?: string;
  lastLogin?: string;
  lastActiveAt?: string;
  loginAttempts?: number;
};

export type AgentDetailResponse = {
  agent: AdminAgentDetail;
};

export type UpdateAgentPayload = {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  phoneCode?: string;
  nationality?: string;
  agentType?: string;
  specialization?: string;
  brokerLicenseNumber?: string;
  experience?: string | number;
  whatsappNumber?: string;
  aboutMe?: string;
  description?: string;
  isActive?: boolean;
  preferences?: {
    notificationSettings?: {
      email?: boolean;
      push?: boolean;
    };
  };
};

export type VerifyAgentPayload = {
  action: "approve" | "decline";
  specializationId?: string;
  agentType?: string;
  isActive?: boolean;
  reason?: string;
};

export type InviteAgencyPayload = {
  agencyName: string;
  email: string;
};

export type ListDevelopersParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
};

export type InviteDeveloperPayload = {
  name: string;
  email: string;
};

export type InviteDeveloperResponse = {
  email?: string;
  invitationToken?: string;
  expiresAt?: string;
};

export type DeveloperProjectsSummary = {
  total?: number;
  active?: number;
  offPlan?: number;
  storedTotalProjects?: number;
  completedProjects?: number;
  ongoingProjects?: number;
};

export type AdminDeveloperDetail = {
  _id: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  phoneNumberWithoutCode?: string;
  phoneCode?: string;
  profilePicture?: string | null;
  logo?: string | null;
  profilePictureUrl?: string | null;
  nationality?: UserCountryRef | null;
  invitationStatus?: string;
  isActive?: boolean;
  isVerified?: boolean;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  foundedYear?: number;
  website?: string;
  aboutUs?: string;
  description?: string;
  shortDescription?: string;
  longDescription?: string;
  registrationDocuments?: string[];
  preferences?: {
    notificationSettings?: {
      email?: boolean;
      push?: boolean;
    };
  };
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
    fullAddress?: string;
  };
  createdAt?: string;
  lastLogin?: string;
  lastActiveAt?: string;
  loginAttempts?: number;
};

export type DeveloperDetailResponse = {
  developer: AdminDeveloperDetail;
  projectsSummary?: DeveloperProjectsSummary;
};

export type UpdateDeveloperPayload = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  phoneCode?: string;
  nationality?: string;
  address?: {
    fullAddress?: string;
  };
  aboutUs?: string;
  website?: string;
  foundedYear?: number;
  isActive?: boolean;
  isVerified?: boolean;
  preferences?: {
    notificationSettings?: {
      email?: boolean;
      push?: boolean;
    };
  };
};

export type AgencyAgentsSummary = {
  total?: number;
  superAgents?: number;
  activeVerified?: number;
};

export type AgencyStatistics = {
  totalActiveListings?: number;
  totalInactiveListings?: number;
  totalAgents?: number;
  totalSuperAgents?: number;
  totalLeads?: number;
  thisMonthLeads?: number;
};

export type AdminAgencyDetail = {
  _id: string;
  agencyName?: string;
  email?: string;
  phoneNumber?: string;
  phoneNumberWithoutCode?: string;
  phoneCode?: string;
  orn?: string;
  profilePicture?: string | null;
  profilePictureUrl?: string | null;
  nationality?: UserCountryRef | null;
  invitationStatus?: string;
  isActive?: boolean;
  isVerified?: boolean;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  foundedYear?: number;
  website?: string;
  aboutUs?: string;
  description?: string;
  registrationDocuments?: string[];
  preferences?: {
    notificationSettings?: {
      email?: boolean;
      push?: boolean;
    };
  };
  address?: {
    fullAddress?: string;
  };
  createdAt?: string;
  lastLogin?: string;
  lastActiveAt?: string;
  loginAttempts?: number;
  statistics?: AgencyStatistics;
};

export type AgencyDetailResponse = {
  agency: AdminAgencyDetail;
  agentsSummary?: AgencyAgentsSummary;
};

export type UpdateAgencyPayload = {
  agencyName?: string;
  email?: string;
  phoneNumber?: string;
  phoneCode?: string;
  orn?: string;
  nationality?: string;
  address?: { fullAddress?: string };
  aboutUs?: string;
  description?: string;
  website?: string;
  foundedYear?: number;
  isActive?: boolean;
  preferences?: {
    notificationSettings?: {
      email?: boolean;
      push?: boolean;
    };
  };
};

export type SupportedUrlsResponse = {
  supportedUrls?: {
    userUrl?: { img?: string };
    propertyUrl?: { img?: string; vid?: string };
    projectUrl?: { img?: string; vid?: string; doc?: string };
    agencyUrl?: { img?: string; doc?: string };
    developerUrl?: { img?: string; doc?: string };
    agentUrl?: { img?: string; doc?: string };
  };
};

export type PropertyLocationOption = {
  _id?: string;
  cityKey?: string;
  displayName?: string;
  propertyCount?: number;
};

export type MasterDataPropertyLocationsResponse = {
  propertyLocations?: PropertyLocationOption[];
};

export type AgentDropdownItem = {
  _id: string;
  fullName?: string;
  email?: string;
  agentType?: string;
  profilePicture?: string | null;
  agency?: {
    _id?: string;
    agencyName?: string;
    profilePicture?: string | null;
  } | null;
};

export type AgentsDropdownResponse = {
  agents: AgentDropdownItem[];
};

export type AdminPropertyProfileRef = {
  _id?: string;
  fullName?: string;
  agencyName?: string;
  profilePicture?: string | null;
  profilePictureUrl?: string | null;
};

export type AdminPropertyImage = {
  url?: string;
  isPrimary?: boolean;
  order?: number;
};

export type AdminPropertyListItem = {
  _id: string;
  title?: string;
  slug?: string;
  status?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  isVerified?: boolean;
  price?: number;
  currency?: string;
  location?: {
    city?: string;
    zone?: string;
    fullAddress?: string;
  };
  listingType?: {
    _id?: string;
    name?: string;
    transaction?: string;
    category?: string;
  };
  propertyType?: {
    _id?: string;
    name?: string;
    slug?: string;
    category?: string;
  };
  agent?: AdminPropertyProfileRef | null;
  agency?: AdminPropertyProfileRef | null;
  images?: AdminPropertyImage[];
  rentPricing?: { yearly?: number; monthly?: number } | null;
  createdAt?: string;
  publishedAt?: string;
};

export type PropertiesListPagination = {
  currentPage: number;
  totalPages: number;
  totalProperties: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type PropertiesListResponse = {
  properties: AdminPropertyListItem[];
  pagination: PropertiesListPagination;
};

export type ListingTypeMasterItem = {
  _id: string;
  name?: string;
  slug?: string;
  transaction?: "buy" | "rent" | string;
  displayOrder?: number;
  isActive?: boolean;
};

export type MasterDataListingTypesResponse = {
  listingTypes?: ListingTypeMasterItem[];
  listingtypes?: ListingTypeMasterItem[];
};

export type PropertyTypeMasterItem = {
  _id: string;
  name?: string;
  slug?: string;
  category?: string;
  displayOrder?: number;
  isActive?: boolean;
};

export type NamedValueMasterItem = {
  name: string;
  value: string;
};

export type MasterDataPropertyClassificationResponse = {
  listingTypes?: ListingTypeMasterItem[];
  listingtypes?: ListingTypeMasterItem[];
  propertyTypes?: PropertyTypeMasterItem[];
  propertytypes?: PropertyTypeMasterItem[];
  furnishedStatus?: NamedValueMasterItem[];
  furnishedstatus?: NamedValueMasterItem[];
};

export type AmenityMasterItem = {
  _id: string;
  name?: string;
  slug?: string;
  category?: string;
  icon?: string;
  image?: string;
  imageUrl?: string | null;
  displayOrder?: number;
  isActive?: boolean;
};

export type AmenityRecord = AmenityMasterItem & {
  description?: string;
  usageCount?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type AmenityListCounts = {
  totalAmenities: number;
  activeAmenities: number;
  inactiveAmenities: number;
};

export type AmenitiesListPagination = {
  currentPage: number;
  totalPages: number;
  totalAmenities: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type AmenitiesListResponse = {
  amenities: AmenityRecord[];
  pagination: AmenitiesListPagination;
  counts?: AmenityListCounts;
};

export type MasterDataAmenitiesResponse = {
  amenities?: AmenityMasterItem[];
};

export type AdminPropertyAmenity = {
  _id: string;
  name?: string;
  slug?: string;
  category?: string;
  icon?: string;
  image?: string;
};

export type AdminPropertyDetail = {
  _id: string;
  title?: string;
  description?: string;
  slug?: string;
  listingType?: ListingTypeMasterItem;
  propertyType?: PropertyTypeMasterItem;
  bedrooms?: number;
  maidBedroom?: boolean;
  bathrooms?: number;
  area?: { sqm?: number; sqft?: number };
  amenities?: AdminPropertyAmenity[];
  price?: number;
  maintenanceFees?: number;
  serviceCharges?: number;
  currency?: string;
  images?: AdminPropertyImage[];
  virtualTour360?: string;
  videoTour?: string;
  floorPlan?: string[];
  location?: {
    fullAddress?: string;
    city?: string;
    zone?: string;
    building?: string;
    googlePlaceId?: string;
  };
  dldPermitNumber?: string;
  dldPermitUrl?: string;
  isActive?: boolean;
  status?: string;
  completionStatus?: string;
  furnishedStatus?: string;
  isPetFriendly?: boolean;
  isFeatured?: boolean;
  isVerified?: boolean;
  agent?: AdminPropertyProfileRef | null;
  agency?: AdminPropertyProfileRef | null;
  developer?: {
    _id?: string;
    name?: string;
    email?: string;
    profilePicture?: string;
  } | null;
  rentPricing?: { yearly?: number; monthly?: number } | null;
  publishedAt?: string;
  createdAt?: string;
};

export type PropertyDetailResponse = {
  property: AdminPropertyDetail;
};

export type ListPropertiesParams = {
  page?: number;
  limit?: number;
  search?: string;
  agent?: string;
  agency?: string;
  city?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  listingType?: string;
  transaction?: string;
};

export type CountryOption = {
  id: number;
  _id?: string;
  name: string;
  dialCode: string;
  code: string;
  flag: string;
};

export type MasterDataCountriesResponse = {
  countries?: Array<{
    _id?: string;
    name?: string;
    code?: string;
    phoneCode?: string;
    flag?: string;
    displayOrder?: number;
  }>;
};

export type UpdateUserPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  phoneCode?: string;
  countryId?: string;
  isActive?: boolean;
  isBanned?: boolean;
  bannedReason?: string;
  preferences?: {
    notificationSettings?: {
      email?: boolean;
      push?: boolean;
    };
  };
};

export type AdminUserDetail = {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  phoneNumberWithoutCode?: string;
  phoneCode?: string;
  profilePicture?: string | null;
  profilePictureUrl?: string | null;
  country?: UserCountryRef | null;
  authProvider?: string;
  isActive?: boolean;
  isBanned?: boolean;
  bannedReason?: string;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  isPhoneNumberVerified?: boolean;
  preferences?: {
    notificationSettings?: {
      email?: boolean;
      push?: boolean;
    };
  };
  createdAt?: string;
  lastLogin?: string;
  lastActiveAt?: string;
  loginAttempts?: number;
};

export type UserDetailResponse = {
  user: AdminUserDetail;
  activity?: {
    lastActivityDate?: string;
  };
};

export type ReportType = "property" | "agent" | "agency" | "user" | "review" | "project";
export type ReportUserType = "developer" | "agency" | "agent" | "user";
export type ReportStatus =
  | "pending"
  | "under-review"
  | "reviewed"
  | "resolved"
  | "rejected"
  | "escalated";
export type ReportPriority = "low" | "medium" | "high" | "urgent";

export type AdminReportListItem = {
  _id: string;
  reportType?: ReportType;
  reportedItem?: string;
  reportedItemLabel?: string;
  reportedBy?: string | null;
  reporterEmail?: string;
  userType?: ReportUserType;
  reason?: string;
  description?: string;
  attachments?: string[];
  status?: ReportStatus;
  priority?: ReportPriority;
  reviewedBy?: string | null;
  reviewedAt?: string | null;
  actionTaken?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AdminReportDetail = AdminReportListItem & {
  reviewNotes?: string;
  resolution?: {
    status?: string;
    notes?: string;
    resolvedBy?: string | null;
    resolvedAt?: string | null;
  } | null;
  internalNotes?: Array<{
    note?: string;
    addedBy?: string | null;
    addedAt?: string | null;
  }>;
};

export type ReportsListResponse = {
  reports: AdminReportListItem[];
  pagination: { page: number; limit: number; total: number; pages: number };
  counts?: { pending: number; underReview: number; resolved: number; urgentOpen: number };
};

export type ReportDetailResponse = {
  report: AdminReportDetail;
};

export type ListReportsParams = {
  page?: number;
  limit?: number;
  status?: ReportStatus;
  priority?: ReportPriority;
  reportType?: ReportType;
  userType?: ReportUserType;
  search?: string;
  startDate?: string;
  endDate?: string;
  counts?: boolean;
};

export type DeveloperDropdownItem = {
  _id: string;
  name?: string;
  email?: string;
  profilePicture?: string | null;
  profilePictureUrl?: string | null;
  isVerified?: boolean;
  isActive?: boolean;
  invitationStatus?: string;
};

export type DevelopersDropdownResponse = {
  developers: DeveloperDropdownItem[];
};

export type ProjectLocationOption = {
  _id?: string;
  cityKey?: string;
  displayName?: string;
  projectCount?: number;
};

export type MasterDataProjectLocationsResponse = {
  projectLocations?: ProjectLocationOption[];
  projectlocations?: ProjectLocationOption[];
};

export type AdminProjectAgencyRef = {
  _id?: string;
  agencyName?: string;
  email?: string;
  profilePicture?: string | null;
};

export type AdminProjectDeveloperRef = {
  _id?: string;
  name?: string;
  email?: string;
  profilePicture?: string | null;
};

export type AdminProjectImage = {
  url?: string;
  isPrimary?: boolean;
  order?: number;
};

export type AdminProjectListItem = {
  _id: string;
  projectName?: string;
  slug?: string;
  projectType?: string;
  publishStatus?: string;
  status?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  isVerified?: boolean;
  location?: { city?: string; zone?: string; address?: string };
  launchPrice?: { startingFrom?: number; currency?: string };
  priceLabel?: string | null;
  developer?: AdminProjectDeveloperRef | null;
  authorizedAgencies?: AdminProjectAgencyRef[];
  authorizedAgencyNames?: string[];
  images?: AdminProjectImage[];
  totalUnits?: number;
  publishedAt?: string;
  createdAt?: string;
};

export type ProjectsListResponse = {
  projects: AdminProjectListItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProjects: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

export type AdminProjectDetail = Record<string, unknown> & {
  _id?: string;
  projectName?: string;
  description?: string;
  aboutProject?: string;
  projectType?: string;
  publishStatus?: string;
  status?: string;
  location?: Record<string, unknown>;
  launchPrice?: { startingFrom?: number; currency?: string };
  governmentFees?: number;
  paymentPlans?: unknown[];
  images?: AdminProjectImage[];
  masterPlan?: string[];
  brochure?: string;
  videoTour?: string;
  virtualTour360?: string;
  amenities?: AmenityMasterItem[];
  developer?: AdminProjectDeveloperRef | null;
  authorizedAgencies?: AdminProjectAgencyRef[];
  faqs?: Array<{ _id?: string; question?: string; answer?: string }>;
  isDldRegistered?: boolean;
  dldRegistrationNumber?: string;
  totalUnits?: number;
  availableUnits?: number;
  soldUnits?: number;
  reservedUnits?: number;
};

export type ProjectDetailResponse = {
  project: AdminProjectDetail;
  unitProperties?: Array<Record<string, unknown>>;
  unitSummary?: {
    total?: number;
    available?: number;
    sold?: number;
    reserved?: number;
  };
};
