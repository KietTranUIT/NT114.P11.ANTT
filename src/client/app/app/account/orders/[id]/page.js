import Header from "@/app/ui/components/header/header";
import NavBar from "@/app/ui/components/navbar/navbar";
import Footer from "@/app/ui/components/footer/footer";
import Order from "@/app/ui/components/order/order";
import { getDetailOrder } from "@/app/lib/helps";

const OrderPage = async ({params}) => {
  const { id } = await params
    const httpRes = await getDetailOrder(id)
  
  // Xử lí lỗi không fetch được product ở đây

  return (
    <main className="bg-zinc-100">
      <Header />
      <NavBar />
          {/* <Product product={httpRes.data}/> */}
          < Order order={httpRes.data} />
      <Footer />
    </main>
  );
};

export default OrderPage;
