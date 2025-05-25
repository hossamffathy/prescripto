import { useDispatch } from "react-redux";
import { Form, redirect, useActionData } from "react-router-dom";
import {Link} from "react-router-dom"
import login from "./userSlice"
export async function signupAction({ request }) {
  const formData = await request.formData();

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
    bloodType: formData.get("bloodType"),
    gender: formData.get("gender")
  };

  try {
    const res = await fetch("/api/v1/patients/signup" , {


      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    

    if (!res.ok) {
      throw new Error(result.message || "Signup failed");
    }
 
    return redirect("/login");
  } catch (err) {
    return { error: err.message };
  }
}

export default function Signup() {
  const actionData = useActionData();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-1">Create Account</h2>
        <p className="text-sm text-gray-500 mb-6">Please sign up to book appointment</p>

        {actionData?.error && (
          <div className="text-red-600 mb-4">{actionData.error}</div>
        )}

        <Form method="post" className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" required className="w-full px-4 py-2 border rounded-md" />
          <input type="email" name="email" placeholder="Email" required className="w-full px-4 py-2 border rounded-md" />
          <input type="password" name="password" placeholder="Password" required className="w-full px-4 py-2 border rounded-md" />
          <input type="password" name="passwordConfirm" placeholder="Confirm Password" required className="w-full px-4 py-2 border rounded-md" />

          <select name="bloodType" required className="w-full px-4 py-2 border rounded-md">
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          <select name="gender" required className="w-full px-4 py-2 border rounded-md">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <button type="submit" className="w-full py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
            Create account
          </button>
        </Form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account? <Link to="/login" className="text-indigo-600">Login here</Link>
        </p>
      </div>
    </div>
  );
}
