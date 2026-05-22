
// Tell TypeScript that importing .jpg files is perfectly fine
declare module "*.jpg" {
  const value: string;
  export default value;
}

// Optional: Add support for other image types you might use
declare module "*.png" {
  const value: string;
  export default value;
}
declare module "*.svg" {
  const value: string;
  export default value;
}
