import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

type LoginData = {
  email: string;
  password: string;
};

export const handleLogin = async (
  user: LoginData,
  err: (errors: Record<string, string>) => void,
) => {
  const newErrors: Record<string, string> = {};
  if (!user.email) {
    newErrors.email = "Email cannot be empty";
  }
  if (!user.password) {
    newErrors.password = "Password cannot be empty";
  }

  if (Object.keys(newErrors).length > 0) {
    err(newErrors);
    return false;
  }

  err({});
  return await executeLogin(user, err);
};

const executeLogin = async (
  data: LoginData,
  err: (errors: Record<string, string>) => void,
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password,
    );
    console.log("success");
    return true;
  } catch (error: any) {
    console.log("Login gagal:", error.code);
    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/user-not-found"
    ) {
      err({
        form: "Wrong email or password. Please try again.",
      });
    }
    return false;
  }
};
