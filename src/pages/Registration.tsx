/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import GForm from "../components/form/GForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import GInput from "../components/form/GInput";
import GPassword from "../components/form/GPassword";
import { useRegisterMutation } from "../redux/feature/auth/auth.api";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../Schemas/auth.schema";

const Registration = () => {
    const navigate = useNavigate();
    const [register] = useRegisterMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Signing Up");
        const userInfo = {
            name: data.name,
            email: data.email,
            password: data.password,
        };
        try {
            const res = await register(userInfo).unwrap();

            if (res.success === false) {
                toast.error(res.message, {
                    id: toastId,
                    duration: 2000,
                });
            } else {
                toast.success(`${res.message}. Please Login.`, {
                    id: toastId,
                    duration: 2000,
                });
                navigate("/login");
            }
        } catch (error: any) {
            toast.error(error.data.message || "Failed to Login", {
                id: toastId,
                duration: 2000,
            });
        }
    };

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="bg-[var(--primary-color)] w-[300px] md:w-[400px] min-h-[200px] p-5 rounded-lg shadow-xl">
                <div className="flex flex-col items-center mb-3">
                    <h1 className="text-[var(--secondary-color)] text-3xl">
                        Sign Up
                    </h1>
                </div>
                <GForm
                    onSubmit={onSubmit}
                    disableReset={true}
                    resolver={zodResolver(registrationSchema)}
                >
                    <GInput
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        label="Name"
                    />
                    <GInput
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        label="Email"
                    />
                    <GPassword
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        label="Password"
                    />
                    <button
                        type="submit"
                        className="bg-[var(--secondary-color)] text-[var(--primary-color)] w-full py-2 rounded-lg"
                    >
                        Sign Up
                    </button>
                </GForm>
                <Divider className="my-6" />
                <div className="flex justify-start">
                    <p className="text-[var(--secondary-color)] mb-4">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-[var(--secondary-color)] underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Registration;
