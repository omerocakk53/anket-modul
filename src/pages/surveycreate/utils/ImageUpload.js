export default async function ImageUpload(file, uploadImage) {
  const response = await uploadImage(file);
  return response.data;
}
