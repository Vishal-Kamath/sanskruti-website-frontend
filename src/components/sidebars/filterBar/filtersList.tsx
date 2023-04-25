import { selectFilterMain } from '@/slice/filter.slice';
import { useAppSelector } from '@/store/hooks';
import React, { useState, useEffect } from 'react';
import FilterItem from './filterItem';

// Temp Static Data
type FilterType = {
  main: string;
  sub: {
    title: string;
  }[];
};

export const filters: FilterType[] = [
  {
    main: 'Salwar Kameez',
    sub: [
      { title: 'Sharara Suits' },
      { title: 'Anarkali Suits' },
      { title: 'Palazzo Suits' },
      { title: 'Kurta Set with Dupatta' },
      { title: 'Jumpsuits' },
      { title: 'Dhoti Suits' },
      { title: 'Straight cut Salwar Kameez' },
      { title: 'Printed Salwar Kameez' },
    ],
  },
  {
    main: "Lehenga's",
    sub: [
      { title: 'Bridal lehengas' },
      { title: 'Brides maid lehengas' },
      { title: 'Croptop & Skirts lehengas' },
      { title: 'Printed lehengas' },
      { title: 'Jacket lehengas' },
      { title: 'Drape lehengas' },
      { title: 'Designer lehengas' },
    ],
  },
  {
    main: 'Indo Western',
    sub: [
      { title: 'Gown' },
      { title: 'Indowestern Anarhati' },
      { title: 'Jumpsuits' },
      { title: 'Cape Suits' },
      { title: 'Crop top Suits' },
      { title: 'Ready Pleated Sarees' },
      { title: 'Jacket lehengas' },
    ],
  },
  {
    main: "Kurti's",
    sub: [
      { title: 'Gown' },
      { title: 'Indowestern Anarhati' },
      { title: 'Jumpsuits' },
      { title: 'Cape Suits' },
      { title: 'Crop top Suits' },
      { title: 'Ready Pleated Sarees' },
      { title: 'Jacket lehengas' },
    ],
  },
];

const Size: FilterType = {
  main: 'Size',
  sub: [
    { title: 'XS' },
    { title: 'S' },
    { title: 'M' },
    { title: 'L' },
    { title: 'XL' },
  ],
};

const Color: FilterType = {
  main: 'Color',
  sub: [
    { title: 'Black' },
    { title: 'White' },
    { title: 'Blue' },
    { title: 'Pink' },
    { title: 'Purple' },
  ],
};

const FilterList: React.FC = () => {
  const mainFilter = useAppSelector(selectFilterMain);
  const [main, setMain] = useState(filters[0]);

  useEffect(() => {
    setMain(filters.find((filter) => filter.main === mainFilter) ?? filters[0]);
  }, []);

  return (
    <div className="flex flex-col">
      <FilterItem main={main.main} sub={main.sub} />
      <FilterItem {...Size} />
      <FilterItem {...Color} />
    </div>
  );
};

export default FilterList;
