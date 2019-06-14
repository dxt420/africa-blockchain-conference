export type Sponsor = {
  id: number;
  name?: string;
  title?: string;

}

export type Query = {
    allSponsors: Sponsor[];
}
