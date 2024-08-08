"use client";
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import { SetModalProps } from "@/types/userAuthentication";
import { register as registerApi } from "../../api";
import { toast } from 'react-hot-toast';
import Loader from "./Loader"; // Import the Loader component

const RegisterModal: React.FC<
  SetModalProps & { onSwitchToLogin: () => void }
> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    apiErrors: {} as Record<string, string>,
  });

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      apiErrors: {},
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    setErrors({
      ...errors,
      [id]: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const trimmedFormData = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
    };
  
    const { confirmPassword, ...requestData } = trimmedFormData;
  
    try {
      const response = await registerApi(requestData);

      setIsLoading(false);

      if (response.status === 201) {
        toast.success('Registration successfully!');
        onClose();
      } else {
        throw new Error("Registration failed. Please try again.");
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const apiErrorsArray = error.response.data.message;
        const apiErrors = apiErrorsArray.reduce(
          (
            acc: Record<string, string>,
            err: { property?: string; message: string }
          ) => {
            if (err.property) {
              acc[err.property] = err.message;
            }
            return acc;
          },
          {}
        );

        setErrors({
          ...errors,
          apiErrors,
        });
      } else {
        console.error("An unexpected error occurred:", error);
        setErrors({
          ...errors,
          apiErrors: {},
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };

    let isValid = true;

    if (!formData.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    } else if (/[^a-zA-Z\s]/.test(formData.name)) {
      newErrors.name = "Full Name can only contain alphabets and spaces.";
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
      isValid = false;
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits and contain only numbers.";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must contain an uppercase, a lowercase, a digit, a special character, and length must be between 8-16";
      isValid = false;
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword =
        "Password and confirm password does not match.";
      isValid = false;
    }

    setErrors({
      ...errors,
      ...newErrors,
    });

    return isValid;
  };

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Register"
        actionLabel="Continue"
        onSubmit={handleSubmit}
        disabled={isLoading}
        body={
          <div className="flex flex-col gap-4">
            {errors.apiErrors.general && (
              <div className="text-red-500 text-md text-center">
                {errors.apiErrors.general}
              </div>
            )}
            <Heading title="Welcome to Airnb" subtitle="Create an account!" />
            <Input
              id="name"
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              error={errors.name || errors.apiErrors.name}
            />
            <Input
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              error={errors.email || errors.apiErrors.email}
            />
            <Input
              id="phone"
              label="Phone Number"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              required
              error={errors.phone || errors.apiErrors.phone}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              error={errors.password || errors.apiErrors.password}
            />
            <Input
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              error={errors.confirmPassword}
            />
          </div>
        }
        footer={
          <div className="flex flex-col gap-4 mt-2">
            <hr />
            <div className="text-neutral-500 text-center font-light">
              <p>
                Already have an account?
                <span
                  onClick={onSwitchToLogin}
                  className="text-neutral-800 cursor-pointer hover:underline"
                >
                  {" "}
                  Login
                </span>
              </p>
            </div>
          </div>
        }
      />
    </>
  );
};

export default RegisterModal;
