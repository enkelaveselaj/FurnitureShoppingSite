"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function CreateProduct() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    // Check authentication and admin role
    if (status === "loading") return;
    
    if (!session) {
      router.push("/login");
      return;
    }
    
    if (session.user?.role !== "admin") {
      router.push("/");
      return;
    }
  }, [session, status, router]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setUploadError("Invalid file type. Only JPEG, PNG, and WebP are allowed.");
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setUploadError("File too large. Maximum size is 5MB.");
      return;
    }

    setImageFile(file);
    setUploadError("");
    
    // Auto-upload the file
    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setForm({ ...form, image: data.url });
      } else {
        setUploadError(data.error || "Upload failed");
      }
    } catch (error) {
      setUploadError("Upload failed. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setForm({ ...form, image: "" });
    setUploadError("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      router.push("/admin/products");
    } catch (error) {
      setError("Failed to create product. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--light)] to-white">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              href="/admin/products"
              className="text-gray-600 hover:text-[var(--primary)] transition-colors duration-200"
            >
              ← Back to Products
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add New Product
          </h1>
          <p className="text-gray-600">
            Create a new product for your furniture inventory
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl">
          <div className="card bg-white rounded-xl shadow-xl p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g., Modern Oak Dining Table"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the product's features, materials, and design..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="sofa">Sofas</option>
                    <option value="chair">Chairs</option>
                    <option value="table">Tables</option>
                    <option value="bed">Beds</option>
                    <option value="storage">Storage</option>
                    <option value="decor">Decor</option>
                  </select>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image *
                </label>
                
                <div className="space-y-4">
                  {/* File Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors duration-200">
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                    <label 
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-gray-600 font-medium">
                        {uploading ? "Uploading..." : "Click to upload image"}
                      </span>
                      <span className="text-sm text-gray-500">
                        JPEG, PNG, or WebP (max 5MB)
                      </span>
                    </label>
                  </div>

                  {/* Upload Error */}
                  {uploadError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm">{uploadError}</p>
                    </div>
                  )}

                  {/* Upload Progress */}
                  {uploading && (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm text-gray-600">Uploading image...</span>
                    </div>
                  )}

                  {/* Image Preview */}
                  {(form.image || imageFile) && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Image Preview
                        </label>
                        <button
                          type="button"
                          onClick={removeImage}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={form.image || (imageFile ? URL.createObjectURL(imageFile) : "")}
                          alt="Product preview"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      {imageFile && (
                        <p className="text-sm text-gray-500 mt-1">
                          Selected: {imageFile.name} ({(imageFile.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[var(--primary)] hover:bg-[var(--secondary)] text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Product...
                    </div>
                  ) : (
                    "Create Product"
                  )}
                </button>
                <Link
                  href="/admin/products"
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-lg transition-all duration-200 text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}