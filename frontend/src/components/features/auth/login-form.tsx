"use client";

import { useForm } from "react-hook-form";
import { Field, Input, Stack } from "@chakra-ui/react";
import AppButton from "../../ui/AppButton";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router";

interface FormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async data => {
    const { email, password } = data;

    if (!email || !password) return;

    try {
      const response = await login(email, password);

      if (response.success) {
        console.log("Login successful:", response);
        // Redirect to home page or dashboard
        navigate("/");
      } else {
        console.error("Login failed:", response.message);
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle error (show toast, etc.)
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-center">
        <Field.Root invalid={!!errors.email}>
          <Field.Label>Email</Field.Label>
          <Input {...register("email", { required: "Email is required" })} />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <Input
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <AppButton type="submit" loading={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </AppButton>
      </Stack>
    </form>
  );
}
