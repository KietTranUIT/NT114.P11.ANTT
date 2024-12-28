import Card from "../card/card";

const Products = ({ products }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-5 mb-5">
        {products.map((product, index) => {
          return <Card key={product.id} product={product} />;
        })}
      </div>
      <div className="text-right">
        <span>Pagination Here</span>
      </div>
    </>
  );
};

export default Products;
