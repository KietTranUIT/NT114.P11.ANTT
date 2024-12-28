import Header from "../../ui/components/header/header";
import NavBar from "../../ui/components/navbar/navbar";
import Footer from "../../ui/components/footer/footer";
import TableCart from "../../ui/components/tablecart/tablecart";

const WishListPage = () => {
  return (
    <main className="bg-zinc-100">
      <Header />
      <NavBar />
      <TableCart />
      <Footer />
    </main>
  );
};

export default WishListPage;
