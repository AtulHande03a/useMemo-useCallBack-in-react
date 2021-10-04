import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useFetch } from "../setup/useFetch";

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/javascript-store-products";

// every time props or state changes, component re-renders

const calculateMostExpensive = (data) => {
  console.log("hello");
  return (
    data.reduce((total, item) => {
      const price = item.fields.price;
      if (price >= total) {
        total = price;
      }
      return total;
    }, 0) / 100
  );
};

const Index = () => {
  const { products } = useFetch(url);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState(0);

  const addToCart = useCallback(() => {
    setCart(cart + 1);
  }, [cart]);

  const mostExpensive = useMemo(() => calculateMostExpensive(products), [
    products
  ]);

  return (
    <>
      <h1>Count : {count}</h1>
      <button className="btn" onClick={() => setCount(count + 1)}>
        click me
      </button>
      <h1 style={{ marginTop: "3rem" }}>Cart:{cart}</h1>
      <h2>Most Expensive: ${mostExpensive}</h2>
      <BigList products={products} addToCart={addToCart} />
    </>
  );
};

//memo method in react cheks is the value of props gets
//updated or not , if it does'nt then the re-render of this component does not take place

const BigList = React.memo(({ products, addToCart }) => {
  console.log("biglist called");
  return (
    <section className="products">
      {products.map((product) => {
        return (
          <SingleProduct
            key={product.id}
            {...product}
            addToCart={addToCart}
          ></SingleProduct>
        );
      })}
    </section>
  );
});

const SingleProduct = ({ fields, addToCart }) => {
  console.count("single item called");
  let { name, price } = fields;
  price = price / 100;
  const image = fields.image[0].url;

  return (
    <article className="product">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
      <button onClick={addToCart}>addToCart</button>
    </article>
  );
};
export default Index;
