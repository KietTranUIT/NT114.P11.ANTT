import Header from "../../ui/components/header/header";
import NavBar from "../../ui/components/navbar/navbar";
import Footer from "../../ui/components/footer/footer";
import TableWishList from "@/app/ui/components/tablewishlist/table";
const WishListPage = () => {
  return (
    <main className="bg-zinc-100">
      <Header />
      <NavBar />
      <TableWishList />
      <Footer />
    </main>
  );
};

export default WishListPage;
