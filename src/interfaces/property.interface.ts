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
  | "others";

export type IPropertyStatus = "vacant" | "occupied" | "partially-occupied";
export type IPropertyCategories = "commercial" | "residential" | "others";

export interface IProperty {
  description?: string;
  title: string;
  propertyType: IPropertyType | "";
  status: IPropertyStatus;
  managedBy: string;
  features: {
    floors: number;
    bedroom: number;
    bathroom: number;
    maxCapacity: number;
    availableParking?: number;
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
  category: IPropertyCategories;
  address: string;
  managementFees: {
    amount: number | string;
    currency: string;
  };
  photos: IPropertyImages[] | [];
  totalUnits: number;
}
