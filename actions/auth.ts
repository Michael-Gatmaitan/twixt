"use server";
import { SignupFormSchema, FormState } from "@/lib/definitions";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { IUser } from "@/app";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success)
    return { errors: validatedFields.error.flatten().fieldErrors };

  await connectDB();

  const { name: username, password } = validatedFields.data;

  // Check if user already exists
  const user: IUser | null = await User.findOne({ username });

  // User already exists
  if (user?._id) {
    console.log("User exists.");
    return {
      message: "User already exists",
    };
  }

  // Create a user

  const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);

  // Generate hashed password
  const newUser: IUser | undefined | null = await User.create({
    username,
    password: hashedPassword,
    bio: "Put some bio here",
    status: "Active",
  });

  if (!newUser) {
    return {
      message: "There was an error while creating a new user.",
    };
  }

  // Call the provider or db to create a user...

  // Create session for new user
  await createSession(newUser._id);
  redirect("/me");
}

export async function login(state: FormState, formData: FormData) {
  // const formDataName = formData.get("name");
  // const formDataPassword = formData.get("password");
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, password } = validatedFields.data;

  await connectDB();
  // Find the user in the database;
  const user: IUser | undefined | null = await User.findOne(
    {
      username: name,
    },
    { _id: 1, password: 1 }
  );

  console.log(user, name);

  if (!user) return { message: "Invalid user" };

  const isPasswordvalid = await bcrypt.compare(password, user.password);

  if (!isPasswordvalid) return { message: "Password invalid" };

  // TODO: create session
  await createSession(user._id);
  redirect("/me");
  // TODO:
}

export async function logout() {
  deleteSession();
  redirect("/login");
}
