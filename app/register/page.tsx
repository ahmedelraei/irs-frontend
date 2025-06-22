"use client";

import React from "react";
import { Form, Input, Button, Select, SelectItem } from "@heroui/react";

import { title } from "@/components/primitives";
import axiosClient from "@/lib/axiosClient";

const jobTitles = [
  { key: "Backend Developer", label: "Backend Developer" },
  { key: "Frontend Developer", label: "Frontend Developer" },
  { key: "Flutter Developer", label: "Flutter Developer" },
  { key: "Data Scientist", label: "Data Scientist" },
  { key: "Machine Learning Engineer", label: "Machine Learning Engineer" },
  { key: "AI Engineer", label: "AI Engineer" },
  { key: "DevOps Engineer", label: "DevOps Engineer" },
  { key: "Full Stack Developer", label: "Full Stack Developer" },
];

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

    // const formElement = e.currentTarget;
    // const formData = new FormData(formElement);

    // const payload = {
    //   email: formData.get("email"),
    //   username: formData.get("username"),
    //   firstName: formData.get("firstName"),
    //   lastName: formData.get("lastName"),
    //   jobTitle: formData.get("jobTitle"),
    //   password: formData.get("password"),
    // };

    try {
      await axiosClient.post("/users/", formData);

      alert("Account created successfully!");
    } catch (error) {
      console.error("Error creating account:", error);
      // Optional: Show error message to user
      alert("Failed to create account. Please try again.");
    }
  };

  return (
    <div>
      <h1 className={title()}>Create An Account..</h1>
      <Form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
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
        <Select
          className="max-w-xs"
          fullWidth={true}
          label="Job title"
          labelPlacement="outside"
          placeholder="Select a job title"
          size="lg"
          value={formData.jobTitle}
          onChange={(e) =>
            setFormData({ ...formData, jobTitle: e.target.value })
          }
        >
          {jobTitles.map((jobTitle) => (
            <SelectItem key={jobTitle.key}>{jobTitle.label}</SelectItem>
          ))}
        </Select>
        <Input
          isRequired
          fullWidth={true}
          label="Password"
          labelPlacement="outside"
          name="password"
          size="lg"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Button className="w-full" color="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
