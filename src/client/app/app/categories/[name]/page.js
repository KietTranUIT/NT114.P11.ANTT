import Header from "@/app/ui/components/header/header";
import NavBar from "@/app/ui/components/navbar/navbar";
import Footer from "@/app/ui/components/footer/footer";
import Products from "@/app/ui/components/products/products";
import { getProduct, getCategory } from "@/app/lib/helps";

const CategoryPage = async ({ params }) => {
  const { name } = await params;
  //const httpRes = await getProduct(name)
  const httpRes = await getCategory(name, { view: "products" });

  // Xử lí lỗi không fetch được product ở đây

  return (
    <main className="bg-zinc-100">
      <Header />
      <NavBar />
      <div>
        <div className="container mx-auto">
          <Products data={httpRes.data} />
          {/* <div className="grid grid-cols-4 gap-5">
            <div className="col-span-1">
              <Filter />
            </div>
            <div className="col-span-3">
              <Products products={httpRes.data.products}/>
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default CategoryPage;
