// pages/CheckoutPage.tsx
import { useState } from "react";
import Stepper from "../components/checkout/Stepper";
import Cart from "../components/checkout/Cart";
import Shipping from "../components/checkout/Shipping";
import Payment from "../components/checkout/Payment";
import Confirmation from "../components/checkout/Confirmation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../components/styles.css";
import type { Product } from "../types/product";

// Define this here so it's accessible to the whole checkout flow
export type CartItem = Product & { quantity: number };

export default function CheckoutPage() {
  const [step, setStep] = useState(1);

const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderId, setOrderId] = useState<string | null>(null);

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <>
    <Navbar />

    <div className="max-w-6xl mx-auto p-6">
      <Stepper currentStep={step} />

      <div className="mt-8">
        {step === 1 && (
          <Cart
            cartItems={cartItems}
            setCartItems={setCartItems}
            next={next}
          />
        )}

        {step === 2 && (
          <Shipping
            cartItems={cartItems}
            setOrderId={setOrderId}
            next={next}
            prev={prev}
          />
        )}

        {step === 3 && (
          <Payment
            orderId={orderId}
            cartItems={cartItems}
            next={next}
            prev={prev}
          />
        )}

        {step === 4 && <Confirmation />}
      </div>
    </div>

    <Footer />
    </>
  );
}