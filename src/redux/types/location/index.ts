export interface ILocation {
  code: number;
  codename: string;
  districts: ILocation[];
  division_type: string;
  name: string;
}

export type IProvice = Array<ILocation>;
export type IDistrict = Array<ILocation>;
export type IWard = Array<ILocation>;

export type ILocationPayload = {
  code: string;
};
