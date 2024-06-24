"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { revalidation } from "@/action";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Confirm Password must be same.",
  }),
});

export function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
  });

  const onSubmit = async (data) => {
    const user = {
      name: data.username,
      email: data.email.toLowerCase(),
      password: data.password,
      confirmPassword: data.confirmPassword,
      role: "user",
    };
    setLoading(true);
    toast.promise(
      async function () {
        try {
          const res = await axios.post("/api/auth/register", user);
          if (res.status == 200) {
            const response = await signIn("credentials", {
              email: data.email.toLowerCase(),
              password: data.password,
              redirect: false,
            });
            await revalidation();
            return response;
          } else {
            return error;
          }
        } catch (error) {
          setLoading(false);
          throw error;
        }
      },
      {
        loading: "Trying to Signup...",
        success: () => {
          router.push("/addProducts");
          return "Signup successfully";
        },
        error: () => {
          setLoading(false);
          return "Some error occur while signup!"; // Ensure there's a return statement for consistency
        },
      }
    );
  };

  return (
    <div className="flex mobile:flex mobile:flex-col items-center justify-center bg-[#e5f2f8] min-h-screen mobile:p-0 p-4">
      <div className="grid max-w-4xl w-full mobile:w-full mobile:h-[250px] grid-cols-2 mobile:grid mobile:grid-cols-1 gap-4 bg-white rounded-lg shadow-md mobile:shadow-none mobile:bg-transparent pl-16 mobile:pl-[110px] pr-[123px] pt-[58px] pb-[52px]">
        <div className="flex flex-col items-center justify-center mb-[40px]">
          <Image
            alt="Image"
            className="w-[270px] h-[128px] mobile:w-[197px] mobile:h-[76px]  rounded-lg overflow-hidden object-cover object-center"
            height="150"
            src="/loginpage/logo.png"
            width="300"
          />
          <div className="w-[181px] h-[88px] mobile:w-[107px] mobile:h-[52px]">
            <h1 className="font-bold text-[48px] mobile:text-3xl"></h1>
            <h2 className="font-semibold text-2xl  mobile:text-lg text-opacity-65 text-gray-500 mobile:tracking-[4px] tracking-[11px] ml-2">
              Manthan
            </h2>
          </div>
        </div>
        <div className="flex mobile:hidden flex-col justify-between gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Register</h2>
            <Link
              className="text-sm font-medium text-[#FA890B] 100% dark:hover:text-gray-50"
              href="/"
            >
              Log In
            </Link>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Username"
                        {...field}
                        required
                        className="bg-[#F5F5F5]"
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
                        placeholder="Email"
                        {...field}
                        type="email"
                        required
                        className="bg-[#F5F5F5]"
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
                        placeholder="Password"
                        type="password"
                        {...field}
                        className="bg-[#F5F5F5]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm Password"
                        type="password"
                        {...field}
                        className="bg-[#F5F5F5]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {!loading ? (
                <Button
                  type="submit"
                  className="text-white bg-[#0FBC43] w-full "
                >
                  Signup
                </Button>
              ) : (
                <Button disabled className="w-full">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              )}
            </form>
            {/* <div className="flex flex-col gap-1 items-center justify-between mb-4">
              <span className="text-sm font-medium text-black-500">
                or Register with
              </span>

              <button className="px-4 py-2 w-[234px] h-[60px]">
                <img
                  className=" "
                  src="https://www.opscow.com/html/resource/img/btn_login_google.png"
                  loading="lazy"
                  alt="google logo"
                />
              </button>
            </div> */}
          </Form>
        </div>
      </div>
      <div className="flex sm:hidden mobile:p-4  mobile:w-[100%] bg-white rounded-t-3xl shadow-[#7B7B7B40] flex-col justify-between gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Register</h2>
          <Link
            className="text-sm font-medium text-[#FA890B] 100% dark:hover:text-gray-50"
            href="/login"
          >
            Log In
          </Link>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      {...field}
                      required
                      className="bg-[#F5F5F5]"
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
                      placeholder="Email"
                      {...field}
                      type="email"
                      required
                      className="bg-[#F5F5F5]"
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
                      placeholder="Password"
                      type="password"
                      {...field}
                      className="bg-[#F5F5F5]"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      {...field}
                      className="bg-[#F5F5F5]"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {!loading ? (
              <Button
                type="submit"
                className="text-white bg-[#0FBC43] w-full "
              >
                Signup
              </Button>
            ) : (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            )}
          </form>
          {/* <div className="flex flex-col gap-1 items-center justify-between mb-4">
            <span className="text-sm font-medium text-black-500">
              or Register with
            </span>

            <button className="px-4 py-2 w-[234px] h-[60px]">
              <img
                className=" "
                src="https://www.opscow.com/html/resource/img/btn_login_google.png"
                loading="lazy"
                alt="google logo"
              />
            </button>
          </div> */}
        </Form>
      </div>
    </div>
  );
}
