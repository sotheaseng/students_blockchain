import { StudentBlockchain } from "@/lib/blockchain"
import Link from "next/link"
import { format } from "date-fns"
import DeleteButton from "@/components/DeleteButton"

export default async function StudentsPage() {
  const students = await StudentBlockchain.getActiveStudents()
  const isValid = await StudentBlockchain.validateBlockchain()

  return (
    <>
      <div className="page-header">
        <h2 className="page-title">👥 Active Students</h2>
        <div className={`status-indicator ${isValid ? "status-valid" : "status-invalid"}`}>
          {isValid ? "🛡️" : "⚠️"}
          <span>Chain Integrity: {isValid ? "VALID" : "INVALID"}</span>
        </div>
      </div>

      {students.length > 0 ? (
        <div className="card">
          <div className="card-header">
            📊 Student Records
            <span style={{ float: "right", fontWeight: "normal", color: "#64748b" }}>
              {students.length} active {students.length === 1 ? "record" : "records"}
            </span>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>🆔 Student Code</th>
                  <th>👤 First Name</th>
                  <th>👤 Last Name</th>
                  <th>⚧ Sex</th>
                  <th>🔢 Version</th>
                  <th>📅 Created</th>
                  <th>⚙️ Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.recordId}>
                    <td>
                      <strong>{student.studentCode}</strong>
                    </td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>
                      {student.sex === "Male" ? "♂️" : "♀️"} {student.sex}
                    </td>
                    <td>
                      <span className="status-badge status-insert">v{student.version}</span>
                    </td>
                    <td>{format(new Date(student.createdAt), "MMM dd, yyyy")}</td>
                    <td>
                      <div className="action-buttons">
                        <Link href={`/students/${student.recordId}/edit`} className="btn btn-primary btn-sm">
                          ✏️ Edit
                        </Link>
                        <DeleteButton recordId={student.recordId} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <div className="icon">👥</div>
          <h3>No Students Found</h3>
          <p>Get started by adding your first student to the blockchain.</p>
          <Link href="/students/create" className="btn btn-primary">
            ➕ Add First Student
          </Link>
        </div>
      )}

      <div className="info-card">
        <h4>ℹ️ About Active Students</h4>
        <ul>
          <li>
            <strong>Active Records:</strong> Shows only the current version of each student
          </li>
          <li>
            <strong>Version Control:</strong> Each update creates a new version while preserving history
          </li>
          <li>
            <strong>Blockchain Security:</strong> All records are cryptographically linked for integrity
          </li>
          <li>
            <strong>Immutable History:</strong> Previous versions remain unchanged in the blockchain
          </li>
        </ul>
      </div>
    </>
  )
}
