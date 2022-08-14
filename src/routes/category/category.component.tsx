import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import {useSelector} from 'react-redux';

import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector';

import ProductCard from '../../components/product-card/product-card.component';

import Spinner from '../../components/spinner/spinner.component';

import './category.styles.tsx';
import { CategoryContainer, Title } from './category.styles';
import React from 'react';

type CategoryRouteParams = {
	category: string;
}

const Category = () => {
	const categoriesMap = useSelector(selectCategoriesMap);

	const {category} = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;

	const isLoading = useSelector(selectCategoriesIsLoading);

	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
	  setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);
	
  return (
	<>
		<Title>{category.toUpperCase()}</Title>
		{
			isLoading ? <Spinner/> : <CategoryContainer>
			{
				products && products.map((product) => <ProductCard key={product.id} product={product}/>)
			}
		</CategoryContainer>
		}
	</>
  )
}

export default Category;