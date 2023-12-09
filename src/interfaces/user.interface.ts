export interface PricingCardProps {
  id: string;
  name: string;
  amount: string;
  currency: string;
  recurring: string;
  features: string[];
  selectedPlan: {
    name: string;
    planId: string;
    isEnterpriseAccount: boolean;
  };
  setFieldValue: (fieldName: string, value: any) => void;
}

export interface IInitialValues {
  email: string;
  firstName: string;
  lastName: string;
  location: string;
  phoneNumber: string;
  password: string;
  cpassword: string;
  accountType: null | {
    name: string;
    planId: string;
    isEnterpriseAccount: boolean;
  };
  companyName?: string;
  businessIdNumber?: string;
}

export interface IVerificationInitValues {
  accountCode: string | null;
}

export interface ICurrentUser {
  id: string;
  uid: string;
  cid: string;
  role: string;
  email: string;
  isActive: boolean;
  linkedAccounts: { cid: string; name: string }[];
  fullname: string | null;
  isSubscriptionActive?: boolean;
}

export interface IEditUser {
  email: string;
  firstName: string;
  lastName: string;
  location: string;
  phoneNumber: string;
  password: string;
  companyName: string;
  newPassword: string;
  notifications: {
    sms: boolean;
    email: boolean;
  };
}

interface Identification {
  idType: string;
  idNumber: string;
  authority: string;
  issueDate: string;
  expiryDate: string;
  issuingState: string;
}

interface ContactInfo {
  email: string;
  address: string;
  phoneNumber: string;
  contactPerson: string;
}

export interface IEditClient {
  contactInfo: ContactInfo;
  companyName: string;
  legalEntityName: string;
  identification: Identification;
  businessRegistrationNumber: string;
}
