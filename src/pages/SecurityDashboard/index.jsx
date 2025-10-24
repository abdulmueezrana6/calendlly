import { Check, Shield, Lock, AlertTriangle } from "lucide-react";
import Header from "../../Header/Header";
import contentbanner from "../../../Resources/Meta-feature-banner-image-700x410.png";
export default function SecurityDashboard() {
  return (
    <div className="min-h-screen bg-facebook-background pt-16">
      <Header/>

    <div className="min-h-screen bg-white flex justify-center px-4 py-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button className="text-gray-700 text-xl">&lt;</button>
          <h1 className="text-lg font-medium">Review complete</h1>
          <div className="w-6" /> {/* placeholder để cân giữa */}
        </div>

        {/* Image */}
        <div className="mt-6">
          <img height={"50"}
            src={contentbanner}
            alt="review banner"
            className="rounded-lg w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="mt-6">
          <p className="text-sm text-gray-500">May 23, 2025</p>
          <h2 className="text-xl font-bold mt-2">
            We removed restrictions from your account
          </h2>

          <p className="text-gray-700 mt-4 leading-relaxed">
            We found that our technology made a mistake adding restrictions to
            your account.
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            Thank you for taking the time to request a review and helping us
            improve our systems. Our priority is keeping the community safe and
            respectful, so sometimes we have to take precautions.
          </p>
        </div>

        {/* What you need to know */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg">What you need to know</h3>
        </div>

        {/* Button */}
        <div className="mt-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg">
            Go to Account Status
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
