"use client";

import React from "react";
import { Form, Input, Button } from "@heroui/react";

import axiosClient from "@/lib/axiosClient";

const RegisterPage = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    password: "",
  });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    const payload = {
      email: formData.get("email"),
      username: formData.get("username"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      jobTitle: formData.get("jobTitle"),
      password: formData.get("password"),
    };

    try {
      await axiosClient.post("/users/", payload);

      alert("Account created successfully!");
    } catch (error) {
      console.error("Error creating account:", error);
      // Optional: Show error message to user
      alert("Failed to create account. Please try again.");
    }
  };

  return (
    <div>
      <Form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
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
          errorMessage="Please enter a valid job title"
          label="Job Title"
          labelPlacement="outside"
          name="jobTitle"
          type="text"
          value={formData.jobTitle}
          onChange={handleInputChange}
        />
        <Input
          isRequired
          label="Password"
          labelPlacement="outside"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <div className="flex gap-2">
          <Button color="primary" type="submit">
            Sign Up
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
