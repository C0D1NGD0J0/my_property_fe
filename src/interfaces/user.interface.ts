import { Document } from "mongoose";

// USER
export enum AccountType {
  individual = "individual",
  enterprise = "enterprise",
}

export type AccountTypes = "individual" | "enterprise";

export enum UserRelationshipsEnum {
  parents = "parents",
  sibling = "sibling",
  spouse = "spouse",
  child = "child",
  other = "other",
}

export type SignupDataType = Pick<
  ClientDocumentType,
  "accountType" | "enterpriseProfile"
> &
  Omit<
    UserType,
    | "activationToken"
    | "passwordResetToken"
    | "activationTokenExpiresAt"
    | "passwordResetTokenExpiresAt"
  >;

// USER TYPE
export type UserType = {
  uid: string;
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  location?: string;
  phoneNumber?: string;
  emergencyContact?: {
    name: string;
    email?: string;
    phoneNumber: string;
    relationship: UserRelationshipsEnum;
  };
  activationToken?: string;
  passwordResetToken?: string;
  enterpriseProfile?: EnterpriseInfoType;
  activationTokenExpiresAt: Date | number | null;
  passwordResetTokenExpiresAt: Date | number | null;
};

export type InviteUserSignupType = {
  cid: string;
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  location?: string;
  userType: UserRoleType;
  phoneNumber?: string;
  emergencyContact?: {
    name: string;
    email?: string;
    phoneNumber: string;
    relationship: UserRelationshipsEnum;
  };
  userId?: string;
};

type ClientUserConnectionsType = {
  cid: string;
  role: string;
  isConnected: boolean;
};

export type UserDocumentType = UserType &
  Document & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    fullname?: string;
    _id?: string;
    deletedAt: Date | null;
    cids: ClientUserConnectionsType[];
    validatePassword: (pwd1: string) => Promise<boolean>;
  };

// CLIENT
export type ClientDocumentType = Document & {
  id: string;
  cid: string;
  createdAt: Date;
  updatedAt: Date;
  _id?: string;
  admin: string;
  accountType: AccountTypes;
  subscription: string | null;
  enterpriseProfile?: EnterpriseInfoType;
};

export enum UserRole {
  ADMIN = "admin",
  TENANT = "tenant",
  MANAGER = "manager",
  EMPLOYEE = "employee",
}

export type UserRoleType = "admin" | "tenant" | "manager" | "employee";

type EnterpriseInfoType = {
  contactInfo: {
    email: string;
    address: string;
    computedLocation?: {
      type: string;
      coordinates: [number, number];
      address?: {
        street: string | undefined;
        city: string | undefined;
        state: string | undefined;
        country: string | undefined;
        postCode: string | undefined;
        streetNumber: string | undefined;
      };
      latAndlon?: string;
    };
    phoneNumber: string;
    contactPerson: string;
  };
  companyName: string;
  legaEntityName: string;
  taxId?: string;
  businessRegistration: string;
};

// TENANT TYPE
export type TenantType = UserType & {
  cid: string;
  activatedAt: Date;
  managedBy: string;
  rentalHistory?: string[];
  paymentRecords?: string[];
  user: string;
  leaseAgreements?: string[];
  activeLeaseAgreement?: string;
  maintenanceRequests?: string[];
  activationCode: string | undefined;
};

export type TenantDocumentType = TenantType &
  Document & {
    _id?: string;
    createdAt: Date;
    updatedAt: Date;
  };

// REFRESH-TOKEN
type RefreshTokenDocumentType = Document & {
  token: string;
  user: string;
};

export type RefreshTokenType = RefreshTokenDocumentType;

export type CurrentUserType = {
  id: string;
  uid: string;
  cid: string;
  role: string;
  email: string;
  isActive: boolean;
  fullname: string | null;
  isSubscriptionActive: boolean;
};

export interface PricingCardProps {
  id: string;
  name: string;
  amount: string;
  currency: string;
  recurring: string;
  features: string[];
  handlePlanSelection: (id: string, name: string) => void;
}
