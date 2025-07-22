"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Clock, Calendar, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RelatedArticle } from "../../slidebar/RelatedArticleProps";
import ShareBookmarkButtons from "../../slidebar/ShareBookmarkButtons";
import Footer from "../../slidebar/FOOTER";
import { useModelContext } from "../../context/Context";

export default function LawyerProfilePage({ params }) {
  const router = useRouter();
  const { email } = useModelContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [newsId, setNewsId] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (email) {
      fetch(`/api/users?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("User data:", data);
          setIsAdmin(data.admin);
        })
        .catch((err) => console.error(err));
    }
  }, [email]);

  useEffect(() => {
    async function unwrapParams() {
      const resolvedParams = await params;
      if (resolvedParams?.news) {
        setNewsId(resolvedParams.news);
      } else {
        router.replace("/News");
      }
    }
    unwrapParams();
  }, [params, router]);

  useEffect(() => {
    if (!newsId) return;

    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(`/api/news?id=${newsId}`);
        const userData = await response.json();
        setNewsData(userData);
        setEditData(userData);

        if (userData?.category) {
          const relatedResponse = await fetch(`/api/news?category=${userData.category}&excludeId=${newsId}`);
          const relatedData = await relatedResponse.json();
          setRelatedArticles(relatedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [newsId]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this news article? This action cannot be undone.")) {
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`/api/news?id=${newsId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("News article deleted successfully!");
        router.push("/News");
      } else {
        const error = await response.json();
        alert(`Failed to delete news article: ${error.error}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting the news article.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/news?id=${newsId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setNewsData(updatedData);
        setIsEditing(false);
        alert("News article updated successfully!");
      } else {
        const error = await response.json();
        alert(`Failed to update news article: ${error.error}`);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while updating the news article.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditData(newsData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return <div className="min-h-screen bg-[#020B2C] text-white p-6">Loading...</div>;
  }

  if (!newsData) {
    return (
      <div className="min-h-screen bg-[#020B2C] text-white p-6">
        <h1>User not found</h1>
        <p>The profile you're looking for does not exist.</p>
      </div>
    );
  }

  const {
    image = "/placeholder.svg",
    headline = "No headline available",
    image2,
    description = "No description available",
    date = "No date provided",
    category = "Uncategorized",
    content = "No content available",
    readTime = "N/A",
    role = "Unknown role",
    feature = false,
  } = newsData;

  return (
    <div>
      <div className="min-h-screen bg-[#020B2C] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <Link
              href="/News"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 group transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to News
            </Link>

            {isAdmin && (
              <div className="flex space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleEdit}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={isSaving}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      {isSaving ? "Deleting..." : "Delete"}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <article className="bg-white/5 backdrop-blur rounded-xl overflow-hidden">
            <div className="relative h-[400px] w-full">
              {isEditing ? (
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/80 p-4">
                  <label className="text-white mb-2 text-center">Image URL:</label>
                  <input
                    type="text"
                    value={editData.image || ""}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                    className="w-full max-w-md px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {editData.image && (
                    <div className="mt-4 relative h-40 w-40">
                      <Image
                        src={editData.image || "/placeholder.svg"}
                        alt="Preview"
                        fill
                        unoptimized
                        className="object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={headline}
                    fill
                    unoptimized
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020B2C] to-transparent" />
                </>
              )}
            </div>

            <div className="relative -mt-32 p-6 sm:p-8 lg:p-12">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.readTime || ""}
                      onChange={(e) => handleInputChange("readTime", e.target.value)}
                      className="bg-gray-800 text-white px-2 py-1 rounded border border-gray-600"
                      placeholder="Read time"
                    />
                  ) : (
                    <span>{readTime}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.date || ""}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      className="bg-gray-800 text-white px-2 py-1 rounded border border-gray-600"
                      placeholder="Date"
                    />
                  ) : (
                    <span>{date}</span>
                  )}
                </div>
                {isEditing && (
                  <>
                    <div className="flex items-center gap-2 text-gray-400">
                      <span>Category:</span>
                      <input
                        type="text"
                        value={editData.category || ""}
                        onChange={(e) => handleInputChange("category", e.target.value)}
                        className="bg-gray-800 text-white px-2 py-1 rounded border border-gray-600"
                        placeholder="Category"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <span>Featured:</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editData.feature || false}
                          onChange={(e) => handleInputChange("feature", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">
                {isEditing ? (
                  <textarea
                    value={editData.headline || ""}
                    onChange={(e) => handleInputChange("headline", e.target.value)}
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="2"
                    placeholder="Headline"
                  />
                ) : (
                  headline
                )}
              </h1>

              {isEditing ? (
                <div className="mb-6">
                  <label className="text-white mb-2 block">Secondary Image URL (optional):</label>
                  <input
                    type="text"
                    value={editData.image2 || ""}
                    onChange={(e) => handleInputChange("image2", e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {editData.image2 && (
                    <div className="mt-4 relative h-[200px] w-full">
                      <Image
                        src={editData.image2 || "/placeholder.svg"}
                        alt="Preview"
                        fill
                        unoptimized
                        className="object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              ) : (
                image2 && (
                  <div className="relative h-[300px] mb-6 rounded-lg overflow-hidden">
                    <Image
                      src={image2 || "/placeholder.svg"}
                      alt="Article detail"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                )
              )}

              <p className="text-lg text-gray-300 mb-8">
                {isEditing ? (
                  <textarea
                    value={editData.description || ""}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Description"
                  />
                ) : (
                  description
                )}
              </p>

              <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-sm text-gray-400">{date}</div>
                    {!isEditing && feature && (
                      <div className="text-xs text-blue-400 font-semibold">FEATURED</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <ShareBookmarkButtons newsId={newsId} />
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                {isEditing ? (
                  <textarea
                    value={editData.content || ""}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="15"
                    placeholder="Content (HTML supported)"
                  />
                ) : (
                  content
                    .split("\n")
                    .filter((p) => p.trim() !== "")
                    .map((paragraph, index) => (
                      <p key={index} className="mb-4 leading-relaxed text-gray-300 text-lg">
                        {paragraph.trim()}
                      </p>
                    ))
                )}
              </div>

              {!isEditing && (
                <div className="mt-12">
                  <h2 className="text-2xl font-semibold mb-6">Related Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <RelatedArticle articles={relatedArticles} />
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </div>
  );
}
