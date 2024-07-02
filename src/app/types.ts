export interface IpSearch {
  id: string;
  ip: string | null;
  country: string | null;
  time: string | null;
}

export interface IpSearchResponse {
  ip: string;
  country: string;
}
