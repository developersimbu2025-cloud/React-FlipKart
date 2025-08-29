import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Label from "../component/ui/label";
import Input from "../component/ui/input";
import Button from "../component/ui/button";
import { Validation } from "../data/Validation";
import { loginSuccess, setLoading } from "../store/slices/authSlice.ts";
import { useAppDispatch } from "../store/hooks";
type LoginFormType = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const validationErrors = Validation(formData);
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }
  //   dispatch(setLoading(true));
  //   dispatch(
  //     loginSuccess({
  //       id: "1",
  //       email: formData.email,
  //       name: formData.email,
  //     })
  //   );
  //   console.log(formData, "kkk");
  //   navigate("/");
  // };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log(formData, "kkk");
      const validationErrors = Validation(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      dispatch(setLoading(true));
      console.log(dispatch, "dispatchdispatchdispatch");
      setTimeout(() => {
        dispatch(
          loginSuccess({
            id: "1",
            email: formData.email,
            // name: formData.email,
            name: formData.email.split("@")[0],
          })
        );
        navigate("/");
      }, 1000);

      console.log(formData, "kkk");
    },
    [formData, Validation, dispatch, navigate]
  );

  return (
    <div className="min-h-screen bg-[#0d61fd] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">FlipKart</span>
          </Link>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-hover p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>
          <form onClick={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" text="Email Address" />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-600">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="password" text="Password" />
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full text-white bg-[#0d61fd]">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
