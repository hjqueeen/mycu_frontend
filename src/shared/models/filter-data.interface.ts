export interface FilterData {
  contains: {
    abc: boolean;
    def: boolean;
    ghi: boolean;
    jkl: boolean;
    mno: boolean;
    pqrs: boolean;
    tuv: boolean;
    wxyz: boolean;
  };
  select: string;
  sort: {
    ascending: boolean;
    descending: boolean;
  };
}
