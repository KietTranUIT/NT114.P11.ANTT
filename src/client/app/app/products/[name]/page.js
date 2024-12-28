import Header from "@/app/ui/components/header/header";
import NavBar from "@/app/ui/components/navbar/navbar";
import Footer from "@/app/ui/components/footer/footer";
import Product from "@/app/ui/components/product/product";
import { getProduct } from "@/app/lib/helps";

const ProductPage = async ({params}) => {
  const { name } = await params
  const httpRes = await getProduct(name)
  
  // Xử lí lỗi không fetch được product ở đây

  return (
    <main className="bg-zinc-100">
      <Header />
      <NavBar />
      <Product product={httpRes.data}/>
      <Footer />
    </main>
  );
};

export default ProductPage;
