"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/auth.action";
import { useRouter } from "next/navigation";
import PixelBlast from "./PixelBlast";

const formSchema = z.object({
  // username: z.string().min(3).max(20).optional(),
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

const FormCard = ({ type }: { type: "sign-in" | "sign-up" }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (type === "sign-up") {
      const { email, password } = values;

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const result = await signUp({
        uid: userCredentials.user.uid,
        name: "sfdjkaklsdjf",
        email,
        password,
      });

      if (!result?.success) {
        toast.error(result?.message);
        return;
      }
      toast.success("Signed Up Successfully!");
      router.push("sign-in");
      console.log("Sign Up", values);
    } else {
      console.log("Sign In", values);

      const { email, password } = values;

      try {
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const idToken = await userCredentials.user.getIdToken();

        const res = await fetch("/api/sign-in", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        });

        const data = await res.json();

        if (!data.success) {
          toast.error(data.message || "Sign in failed");
          return;
        }
        toast.success("Signed In Successfully!");
        router.push("/");
      } catch (error: any) {
        toast.error(error.message || "Sign in failed");
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[30rem] z-20 relative overflow-hidden max-sm:w-full text-white rounded-2xl bg-gradient-to-t from-black to-neutral-900 border-2 border-neutral-800 p-8 flex flex-col justify-center gap-6">
        <img src="/pattern.png" alt="bg" className="absolute " />

        <div className="flex mb-7 justify-around items-center ">
          <h1 className="text-4xl font-bold z-20">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
        </div>

        {/* {type === "sign-up" && (
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl className="rounded-full border-neutral-700  z-20">
                  <Input
                    placeholder="Your Name"
                    {...field}
                    type="name"
                    className="lg:p-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )} */}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl className="rounded-full border-neutral-700  z-20">
                <Input
                  placeholder="example@gmail.com"
                  {...field}
                  type="email"
                  className="lg:p-5"
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
              <FormControl className="rounded-full border-neutral-700  z-20 ">
                <Input
                  placeholder="Your Password"
                  {...field}
                  type="password"
                  className="lg:p-5"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className=" z-20">
          {type === "sign-in" ? "Sign In" : "Sign Up"}
        </Button>
        <p className="text-center text-neutral-500  z-20">--OR--</p>
        <Button className=" z-20" type="button">
          Sign In with Google
        </Button>
        {type === "sign-in" ? (
          <p>
            Don`t Have an account?{" "}
            <a href="/sign-up" className="underline">
              Sign Up
            </a>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <a href="/sign-in" className="underline">
              Sign In
            </a>
          </p>
        )}
      </form>
    </Form>
  );
};

export default FormCard;
