// Temp Static Data
export type FilterType = {
  main: string;
  sub: {
    title: string;
  }[];
};

export const filters: FilterType[] = [
  {
    main: "Salwar Kameez",
    sub: [
      { title: "Sharara Suits" },
      { title: "Anarkali Suits" },
      { title: "Palazzo Suits" },
      { title: "Kurta Set with Dupatta" },
      { title: "Jumpsuits" },
      { title: "Dhoti Suits" },
      { title: "Straight cut Salwar Kameez" },
      { title: "Printed Salwar Kameez" },
    ],
  },
  {
    main: "Lehenga's",
    sub: [
      { title: "Bridal lehengas" },
      { title: "Brides maid lehengas" },
      { title: "Croptop & Skirts lehengas" },
      { title: "Printed lehengas" },
      { title: "Jacket lehengas" },
      { title: "Drape lehengas" },
      { title: "Designer lehengas" },
    ],
  },
  {
    main: "Indo Western",
    sub: [
      { title: "Gown" },
      { title: "Indowestern Anarhati" },
      { title: "Jumpsuits" },
      { title: "Cape Suits" },
      { title: "Crop top Suits" },
      { title: "Ready Pleated Sarees" },
      { title: "Jacket lehengas" },
    ],
  },
  {
    main: "Kurti's",
    sub: [
      { title: "Gown" },
      { title: "Indowestern Anarhati" },
      { title: "Jumpsuits" },
      { title: "Cape Suits" },
      { title: "Crop top Suits" },
      { title: "Ready Pleated Sarees" },
      { title: "Jacket lehengas" },
    ],
  },
];
