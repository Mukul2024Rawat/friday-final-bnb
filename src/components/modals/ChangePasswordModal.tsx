import { useState } from "react";
import { changePassword } from "@/api";
import Input from "../inputs/Input";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import Loader from "./Loader";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    apiErrors: {} as Record<string, string>,
  });

  const [isLoading, setIsLoading] = useState(false);

  const resetState = () => {
    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setErrors({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      apiErrors: {},
    });
    setIsLoading(false);
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
  const validateForm = () => {
    const newErrors = {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };

    let isValid = true;

    if (!formData.oldPassword) {
      newErrors.oldPassword = "Old password is required.";
      isValid = false;
    } else if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
        formData.oldPassword
      )
    ) {
      newErrors.oldPassword =
        "Password must contain an uppercase, a lowercase, a digit, a special character, and length must be between 8-16";
      isValid = false;
    }
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required.";
      isValid = false;
    } else if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
        formData.newPassword
      )
    ) {
      newErrors.newPassword =
        "Password must contain an uppercase, a lowercase, a digit, a special character, and length must be between 8-16";
      isValid = false;
    } else if (formData.newPassword === formData.oldPassword) {
      newErrors.newPassword = "Old Password and New Password should not be the same.";
      isValid = false;
    }
    if (!formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Confirm new password is required.";
      isValid = false;
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors({
      ...errors,
      ...newErrors,
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsLoading(true);
    const { confirmNewPassword, ...requestData } = formData;
    try {
      const response = await changePassword(requestData);

      if (response.status === 200) {
        toast.success("Password changed successfully");
        resetState();
        onClose();
      } else {
        throw new Error("Password change failed. Please try again.");
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        const apiErrorsArray = error.response.data.message;
        const apiErrors = apiErrorsArray.reduce(
          (acc: Record<string, string>, err: { property?: string; message: string }) => {
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

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          resetState();
          onClose();
        }}
        title="Change Password"
        actionLabel="Change Password"
        onSubmit={handleSubmit}
        body={
          <div className="flex flex-col gap-4">
            {errors.apiErrors.general && (
              <div className="text-red-500 text-md text-center">
                {errors.apiErrors.general}
              </div>
            )}
            <Input
              id="oldPassword"
              label="Old Password"
              type="password"
              value={formData.oldPassword}
              onChange={handleChange}
              required
              error={errors.oldPassword || errors.apiErrors.oldPassword}
            />
            <Input
              id="newPassword"
              label="New Password"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              required
              error={errors.newPassword || errors.apiErrors.newPassword}
            />
            <Input
              id="confirmNewPassword"
              label="Confirm New Password"
              type="password"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              required
              error={errors.confirmNewPassword || errors.apiErrors.confirmNewPassword}
            />
          </div>
        }
      />
    </>
  );
};

export default ChangePasswordModal;
