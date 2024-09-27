"use client";

import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "~/components/ui/form";
import { CardWrapper } from "~/components/auth/cardWrapper";
import { FormSuccess } from "~/components/formSuccess";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "~/components/formError";
import { useState, useTransition } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { register } from "~/actions/register";
import { RegisterSchema } from "~/schemas";
import { useForm } from "react-hook-form";
import Link from "next/link";
import * as z from "zod";

export function RegisterForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        if (data.error) setError(data.error);
        else if (data.success) setSuccess(data.success);
      });
    });
  };

  return (
    // <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    //   <div className="flex flex-col space-y-2 text-center">
    //     <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
    //     <p className="text-sm text-muted-foreground">
    //       Enter your details below to create your account
    //     </p>
    //   </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="John Doe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Create an account
          </Button>
        </form>
      </Form>
      // <div className="relative">
      //   <div className="absolute inset-0 flex items-center">
      //     <span className="w-full border-t border-zinc-700" />
      //   </div>
      //   <div className="relative flex justify-center text-xs uppercase">
      //     <span className="bg-zinc-900 px-2 text-zinc-400">
      //       Or continue with
      //     </span>
      //   </div>
      // </div>

      // <Button variant="outline" type="button" disabled={isPending} className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700">
      //   GitHub
      // </Button>

      // <p className="px-8 text-center text-sm text-zinc-400">
      //   By clicking continue, you agree to our{" "}
      //   <Link href="/terms" className="underline underline-offset-4 hover:text-zinc-300">
      //     Terms of Service
      //   </Link>{" "}
      //   and{" "}
      //   <Link href="/privacy" className="underline underline-offset-4 hover:text-zinc-300">
      //     Privacy Policy
      //   </Link>
      //   .
      // </p>

      // <p className="text-center text-sm text-zinc-400">
      //   Already have an account?{" "}
      //   <Link href="/auth/login" className="underline underline-offset-4 hover:text-zinc-300">
      //     Sign in
      //   </Link>
      // </p>
      // </div>
  );
}
