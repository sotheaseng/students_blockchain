"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface DeleteButtonProps {
  recordId: number
}

export default function DeleteButton({ recordId }: DeleteButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (
      !confirm("Are you sure you want to delete this student? This action will create a new record in the blockchain.")
    ) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`/api/students/${recordId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete student")
      }

      router.push("/")
      router.refresh()
    } catch (error) {
      alert("Failed to delete student")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleDelete} className="btn btn-danger btn-sm" disabled={loading}>
      {loading ? "⏳" : "🗑️"} Delete
    </button>
  )
}
