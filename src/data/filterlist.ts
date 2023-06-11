// Temp Static Data
export type FilterType = {
  main: string;
  image: string;
  link: string;
  sub: {
    title: string;
  }[];
};

export const filters: FilterType[] = [
  {
    main: "Salwar Kameez",
    image: "/temp/Salwar Kameez.png",
    link: "/category/Salwar Kameez",
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
    image: "/temp/Lehenga's.png",
    link: "/category/Lehenga's",
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
    image: "/temp/Indo Western.png",
    link: "/category/Indo Western",
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
    main: "Bridal",
    image: "/temp/Bridal.png",
    link: "/category/Bridal",
    sub: [],
  },
  {
    main: "Kurti's",
    image: "/temp/Kurti's.png",
    link: "/category/Kurti's",
    sub: [],
  },
  {
    main: "Western Wear",
    image: "/temp/Western Wear.png",
    link: "/category/Western Wear",
    sub: [],
  },
  {
    main: "Dress Material's",
    image: "/temp/Dress Material's.png",
    link: "/category/Dress Material's",
    sub: [],
  },
];
