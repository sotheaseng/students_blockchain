"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function CreateStudentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    studentCode: "",
    firstName: "",
    lastName: "",
    sex: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create student")
      }

      router.push("/students")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <div className="page-header">
        <h2 className="page-title">➕ Add New Student</h2>
      </div>

      {error && <div className="alert alert-danger">⚠️ {error}</div>}

      <div className="card">
        <div className="card-header">📝 Student Information</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="studentCode" className="form-label">
                🆔 Student Code
              </label>
              <input
                type="text"
                id="studentCode"
                name="studentCode"
                className="form-input"
                value={formData.studentCode}
                onChange={handleChange}
                placeholder="e.g., ST001"
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  👤 First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-input"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  👤 Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-input"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="sex" className="form-label">
                ⚧ Sex
              </label>
              <select id="sex" name="sex" className="form-input" value={formData.sex} onChange={handleChange} required>
                <option value="">Select sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? "⏳ Adding..." : "💾 Add to Blockchain"}
              </button>
              <Link href="/students" className="btn btn-primary">
                ← Back to Students
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="info-card">
        <h4>ℹ️ Adding Students to Blockchain</h4>
        <ul>
          <li>
            <strong>Immutable Record:</strong> Once added, the student record becomes part of the permanent blockchain
          </li>
          <li>
            <strong>Unique Hash:</strong> Each record gets a unique cryptographic hash for verification
          </li>
          <li>
            <strong>Chain Linking:</strong> New records are cryptographically linked to previous records
          </li>
          <li>
            <strong>Version 1:</strong> This will be the initial version of the student record
          </li>
        </ul>
      </div>
    </>
  )
}
