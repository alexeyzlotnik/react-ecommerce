"use client";

import { Field, Input, Stack } from "@chakra-ui/react";
import AppButton from "../../ui/AppButton";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const { register: signup } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async data => {
    console.log("submit started");
    if (!data.firstName || !data.lastName || !data.email || !data.password) {
      return;
    }

    // const { firstName, lastName, email, password } = data;

    console.log("before try");
    try {
      console.log("try");
      const response = await signup(data);

      if (response.success) {
        console.log("Register successful:", response);
        // Redirect to home page or dashboard
        navigate("/login");
      } else {
        console.error("Register failed:", response.message);
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.log("Register error: ", error);
    }

    // console.log("submitting register form", data);
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-center">
        <Field.Root invalid={!!errors.firstName}>
          <Field.Label>First names</Field.Label>
          <Input
            {...register("firstName", { required: "Field is required" })}
          />
          <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.lastName}>
          <Field.Label>Last name</Field.Label>
          <Input {...register("lastName", { required: "Field is required" })} />
          <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.email}>
          <Field.Label>Email</Field.Label>
          <Input {...register("email", { required: "Field is required" })} />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <Input
            type="password"
            {...register("password", { required: "Field is required" })}
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <AppButton type="submit" loading={isSubmitting}>
          {isSubmitting ? "Loading..." : "Create an account"}
        </AppButton>
      </Stack>
    </form>
  );
}
