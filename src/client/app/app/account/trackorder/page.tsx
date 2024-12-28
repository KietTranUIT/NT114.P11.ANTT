import Header from "@/app/ui/components/header/header";
import NavBar from "@/app/ui/components/navbar/navbar";
import Footer from "@/app/ui/components/footer/footer";
import Order from "@/app/ui/components/order/order";

const TrackOrder = () => {
    return (
        <main className="bg-zinc-100">
            <Header />
            <NavBar />
            <Order />
            <Footer />
        </main>
    )
}

export default TrackOrder;