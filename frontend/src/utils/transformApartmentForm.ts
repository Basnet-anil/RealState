import { ApartmentFormValues } from "@/types/forms";

export interface TransformedApartmentFormData {
  price: number;
  propertyCode: string;
  type: string;
  status: string;
  purpose: string;
  province: number | null;
  district: number | null;
  municipality: number | null;
  ward: number | null;
 thumbnailImageId?: string | null;
  normalImageIds?: string[] | null;  
   details: {
    floors: number;
    apartmentType: string;
    builtYear: number | null;
    facilities: string[];
    facing: string;
        bathrooms: number;
        bedrooms: number;
    kitchens: number;
    livingRooms: number;
    parking: number;

    totalFloors: number;
    landArea: {
      unit: string;
      value: number;
    };
    frontage: {
      unit: string;
      value: number;
    };
     builtInArea: {
      unit: string;
      value: number;
    };
    description: {
      en: string;
      np: string;
    };
    furnishing: string;

  };
}

export const transformApartmentForm = (
  data: ApartmentFormValues,
  uploadedImageIds: string[] = [],
  edit: boolean = false,
  thumbnailImageId?: string | null,
): TransformedApartmentFormData => {
  const baseData: TransformedApartmentFormData = {
    price: Number(data.askingPrice),
    propertyCode: data.propertyCode,
    type: "apartment",
    status: data.status,
    purpose: data.propertyPurpose,
    province: data.province ?? null,
    district: data.district ?? null,
    municipality: data.municipality ?? null,
    ward: data.wardNo ?? null,
    details: {
      bathrooms: Number(data.bathrooms ?? 0),
       bedrooms: data.bedrooms,
      kitchens: data.kitchens,
      floors: data.floors,
      livingRooms: data.livingRooms,
      parking: data.parkingSpaces,
      apartmentType: data.apartmentType,
      builtYear: data.builtYear ? Number(data.builtYear) : null,
      facilities: data.facilities ?? [],
      facing: data.facing,
      totalFloors: data.floors,
      landArea: {
        unit: data.landAreaUnit,
        value: Number(data.landArea),
      },
       builtInArea: {
        unit: data.builtAreaUnit,
        value: Number(data.builtArea),
      },
      frontage: {
        unit: data.frontageUnit,
        value: Number(data.frontage),
      },
      description: {
        en: data.description,
        np: data.descriptionNp ?? "",
      },
      furnishing: data.furnished,
    },

  };
  if (!edit) {
    baseData.normalImageIds = uploadedImageIds ?? [];
    baseData.thumbnailImageId = thumbnailImageId ?? null;
  }
  return baseData;
};
