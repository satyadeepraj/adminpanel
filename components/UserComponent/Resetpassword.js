import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";

export function Resetpassword() {
  return (
    <div className="flex mobile:flex mobile:flex-col items-center justify-center bg-[#e5f2f8] min-h-screen mobile:p-0 p-4">
      <div className="grid max-w-4xl w-full grid-cols-2 mobile:grid mobile:grid-cols-1  bg-white gap-4 rounded-lg shadow-md mobile:shadow-none mobile:bg-transparent pl-16 mobile:pl-[110px] pr-[123px] pt-[58px] pb-[109px]">
        <div className="flex flex-col items-center justify-center mb-[40px]">
          <Image
            alt="Image"
            className="w-[270px] h-[128px] mobile:w-[197px] mobile:h-[76px] rounded-lg overflow-hidden object-cover object-center"
            height="150"
            src="/Group-1.png"
            width="300"
          />
          <div className="w-[181px] h-[88px] mobile:w-[107px] mobile:h-[52px]">
            <h1 className="font-bold text-5xl mobile:text-3xl"></h1>
            <h2 className="font-semibold text-2xl mobile:text-lg text-opacity-65 text-gray-500 mobile:tracking-[4px] tracking-[11px] ml-2">
              Manthan
            </h2>
          </div>
        </div>
        <div className="flex mobile:hidden flex-col justify-between gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Forgot Password</h2>
            <Link
              className="text-sm font-medium text-[#FA890B] 100% dark:hover:text-gray-50"
              href="/"
            >
              Log In
            </Link>
          </div>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium " htmlFor="full-name">
                <p className="mt-2 text-sm text-gray-600">
                  We just sent an OTP on your Email ID an***779@gmail.com
                </p>
              </label>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Enter OTP
              </label>
              <InputOTP maxLength={4}>
                <InputOTPGroup className="bg-[#F5F5F5] ">
                  <InputOTPSlot className="w-[54px] h-[50px]" index={0} />
                </InputOTPGroup>
                <InputOTPGroup className="bg-[#F5F5F5]">
                  <InputOTPSlot className="w-[54px] h-[50px]" index={1} />
                </InputOTPGroup>
                <InputOTPGroup className="bg-[#F5F5F5]">
                  <InputOTPSlot className="w-[54px] h-[50px]" index={2} />
                </InputOTPGroup>
                <InputOTPGroup className="bg-[#F5F5F5]">
                  <InputOTPSlot className="w-[54px] h-[50px]" index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-12">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="password"
                >
                  Enter Password
                </label>
                <Input
                  className="bg-[#F5F5F5]"
                  id="password"
                  placeholder="Password"
                  type="password"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="confirm-password"
                >
                  Confirm Password
                </label>
                <Input
                  className="bg-[#F5F5F5]"
                  id="confirm-password"
                  placeholder="Confirm Password"
                  type="password"
                />
              </div>
            </div>
            <Button className="w-full   bg-[#0FBC43] mb-4" type="submit">
              Reset Password Now
            </Button>
          </form>
        </div>
      </div>
      <div className="flex sm:hidden mobile:p-6  mobile:w-[100%] bg-white rounded-t-3xl shadow-[#7B7B7B40] mobile:mt-[-100px] flex-col justify-between gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Forgot Password</h2>
            <Link
              className="text-sm font-medium text-[#FA890B] 100% dark:hover:text-gray-50"
              href="/"
            >
              Log In
            </Link>
          </div>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium " htmlFor="full-name">
                <p className="mt-2 text-sm text-gray-600">
                  We just sent an OTP on your Email ID an***779@gmail.com
                </p>
              </label>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Enter OTP
              </label>
              <InputOTP maxLength={4}>
                <InputOTPGroup className="bg-[#F5F5F5] ">
                  <InputOTPSlot className="w-[54px] h-[50px]" index={0} />
                </InputOTPGroup>
                <InputOTPGroup className="bg-[#F5F5F5]">
                  <InputOTPSlot className="w-[54px] h-[50px]" index={1} />
                </InputOTPGroup>
                <InputOTPGroup className="bg-[#F5F5F5]">
                  <InputOTPSlot className="w-[54px] h-[50px]" index={2} />
                </InputOTPGroup>
                <InputOTPGroup className="bg-[#F5F5F5]">
                  <InputOTPSlot className="w-[54px] h-[50px]" index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="grid grid-cols-2 mobile:grid mobile:grid-cols-1 mobile:gap-6 gap-4 mb-12">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="password"
                >
                  Enter Password
                </label>
                <Input
                  className="bg-[#F5F5F5]"
                  id="password-mobile"
                  placeholder="Password"
                  type="password"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="confirm-password"
                >
                  Confirm Password
                </label>
                <Input
                  className="bg-[#F5F5F5]"
                  id="confirm-password-mobile"
                  placeholder="Confirm Password"
                  type="password"
                />
              </div>
            </div>
            
            <Button className="w-full  bg-[#0FBC43] mb-4" type="submit">
              Reset Password Now
            </Button>
          </form>
        </div>
    </div>
  );
}

function ChromeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}
