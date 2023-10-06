export interface PricingCardProps {
  id: string;
  name: string;
  amount: string;
  currency: string;
  recurring: string;
  features: string[];
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
    id: string;
    isEnterpriseAccount: boolean;
  };
  companyName?: string;
  businessIdNumber?: string;
}
