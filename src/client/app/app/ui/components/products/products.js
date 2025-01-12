"use client";
import Pagination from "../pagination/pagination";
import Card from "../card/card";
import { useState, useEffect } from "react";
import Filter from "../filter/filter";

const Products = ({ data }) => {
  const [products, setProducts] = useState(data.products);
  const [pagination, setPagination] = useState({
    totalCount: products.length,
    siblingCount: 1,
    currentPage: 1,
    pageSize: 8,
  });
  useEffect(() => {
    setPagination({
      totalCount: products.length,
      siblingCount: 1,
      currentPage: 1,
      pageSize: 8,
    });
  }, [products]);
  return (
    <>
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-1">
          <Filter
            category={data}
            products={products}
            setProducts={setProducts}
          />
        </div>
        <div className="col-span-3">
          <h1 className="text-2xl font-bold mb-5">{data.name}</h1>
          <div className="grid grid-cols-4 gap-5 mb-5">
            {/* {products.map((product, index) => {
          return <Card key={product.id} product={product} />;
        })} */}
            {pagination &&
              products.map((product, index) => {
                const start =
                  (pagination.currentPage - 1) * pagination.pageSize;
                const end = start + pagination.pageSize;
                if (index >= start && index < end) {
                  return <Card key={product.id} product={product} />;
                }
              })}
          </div>
          <div className="flex justify-end">
            <Pagination pagination={pagination} setPagination={setPagination} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
