"use client";
import React, { useState } from "react";
import { handleFormSubmit } from "@/services/Auth/SignUp";
import Link from "next/link";
import CustomDropDown from "@/Components/ui/CustomDropdown";
import Gender from "@/Components/ui/GenderSelect";
import { useRouter } from "next/navigation";
import { Register } from "@/types";

const SignUp = () => {
  const [error, setError] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Register>({
    firstName: "",
    lastName: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    gender: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const onSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    sessionStorage.setItem("is_signing_up", "true");
    const isSuccess = await handleFormSubmit(formData, setError);
    if (isSuccess) {
      router.push('/User/upload-profile-picture')
    } else {
      setIsLoading(false)
    }

  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white text-gray-900 rounded-3xl p-8 w-full lg:max-w-lg max-w-md shadow-xl min-h-165">
      <header className="mb-6">
        <h1 className="text-[1.5rem] font-bold text-gray-800 leading-tight mb-1">
          Get started on My Project
        </h1>
        <p className="text-[0.75rem] text-gray-500 font-medium leading-relaxed">
          Create an account to connect with friends, family and communities of
          people who share your interests.
        </p>
      </header>

      {error.general && (
        <div
          role="alert"
          className="
            mb-4 px-4 py-3
            bg-red-50 border border-red-200
            text-red-600 text-[0.8125rem] font-medium
            rounded-xl leading-snug
          "
        >
          {error.general}
        </div>
      )}

      <form onSubmit={onSubmitted} noValidate>
        <fieldset className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1.5">
            <label className="text-[0.75rem] font-bold text-gray-700">
              Name
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-y-1">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                  autoComplete="given-name"
                  className={`
                    w-full px-3 py-2.5
                    border rounded-xl
                    text-[0.875rem] text-gray-800
                    bg-gray-50 placeholder:text-gray-400
                    outline-none
                    focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20
                    transition-all duration-150
                    ${error.firstName ? "border-red-400 bg-red-50" : "border-gray-200"}
                  `}
                />
                {error.firstName && (
                  <p
                    role="alert"
                    className="text-[0.6875rem] text-red-500 leading-tight px-1"
                  >
                    {error.firstName}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-y-1">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  autoComplete="family-name"
                  className={`
                    w-full px-3 py-2.5
                    border rounded-xl
                    text-[0.875rem] text-gray-800
                    bg-gray-50 placeholder:text-gray-400
                    outline-none
                    focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20
                    transition-all duration-150
                    ${error.lastName ? "border-red-400 bg-red-50" : "border-gray-200"}
                  `}
                />
                {error.lastName && (
                  <p
                    role="alert"
                    className="text-[0.6875rem] text-red-500 leading-tight px-1"
                  >
                    {error.lastName}
                  </p>
                )}
              </div>
            </div>
            <p className="text-[0.6875rem] text-gray-400 leading-normal px-0.5">
              First names and surnames must be at least 2 characters.
            </p>
          </div>

          <div className="flex flex-col gap-y-1.5">
            <label className="text-[0.75rem] font-bold text-gray-700">
              Date of birth
            </label>
            <div className="flex gap-x-3">
              <CustomDropDown
                label="Day"
                value={formData.birthDay}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, birthDay: val }))
                }
              />
              <CustomDropDown
                label="Month"
                value={formData.birthMonth}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, birthMonth: val }))
                }
              />
              <CustomDropDown
                label="Year"
                value={formData.birthYear}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, birthYear: val }))
                }
              />
            </div>
            {error.birthDay && (
              <p
                role="alert"
                className="text-[0.6875rem] text-red-500 leading-tight px-1"
              >
                {error.birthDay}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-1.5">
            <label className="text-[0.75rem] font-bold text-gray-700">
              Gender
            </label>
            <Gender
              value={formData.gender}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, gender: val }))
              }
            />
            {error.gender && (
              <p
                role="alert"
                className="text-[0.6875rem] text-red-500 leading-tight px-1"
              >
                {error.gender}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-1.5">
            <label
              htmlFor="email"
              className="text-[0.75rem] font-bold text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="your@email.com"
              autoComplete="email"
              required
              className={`
                w-full px-3 py-2.5
                border rounded-xl
                text-[0.875rem] text-gray-800
                bg-gray-50 placeholder:text-gray-400
                outline-none
                focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20
                transition-all duration-150
                ${error.email ? "border-red-400 bg-red-50" : "border-gray-200"}
              `}
            />
            {error.email && (
              <p
                role="alert"
                className="text-[0.6875rem] text-red-500 leading-tight px-1"
              >
                {error.email}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-1.5">
            <label
              htmlFor="password"
              className="text-[0.75rem] font-bold text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder="Min. 6 characters"
              autoComplete="new-password"
              required
              className={`
                w-full px-3 py-2.5
                border rounded-xl
                text-[0.875rem] text-gray-800
                bg-gray-50 placeholder:text-gray-400
                outline-none
                focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20
                transition-all duration-150
                ${error.password ? "border-red-400 bg-red-50" : "border-gray-200"}
              `}
            />
            {error.password && (
              <p
                role="alert"
                className="text-[0.6875rem] text-red-500 leading-tight px-1"
              >
                {error.password}
              </p>
            )}
          </div>

          <div className="flex items-start gap-x-2.5 pt-1">
            <input
              type="checkbox"
              id="terms"
              required
              className="mt-0.5 w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
            />
            <label
              htmlFor="terms"
              className="text-[0.75rem] text-gray-500 leading-relaxed cursor-pointer select-none"
            >
              I accept the{" "}
              <a
                href="#"
                className="text-blue-600 font-semibold hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-blue-600 font-semibold hover:underline"
              >
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full
              bg-blue-600 hover:bg-blue-700
              disabled:bg-blue-400 disabled:cursor-not-allowed
              text-white
              rounded-xl
              py-3
              font-bold text-[0.9375rem]
              shadow-lg shadow-blue-500/20
              transition-all duration-150
              active:scale-[0.98]
              mt-1
            "
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-center text-[0.75rem] text-gray-400 font-medium">
            Already have an account?{" "}
            <Link
              href="/Login"
              className="text-blue-600 font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
          <p className="text-xs text-gray-500 text-center mt-4">

  Disclaimer: This is a personal portfolio project for demonstration purposes only.

</p>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUp;
