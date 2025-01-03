import { useState } from "react";
import { validation } from "../../utils/validation";

interface FormState {
  name: { value: string; error: string };
  username: { value: string; error: string };
  email: { value: string; error: string };
  password: { value: string; error: string };
}

const Signup = () => {
  const [apiError, setApiError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formState, setFormState] = useState<FormState>({
    name: { value: "", error: "" },
    username: { value: "", error: "" },
    email: { value: "", error: "" },
    password: { value: "", error: "" },
  });

  // Compute isFormValid after formState is set
  const isFormValid = Object.values(formState).every((field) => !field.error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: { ...prev[name as keyof FormState], value, error: "" },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      name: formState.name.value,
      username: formState.username.value,
      email: formState.email.value,
      password: formState.password.value,
    };
    const { valid, newFormState } = validation(formData) as {
      valid: boolean;
      newFormState: FormState;
    };

    if (valid) {
      setIsSubmitting(true);
      try {
        const response = await fetch("/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.name.value,
            username: formState.username.value,
            email: formState.email.value,
            password: formState.password.value,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("User created:", data);

          window.location.href = `/users/${formState.username.value}`;
        } else {
          const errorData = await response.json();
          setApiError(errorData.message || "Failed to create user");
        }
      } catch (err: any) {
        setApiError(
          `An error occurpurple. Please try again later. Error is: ${err.message}`
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setFormState(newFormState);
    }
  };

  return (
    <div className="mx-auto bg-white my-8 py-6 px-12 rounded-xl shadow-2xl drop-shadow-2xl">
      <h2 className="text-3xl font-semibold text-center text-black mb-6">
        Signup
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-[280px]">
        <div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full Name"
            value={formState.name.value}
            onChange={handleChange}
            className="placeholder-neutral-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {formState.name.error && (
            <p className="text-purple-600 text-sm mt-1">{formState.name.error}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            value={formState.email.value}
            onChange={handleChange}
            className="placeholder-neutral-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {formState.email.error && (
            <p className="text-purple-600 text-sm mt-1">{formState.email.error}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formState.username.value}
            onChange={handleChange}
            className="placeholder-neutral-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {formState.username.error && (
            <p className="text-purple-600 text-sm mt-1">
              {formState.username.error}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formState.password.value}
            onChange={handleChange}
            className="placeholder-neutral-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {formState.password.error && (
            <p className="text-purple-600 text-sm mt-1">
              {formState.password.error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className={`placeholder-neutral-500 w-full py-2 ${
            isSubmitting || !isFormValid
              ? "bg-gray-400"
              : "bg-purple-600 hover:bg-rose-600"
          } text-white font-semibold rounded-lg focus:outline-none`}
        >
          {isSubmitting ? "Submitting..." : "Signup"}
        </button>

        {apiError && <p className="text-purple-600 text-sm mt-2">{apiError}</p>}
      </form>

      <div className="mt-4 text-center">
        <p className="text-black text-sm">
          Already have an account?{" "}
          <a
            href="/auth/signin"
            className="text-purple-600 hover:text-rose-600 font-semibold hover:underline"
          >
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
