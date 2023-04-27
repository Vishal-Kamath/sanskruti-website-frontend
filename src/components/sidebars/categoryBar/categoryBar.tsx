import React from 'react';
import CategoryCard from './categoryCard';

const categoryList: { image: string; title: string; link: string }[] = [
  {
    title: 'Salwar Kameez',
    image: '/temp/Salwar Kameez.png',
    link: '/category/Salwar Kameez',
  },
  {
    title: "Lehenga's",
    image: "/temp/Lehenga's.png",
    link: "/category/Lehenga's",
  },
  {
    title: 'Indo Western',
    image: '/temp/Indo Western.png',
    link: '/category/Indo Western',
  },
  {
    title: 'Bridal',
    image: '/temp/Bridal.png',
    link: '/category/Bridal',
  },
  {
    title: "Kurti's",
    image: "/temp/Kurti's.png",
    link: "/category/Kurti's",
  },
  {
    title: 'Western Wear',
    image: '/temp/Western Wear.png',
    link: '/category/Western Wear',
  },
  {
    title: "Dress Material's",
    image: "/temp/Dress Material's.png",
    link: "/category/Dress Material's",
  },
];

const CategoryBar: React.FC = () => {
  return (
    <>
      <div className="custom_scrollbar flex gap-2 overflow-auto py-2">
        {categoryList.map((category) => (
          <CategoryCard key={category.title} {...category} />
        ))}
      </div>
    </>
  );
};

export default CategoryBar;
