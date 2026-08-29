import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  birthDay: string;
  gender: string;
  password?: string;
}
export const handleFormSubmit = async (
  formData: RegisterData,
  setErrors: (errors: Record<string, string>) => void,
) => {
  const newErrors: Record<string, string> = {};

  if (!formData.firstName.trim())
    newErrors.firstName = "Please enter your first name";
  if (!formData.lastName.trim())
    newErrors.lastName = "Last name can't be empty";
  if (!formData.birthDay.trim())
    newErrors.birthDay = "Don't forget to pick your birthday";
  if (!formData.gender.trim()) newErrors.gender = "Please select your gender";
  if (!formData.email.trim()) newErrors.email = "Email is required";
  if (!formData.password || formData.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return false;
  }
  setErrors({});
  return await executeRegister(formData, setErrors);
};

const executeRegister = async (
  data: RegisterData,
  err: (errors: Record<string, string>) => void,
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password || "",
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      birthDay: data.birthDay,
      gender: data.gender,
      profilePicture: "",
      bio:"",
      bannerPhoto: "",
      isPending:[],
      friends: [],
      createdAt: serverTimestamp(),
    });
    err({});
    console.log("Register Success");
    return true
  } catch (error: any) {
    switch (error.code) {
      case "auth/email-already-in-use":
        err({ email: "Email already registered!" });
        break;
      case "auth/weak-password":
        err({ password: "Password too weak, min 6 characters." });
        break;
      case "auth/invalid-email":
        err({ email: "Invalid email format." });
        break;
      default:
        err({ general: "Something went wrong, please try again." });
    }
    return false
  }
};
