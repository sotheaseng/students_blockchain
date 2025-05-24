"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"

interface Student {
  recordId: number
  studentCode: string
  firstName: string
  lastName: string
  sex: string
  status: string
  version: number
  createdAt: string
}

export default function EditStudentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    studentCode: "",
    firstName: "",
    lastName: "",
    sex: "",
  })

  useEffect(() => {
    fetchStudent()
  }, [params.id])

  const fetchStudent = async () => {
    try {
      const response = await fetch(`/api/students/${params.id}`)
      if (!response.ok) throw new Error("Student not found")

      const studentData = await response.json()
      setStudent(studentData)
      setFormData({
        studentCode: studentData.studentCode,
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        sex: studentData.sex,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load student")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/students/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update student")
      }

      router.push("/")
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

  if (!student) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="page-header">
        <h2 className="page-title">✏️ Edit Student</h2>
        <div className="status-badge status-update">🔢 Creating Version {student.version + 1}</div>
      </div>

      {error && <div className="alert alert-danger">⚠️ {error}</div>}

      <div className="grid-2-1">
        <div className="card">
          <div className="card-header">📝 Update Student Information</div>
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
                  required
                />
              </div>

              <div className="grid-2">
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
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="sex" className="form-label">
                  ⚧ Sex
                </label>
                <select
                  id="sex"
                  name="sex"
                  className="form-input"
                  value={formData.sex}
                  onChange={handleChange}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex-gap">
                <button type="submit" className="btn btn-success" disabled={loading}>
                  {loading ? "⏳ Updating..." : "💾 Update Student"}
                </button>
                <Link href="/" className="btn btn-primary">
                  ← Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="card-header">ℹ️ Current Record Info</div>
          <div className="card-body">
            <div style={{ marginBottom: "1rem" }}>
              <strong>Record ID:</strong>
              <br />
              <span className="hash">{student.recordId}</span>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <strong>Current Version:</strong>
              <br />
              <span className={`status-badge status-${student.status.toLowerCase()}`}>v{student.version}</span>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <strong>Status:</strong>
              <br />
              <span className={`status-badge status-${student.status.toLowerCase()}`}>
                {student.status === "INSERT" ? "➕" : student.status === "UPDATE" ? "✏️" : "🗑️"}
                {student.status}
              </span>
            </div>

            <div>
              <strong>Created:</strong>
              <br />
              {format(new Date(student.createdAt), "MMM dd, yyyy HH:mm")}
            </div>
          </div>
        </div>
      </div>

      <div className="info-card">
        <h4>🔢 About Updates</h4>
        <ul>
          <li>
            <strong>Version Control:</strong> Updates create a new version (v{student.version + 1}) while preserving the
            original
          </li>
          <li>
            <strong>Blockchain Integrity:</strong> The new record will be cryptographically linked to the current chain
          </li>
          <li>
            <strong>Audit Trail:</strong> All previous versions remain accessible in the blockchain view
          </li>
          <li>
            <strong>Immutable History:</strong> Original data cannot be modified, only superseded
          </li>
        </ul>
      </div>
    </>
  )
}
