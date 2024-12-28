import Header from "@/app/ui/components/header/header";
import Footer from "@/app/ui/components/footer/footer";
import NavBar from "@/app/ui/components/navbar/navbar";
import Checkout from "@/app/ui/components/checkout/checkout";
const CheckoutPage = () => {
  return (
    <>
      <main className="bg-zinc-100">
        <Header />
        <NavBar />
        <Checkout />
        <Footer />
      </main>
    </>
  );
};

export default CheckoutPage;
