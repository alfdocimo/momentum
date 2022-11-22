import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Hero() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome to Momentum</h1>
          <p className="py-6">
            Reflect on how you are feeling daily, check on things you're working
            on and have learned
          </p>

          <button
            onClick={() => {
              signIn("google");
            }}
            className="btn-primary btn"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
