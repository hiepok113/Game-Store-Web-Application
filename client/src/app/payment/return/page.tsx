"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "../../../api";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { CheckCircle, XCircle } from "lucide-react";

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const { fetchCart } = useCart();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    if (!user) return;

    let isMounted = true;

    const processPayment = async () => {
      try {
        const query = searchParams.toString();
        const orderId = searchParams.get("vnp_OrderInfo");
        const { data } = await api.get(`/payment/vnpay_return?${query}`);

        if (data.success && data.rspCode === "00") {
          if (orderId) {
            await api.put(`/orders/${orderId}/status`, { status: "paid" });
          }
          await api.delete(`/carts/all/${user._id}`);
          await fetchCart();
          if (isMounted) setStatus("success");
        } else {
          if (orderId) {
            await api.put(`/orders/${orderId}/status`, { status: "failed" });
          }
          if (isMounted) setStatus("error");
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setStatus("error");
      }
    };

    if (searchParams.toString()) {
      processPayment();
    }

    return () => {
      isMounted = false;
    };
  }, [searchParams, user, fetchCart]);

  return (
    <div className="container" style={{ padding: "5rem", textAlign: "center" }}>
      {status === "loading" && (
        <h2 className="title-lg gradient-text">Processing Payment...</h2>
      )}

      {status === "success" && (
        <div
          className="glass-panel"
          style={{ display: "inline-block", padding: "4rem" }}
        >
          <CheckCircle
            size={64}
            style={{ color: "var(--accent-color)", margin: "0 auto 2rem" }}
          />
          <h2
            className="title-lg gradient-text"
            style={{ marginBottom: "1rem" }}
          >
            Payment Successful!
          </h2>
          <p className="subtitle" style={{ marginBottom: "2rem" }}>
            Thank you for your purchase. Enjoy your games!
          </p>
          <button
            className="btn btn-primary"
            onClick={() => router.push("/")}
            style={{ margin: "0 auto" }}
          >
            Return Home
          </button>
        </div>
      )}

      {status === "error" && (
        <div
          className="glass-panel"
          style={{ display: "inline-block", padding: "4rem" }}
        >
          <XCircle
            size={64}
            style={{ color: "var(--danger-color)", margin: "0 auto 2rem" }}
          />
          <h2
            className="title-lg"
            style={{ color: "var(--danger-color)", marginBottom: "1rem" }}
          >
            Payment Failed or Cancelled
          </h2>
          <p className="subtitle" style={{ marginBottom: "2rem" }}>
            There was an issue processing your payment. Please try again.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => router.push("/cart")}
            style={{ margin: "0 auto" }}
          >
            Return to Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default function PaymentReturn() {
  return (
    <Suspense
      fallback={
        <div
          className="container"
          style={{ padding: "5rem", textAlign: "center" }}
        >
          <h2 className="title-lg">Loading...</h2>
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
