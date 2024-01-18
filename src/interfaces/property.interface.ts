interface IPropertyImages {
  url: string;
  filename: string;
  key: string;
}

export type IPropertyType =
  | "singleFamily"
  | "multiUnits"
  | "apartments"
  | "officeUnits"
  | "hotel"
  | "others";

export type IPropertyStatus =
  | "vacant"
  | "occupied"
  | "partially-occupied"
  | "unavailable";
export type IPropertyCategories = "commercial" | "residential" | "others";

export interface IProperty {
  title: string;
  description?: {
    text: string;
    html: string;
  };
  propertyType: IPropertyType | string;
  status: IPropertyStatus | string;
  managedBy: string;
  propertySize: number;
  features: {
    floors: number;
    bedroom: number;
    bathroom: number;
    maxCapacity: number;
    availableParking: number;
  };
  extras: {
    has_tv: boolean;
    has_kitchen: boolean;
    has_ac: boolean;
    has_heating: boolean;
    has_internet: boolean;
    has_gym: boolean;
    has_parking: boolean;
    has_swimmingpool: boolean;
    has_laundry: boolean;
    petsAllowed: boolean;
  };
  category: IPropertyCategories | string;
  address: string;
  fees: {
    currency: string;
    includeTax: boolean;
    taxAmount: number;
    rentalAmount: number | string;
    managementFees: number | string;
  };
  photos: IPropertyImages[] | [];
  totalUnits: number;
}
