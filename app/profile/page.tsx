"use client";

import React from "react";
import { Form, Input, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

import axiosClient from "@/lib/axiosClient";

const ProfilePage = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    resume: null,
  });
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
      const response = await axiosClient.patch("/users/me/", formData);

      console.log("Profile updated successfully:", response.data);

      // Optional: Show success message to user
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      // Optional: Show error message to user
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div>
      <Form
        className="w-full max-w-xs flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Input
          isRequired
          errorMessage="Please enter a valid username"
          label="Username"
          labelPlacement="outside"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleInputChange}
        />
        <Input
          isRequired
          errorMessage="Please enter a valid first name"
          label="First Name"
          labelPlacement="outside"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <Input
          isRequired
          errorMessage="Please enter a valid last name"
          label="Last Name"
          labelPlacement="outside"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <Input
          isRequired
          accept="pdf"
          label="Resume / CV"
          labelPlacement="outside"
          name="resumeFile"
          type="file"
          onChange={handleInputChange}
        />
        <div className="flex gap-2">
          <Button color="primary" type="submit">
            Update Profile
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProfilePage;
