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
};
