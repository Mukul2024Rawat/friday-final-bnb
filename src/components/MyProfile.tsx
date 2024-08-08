"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  fetchUserProfile,
  updateUserProfile,
  fetchUserProfilePhoto,
} from "@/api";
import ChangePasswordModal from "./modals/ChangePasswordModal";
import Input from "./inputs/Input";
import Image from "next/image";
import { User } from "@/types/userAuthentication";
import { useAuth } from "@/contexts/AuthContext";
import { IoMdLogOut } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import WithAuth from "./withAuth";
import { toast } from "react-hot-toast";
import Loader from "./modals/Loader";
import { MdClose } from "react-icons/md";

const MyProfile: React.FC = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    phone: "",
    file: null,
  });
  const [backupUser, setBackupUser] = useState<User>({
    name: "",
    email: "",
    phone: "",
    file: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
  const [profilePhotoFileName, setProfilePhotoFileName] = useState<string>("");
  const [photoUploadError, setPhotoUploadError] = useState<string>("");
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    apiErrors: {} as Record<string, string>,
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const userResponse = await fetchUserProfile();
      setUser({ ...userResponse.data });
      setBackupUser({ ...userResponse.data });
      if (userResponse.data.image_url) {
        try {
          const photoResponse = await fetchUserProfilePhoto();
          const blob = new Blob([photoResponse.data], { type: "image/jpeg" });
          const profilePhotoUrl = URL.createObjectURL(blob);
          setUser((prevUser) => ({
            ...prevUser,
            file: profilePhotoUrl,
          }));
          setBackupUser((prevUser) => ({
            ...prevUser,
            file: profilePhotoUrl,
          }));
        } catch (photoError) {
          console.error("Failed to fetch profile photo", photoError);
        }
      }
    } catch (error) {
      console.error("Failed to fetch user data", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
      apiErrors: {},
    }));
  };
  const handleEditToggle = () => {
    if (isEditing) {
      setUser(backupUser);
      setProfilePhotoFileName("");
      setPhotoUploadError("");
      setErrors({
        name: "",
        phone: "",
        apiErrors: {} as Record<string, string>,
      });
    }
    setIsEditing(!isEditing);
  };
  const handleSaveChanges = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()){ 
      return toast.error("Please enter the valid information!");
    };
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", user.name.trim());
      formData.append("phone", user.phone.trim());
      if (profilePhotoFile) {
        formData.append("file", profilePhotoFile);
      }
      const response = await updateUserProfile(formData);
      const updatedUser = {
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        file: user.file,
      };
      if (response.data.image_url) {
        try {
          const photoResponse = await fetchUserProfilePhoto();
          const blob = new Blob([photoResponse.data], { type: "image/jpeg" });
          const profilePhotoUrl = URL.createObjectURL(blob);
          updatedUser.file = profilePhotoUrl;
        } catch (photoError) {
          console.error("Failed to fetch profile photo", photoError);
        }
      }
      setUser(updatedUser);
      setBackupUser(updatedUser);
      setIsEditing(false);
      setProfilePhotoFileName("");
      toast.success("Profile updated successfully!");
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
        setErrors({ ...errors, apiErrors });
        if (apiErrors.file) {
          setPhotoUploadError(apiErrors.file);
        } else {
          setPhotoUploadError("");
        }
      } else {
        console.error("An unexpected error occurred:", error);
        setErrors({ ...errors, apiErrors: {} });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      phone: "",
      apiErrors: {} as Record<string, string>,
    };

    let isValid = true;

    if (!user.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    } else if (/[^a-zA-Z\s]/.test(user.name)) {
      newErrors.name = "Full Name can only contain alphabets and spaces.";
      isValid = false;
    }

    if (!user.phone) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!/^\d{10}$/.test(user.phone)) {
      newErrors.phone =
        "Phone number must be 10 digits and contain only numbers.";
      isValid = false;
    }
    if (photoUploadError) {
      isValid = false;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...newErrors,
    }));

    return isValid;
  };

  const handlePasswordModalToggle = () => {
    setIsPasswordModalOpen(!isPasswordModalOpen);
  };

  const handleProfilePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type.toLowerCase();
      if (
        fileType === "image/jpeg" ||
        fileType === "image/jpg" ||
        fileType === "image/png"
      ) {
        setProfilePhotoFile(file);
        setProfilePhotoFileName(file.name);
        setUser((prevUser) => ({
          ...prevUser,
          file: URL.createObjectURL(file),
        }));
        setPhotoUploadError("");
      } else {
        setPhotoUploadError("Only JPG, JPEG, and PNG files are allowed.");
      }
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      {isLoading && <Loader />}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="relative w-24 h-24">
          <div className="cursor-pointer rounded-full border-2 border-transparent transition relative w-full h-full">
            <Image
              id="profileImage"
              src={typeof user.file === "string" ? user.file : "/profile.png"}
              alt="Profile"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleEditToggle}
            className={`flex items-center space-x-2 ${
              isEditing ? "bg-rose-500" : "bg-green-500"
            } text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition`}
          >
            {isEditing ? <MdClose size={18} /> : <FiEdit size={18} />}
            <span>{isEditing ? "Cancel" : "Edit"}</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition md:hidden"
          >
            <IoMdLogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
      <form onSubmit={handleSaveChanges}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            id="name"
            label="Full Name"
            value={user.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            required
            error={errors.name || errors.apiErrors.name}
          />
          <Input
            id="email"
            label="Email"
            value={user.email}
            onChange={handleInputChange}
            disabled
          />
          <Input
            id="phone"
            label="Phone Number"
            value={user.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
            required
            error={errors.phone || errors.apiErrors.phone}
          />
          {isEditing && (
            <div className="flex flex-col items-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full p-4 pt-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
              >
                <div className="flex items-center justify-around">
                  <svg
                    className="w-8 h-8 mr-6 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">
                      Upload Profile Picture
                    </span>
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleProfilePhotoChange}
                />
              </label>
              {profilePhotoFileName && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Uploaded file: {profilePhotoFileName}
                </p>
              )}
              {photoUploadError && (
                <p className="mt-2 text-sm text-red-500">{photoUploadError}</p>
              )}
            </div>
          )}
        </div>
        <div className="mt-6">
          <button
            type="button"
            onClick={handlePasswordModalToggle}
            className="bg-rose-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
          >
            Change Password
          </button>
        </div>
        {isEditing && (
          <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={handlePasswordModalToggle}
      />
    </div>
  );
};

export default WithAuth(MyProfile);
