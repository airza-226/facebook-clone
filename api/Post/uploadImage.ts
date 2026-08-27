export const uploadPostImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "test_preset_img");

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/rz3razsm/image/upload",
      {
        method: "POST",
        body: formData,
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Detail Error Cloudinary:", errorData);
      throw new Error("Failed to upload image to Cloudinary");
    }

    const data = await res.json();
    return data.secure_url;
  } catch (error) {
    console.error("error creating post", error);
    throw error;
  }
};
