declare global {
  interface Window {
    Razorpay: new (options: RazorpayCheckoutOptions) => RazorpayInstance;
  }
}

export interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  handler: (response: { razorpay_payment_id: string }) => void;
  prefill?: { name?: string; email?: string; contact?: string };
  notes?: Record<string, string>;
  theme?: { color?: string };
  modal?: { ondismiss?: () => void; backdropclose?: boolean };
}

interface RazorpayInstance {
  open(): void;
  on(event: string, handler: () => void): void;
}

export const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID ?? "";

export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const existing = document.getElementById("razorpay-script");
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function parseAmountPaise(priceStr: string): number {
  const digits = priceStr.replace(/[^0-9]/g, "");
  return parseInt(digits, 10) * 100;
}

export interface OpenDonationOptions {
  title: string;
  description: string;
  amount: number;
  onSuccess: (paymentId: string) => void;
  onDismiss?: () => void;
}

export async function openDonationCheckout(opts: OpenDonationOptions): Promise<void> {
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    alert("Payment gateway failed to load. Please check your connection and try again.");
    return;
  }
  if (!RAZORPAY_KEY) {
    alert("Razorpay is not configured. Please contact support.");
    return;
  }
  const rzp = new window.Razorpay({
    key: RAZORPAY_KEY,
    amount: opts.amount,
    currency: "INR",
    name: "Vrindavan Special Tour",
    description: opts.description,
    handler: (response) => {
      opts.onSuccess(response.razorpay_payment_id);
    },
    theme: { color: "#D4AF37" },
    modal: {
      ondismiss: opts.onDismiss,
      backdropclose: false,
    },
  });
  rzp.open();
}
