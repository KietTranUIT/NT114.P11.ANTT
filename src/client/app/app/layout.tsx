import "@/app/ui/global.css";
import { CartProvider } from "./ui/components/context/cartContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </CartProvider>
  );
}
