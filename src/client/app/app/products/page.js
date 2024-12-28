import Header from "../ui/components/header/header";
import Footer from "../ui/components/footer/footer";
import NavBar from "../ui/components/navbar/navbar";
import Products from "../ui/components/products/products";
import Filter from "../ui/components/filter/filter";
import { getProducts } from "../lib/helps";
export default async function ProductsPage () {
    // Get products list from server
    const response = await getProducts({
        include:"media"
    })
    const products = response.data
    return (
        <main className="bg-zinc-100">
            <Header />
            <NavBar />
            <div>
                <div className="container mx-auto">
                    <div className="grid grid-cols-4 gap-5">
                        <div className="col-span-1">
                            <Filter />
                        </div>
                        <div className="col-span-3">
                            <Products products={products}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}