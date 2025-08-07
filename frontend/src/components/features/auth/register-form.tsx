"use client";

import { Field, Input, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import AppButton from "../../ui/AppButton";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(data => {
    console.log("submitting register form", data);
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-center">
        <Field.Root invalid={!!errors.firstName}>
          <Field.Label>First name</Field.Label>
          <Input {...register("firstName")} />
          <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.lastName}>
          <Field.Label>Last name</Field.Label>
          <Input {...register("lastName")} />
          <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.email}>
          <Field.Label>Email</Field.Label>
          <Input {...register("email")} />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <Input {...register("password")} />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <AppButton type="submit">Create an account</AppButton>
      </Stack>
    </form>
  );
}
