"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

const CONSTITUTIONTEMP = ({ constitution }) => {
  const router = useRouter()

  // Utility to show "read more" on long text
  const ReadMoreText = ({ text, maxLength = 60 }) => {
    const [expanded, setExpanded] = useState(false)

    if (!text) return null

    if (expanded || text.length <= maxLength) {
      return <span>{text}</span>
    }

    return (
      <>
        {text.slice(0, maxLength)}...
        <button
          onClick={(e) => {
            e.stopPropagation()
            setExpanded(true)
          }}
          className="text-blue-200 underline ml-1"
        >
          read more
        </button>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-[#00103a] py-10">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {constitution.map((constitutionItem, index) => (
            <div
              key={constitutionItem?._id || index}
              className="card perspective-1000 cursor-pointer"
              onClick={() => router.push(`/pruser/constitutionid/${constitutionItem?._id}`)}
            >
              <div className="card-inner relative w-full h-full transition-all duration-700 transform-style-preserve-3d group">

                {/* Front Side */}
                <div
  style={{ backgroundImage: 'url("/c1.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}
  className="card-front absolute w-full h-80 backface-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white p-6 flex flex-col justify-between transition-all duration-700 group-hover:opacity-0"
 >

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Case Summary</h2>
                    <div className="space-y-2">
                      {constitutionItem?.name && (
                        <p className="text-sm break-words">
                          <span className="font-medium">Case Name:</span>{" "}
                          <ReadMoreText text={constitutionItem.name} />
                        </p>
                      )}
                      {constitutionItem?.alsoKnownAs && (
                        <p className="text-sm break-words">
                          <span className="font-medium">Also Known As:</span>{" "}
                          <ReadMoreText text={constitutionItem.alsoKnownAs} />
                        </p>
                      )}
                      {constitutionItem?.bench && (
                        <p className="text-sm break-words">
                          <span className="font-medium">Bench:</span>{" "}
                          <ReadMoreText text={constitutionItem.bench} />
                        </p>
                      )}
                    </div>
                    {(Array.isArray(constitutionItem?.["Equivalent citations"]) ||
                      constitutionItem?.["Equivalent citations"]) && (
                      <div>
                        <h3 className="text-lg font-semibold text-orange-200">Equivalent Citations</h3>
                        <p className="text-sm line-clamp-2 break-words">
                          {Array.isArray(constitutionItem["Equivalent citations"])
                            ? constitutionItem["Equivalent citations"].join(", ")
                            : constitutionItem["Equivalent citations"]}
                        </p>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-indigo-200 italic mt-4">Hover to see more details</p>
                </div>

                {/* Back Side */}
                 <div
      style={{ backgroundImage: 'url("/c1.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}
      className="card-back absolute w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 text-white p-6 transition-all duration-700 opacity-0 group-hover:opacity-100"
    >
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Key Info</h2>
                    {constitutionItem?.keyIssue && (
                      <p className="text-sm break-words">
                        <span className="font-semibold">Key Issue:</span> {constitutionItem.keyIssue}
                      </p>
                    )}

                    {constitutionItem?.judgment && (
                      <div>
                        <h3 className="text-lg font-semibold text-orange-200">Judgment Highlights</h3>
                        <p className="text-sm break-words">
                          <ReadMoreText
                            text={
                              Array.isArray(constitutionItem.judgment)
                                ? constitutionItem.judgment.join(" ")
                                : constitutionItem.judgment
                            }
                          />
                        </p>
                      </div>
                    )}

                    {constitutionItem?.importance && (
                      <div>
                        <h3 className="text-lg font-semibold text-orange-200">Importance</h3>
                        <p className="text-sm break-words">
                          <ReadMoreText
                            text={
                              Array.isArray(constitutionItem.importance)
                                ? constitutionItem.importance.join(" ")
                                : constitutionItem.importance
                            }
                          />
                        </p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default CONSTITUTIONTEMP
