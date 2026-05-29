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
    bannedUsers: number;
    verifiedEmails: number;
    verifiedPhones: number;
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

export type DevelopersListResponse = {
  developers: AdminDeveloperListItem[];
  pagination: DevelopersListPagination;
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

export type AgenciesListResponse = {
  agencies: AdminAgencyListItem[];
  pagination: AgenciesListPagination;
};

export type ListAgenciesParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
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
    agencyUrl?: { img?: string; doc?: string };
    developerUrl?: { img?: string; doc?: string };
  };
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
