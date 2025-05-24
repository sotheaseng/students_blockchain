import Link from "next/link"
import { StudentBlockchain } from "@/lib/blockchain"
import { format } from "date-fns"

export default async function BlockchainPage() {
  const students = await StudentBlockchain.getAllRecords()
  const isValid = await StudentBlockchain.validateBlockchain()

  return (
    <>
      <div className="page-header">
        <h2 className="page-title">🧊 Blockchain View</h2>
        <div className={`status-indicator ${isValid ? "status-valid" : "status-invalid"}`}>
          {isValid ? "🛡️" : "⚠️"}
          <span>Chain Integrity: {isValid ? "VALID" : "INVALID"}</span>
        </div>
      </div>

      <div className="blockchain-info">
        <p>
          ℹ️ This view shows the complete blockchain including all historical versions, updates, and deletions. Each
          record is cryptographically linked to maintain data integrity.
        </p>
      </div>

      {students.length > 0 ? (
        <div className="card">
          <div className="card-header">
            🔗 Complete Blockchain History
            <span style={{ float: "right", fontWeight: "normal", color: "#64748b" }}>
              {students.length} total {students.length === 1 ? "block" : "blocks"}
            </span>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#️⃣ Block ID</th>
                  <th>🆔 Student Code</th>
                  <th>👤 Name</th>
                  <th>⚧ Sex</th>
                  <th>🏷️ Status</th>
                  <th>🔢 Version</th>
                  <th>🔗 Previous Block</th>
                  <th>🔐 Hash</th>
                  <th>⏰ Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.recordId}>
                    <td>
                      <strong style={{ color: "var(--primary-color)" }}>{student.recordId}</strong>
                    </td>
                    <td>{student.studentCode}</td>
                    <td>
                      {student.firstName} {student.lastName}
                    </td>
                    <td>
                      {student.sex === "Male" ? "♂️" : "♀️"} {student.sex}
                    </td>
                    <td>
                      <span className={`status-badge status-${student.status.toLowerCase()}`}>
                        {student.status === "INSERT" ? "➕" : student.status === "UPDATE" ? "✏️" : "🗑️"}
                        {student.status}
                      </span>
                    </td>
                    <td>
                      <span className="status-badge status-insert">v{student.version}</span>
                    </td>
                    <td>
                      {student.previousRecordId > 0 ? (
                        <span className="hash">{student.previousRecordId}</span>
                      ) : (
                        <span style={{ color: "#64748b", fontStyle: "italic" }}>Genesis</span>
                      )}
                    </td>
                    <td>
                      <span className="hash">{student.currentHash.substring(0, 12)}...</span>
                    </td>
                    <td>{format(new Date(student.createdAt), "MMM dd, yyyy HH:mm")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <div className="icon">🧊</div>
          <h3>Empty Blockchain</h3>
          <p>No blocks found in the blockchain. Add your first student to get started.</p>
          <Link href="/create" className="btn btn-primary">
            ➕ Create Genesis Block
          </Link>
        </div>
      )}

      <div className="info-card">
        <h4>🎓 Understanding the Blockchain</h4>
        <ul>
          <li>
            <strong>➕ INSERT:</strong> Creates a new student record (genesis or new entry)
          </li>
          <li>
            <strong>✏️ UPDATE:</strong> Creates a new version that supersedes the previous record
          </li>
          <li>
            <strong>🗑️ DELETE:</strong> Marks a student as deleted while preserving history
          </li>
          <li>
            <strong>🔗 Hash Chain:</strong> Each block's hash includes the previous block's hash for integrity
          </li>
          <li>
            <strong>🛡️ Validation:</strong> System verifies that all hashes are correct and the chain is unbroken
          </li>
          <li>
            <strong>📚 Immutability:</strong> Once added, blocks cannot be modified, only superseded
          </li>
        </ul>
      </div>
    </>
  )
}
