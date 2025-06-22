"use client";

import React from "react";
import { Form, Input, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

import { title } from "@/components/primitives";
import axiosClient from "@/lib/axiosClient";
import LoadingSpinner from "@/components/LoadingSpinner";

const ProfilePage = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    resume: null,
  });
  const [loading, setLoading] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const router = useRouter();

  // Add a change handler function
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  React.useEffect(() => {
    if (!localStorage.getItem("access_token")) return router.push("/login");
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await axiosClient("/users/me");

        const data = response.data;

        console.log(data.email);

        setFormData({
          email: data.email || "",
          username: data.username || "",
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          resume: null,
        });

        // Log after setting state (though still may not show updated state due to closure)
        console.log("API response data:", data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    // Log the form data properly
    console.log("Form data entries:");
    for (let [key, value] of Array.from(formData.entries())) {
      console.log(`${key}: ${value}`);
    }

    try {
      setSubmitting(true);
      const response = await axiosClient.patch("/users/me/", formData);

      console.log("Profile updated successfully:", response.data);

      // Optional: Show success message to user
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      // Optional: Show error message to user
      alert("Failed to update profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className={title()}>My Profile..</h2>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[40vh]">
          <LoadingSpinner color="primary" size="lg" />
          <p className="mt-4 text-gray-500">Loading your profile...</p>
        </div>
      ) : (
        <>
          <Form
            className="w-full max-w-3xl flex flex-col gap-4 mt-5"
            onSubmit={handleSubmit}
          >
            <Input
              isRequired
              errorMessage="Please enter a valid email"
              fullWidth={true}
              label="Email"
              labelPlacement="outside"
              name="email"
              size="lg"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input
              isRequired
              errorMessage="Please enter a valid username"
              fullWidth={true}
              label="Username"
              labelPlacement="outside"
              name="username"
              size="lg"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
            />
            <Input
              isRequired
              errorMessage="Please enter a valid first name"
              fullWidth={true}
              label="First Name"
              labelPlacement="outside"
              name="firstName"
              size="lg"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <Input
              isRequired
              errorMessage="Please enter a valid last name"
              fullWidth={true}
              label="Last Name"
              labelPlacement="outside"
              name="lastName"
              size="lg"
              type="text"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <Input
              isRequired
              accept="pdf"
              fullWidth={true}
              label="Resume / CV"
              labelPlacement="outside"
              name="resumeFile"
              size="lg"
              type="file"
              onChange={handleInputChange}
            />
            <div className="flex gap-2">
              <Button color="primary" disabled={submitting} type="submit">
                {submitting ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner color="secondary" size="sm" />
                    <span>Updating...</span>
                  </div>
                ) : (
                  "Update Profile"
                )}
              </Button>
            </div>
          </Form>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
