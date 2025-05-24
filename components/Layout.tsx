"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname()

  return (
    <div className="container">
      <div className="header fade-in">
        <h1>🔗 Student Blockchain Management</h1>
        <p>Secure, immutable student record management with blockchain technology</p>
      </div>

      <nav className="nav fade-in">
        <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
          👥 Students
        </Link>
        <Link href="/create" className={`nav-link ${pathname === "/create" ? "active" : ""}`}>
          ➕ Add Student
        </Link>
        <Link href="/blockchain" className={`nav-link ${pathname === "/blockchain" ? "active" : ""}`}>
          🧊 Blockchain View
        </Link>
      </nav>

      <main className="main-content fade-in">{children}</main>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary-color: #667eea;
          --primary-dark: #5a67d8;
          --secondary-color: #764ba2;
          --success-color: #48bb78;
          --warning-color: #ed8936;
          --danger-color: #f56565;
          --info-color: #4299e1;
          --light-color: #f7fafc;
          --dark-color: #2d3748;
          --border-color: #e2e8f0;
          --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          --border-radius: 12px;
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: var(--dark-color);
        }

        .nav-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.9);
          color: var(--dark-color);
          text-decoration: none;
          border-radius: var(--border-radius);
          font-weight: 500;
          transition: var(--transition);
          box-shadow: var(--shadow);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .nav-link:hover {
          background: var(--primary-color);
          color: white;
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .nav-link.active {
          background: var(--primary-color);
          color: white;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 600;
          color: var(--dark-color);
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: var(--border-radius);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .status-valid {
          background: rgba(72, 187, 120, 0.1);
          color: var(--success-color);
          border: 1px solid rgba(72, 187, 120, 0.2);
        }

        .status-invalid {
          background: rgba(245, 101, 101, 0.1);
          color: var(--danger-color);
          border: 1px solid rgba(245, 101, 101, 0.2);
        }

        .alert {
          padding: 1rem 1.5rem;
          margin-bottom: 2rem;
          border-radius: var(--border-radius);
          border-left: 4px solid;
          font-weight: 500;
        }

        .alert-success {
          background: rgba(72, 187, 120, 0.1);
          color: var(--success-color);
          border-left-color: var(--success-color);
        }

        .alert-danger {
          background: rgba(245, 101, 101, 0.1);
          color: var(--danger-color);
          border-left-color: var(--danger-color);
        }

        .card {
          background: white;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
          overflow: hidden;
          transition: var(--transition);
        }

        .card:hover {
          box-shadow: var(--shadow-lg);
        }

        .card-header {
          padding: 1.5rem;
          background: var(--light-color);
          border-bottom: 1px solid var(--border-color);
          font-weight: 600;
          font-size: 1.1rem;
        }

        .card-body {
          padding: 1.5rem;
        }

        .table-container {
          overflow-x: auto;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
        }

        th {
          background: var(--light-color);
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: var(--dark-color);
          border-bottom: 2px solid var(--border-color);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        td {
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
          vertical-align: middle;
        }

        tr:hover {
          background: rgba(102, 126, 234, 0.05);
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: var(--border-radius);
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: var(--transition);
          font-size: 0.9rem;
          line-height: 1;
        }

        .btn:hover {
          transform: translateY(-1px);
          box-shadow: var(--shadow-lg);
        }

        .btn-primary {
          background: var(--primary-color);
          color: white;
        }

        .btn-primary:hover {
          background: var(--primary-dark);
        }

        .btn-success {
          background: var(--success-color);
          color: white;
        }

        .btn-success:hover {
          background: #38a169;
        }

        .btn-danger {
          background: var(--danger-color);
          color: white;
        }

        .btn-danger:hover {
          background: #e53e3e;
        }

        .btn-warning {
          background: var(--warning-color);
          color: white;
        }

        .btn-warning:hover {
          background: #dd6b20;
        }

        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: var(--dark-color);
        }

        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid var(--border-color);
          border-radius: var(--border-radius);
          font-size: 1rem;
          transition: var(--transition);
          background: white;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .status-insert {
          background: rgba(72, 187, 120, 0.1);
          color: var(--success-color);
        }

        .status-update {
          background: rgba(237, 137, 54, 0.1);
          color: var(--warning-color);
        }

        .status-delete {
          background: rgba(245, 101, 101, 0.1);
          color: var(--danger-color);
        }

        .hash {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.8rem;
          background: var(--light-color);
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          word-break: break-all;
          border: 1px solid var(--border-color);
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .info-card {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
          border: 1px solid rgba(102, 126, 234, 0.2);
          border-radius: var(--border-radius);
          padding: 1.5rem;
          margin-top: 2rem;
        }

        .info-card h4 {
          color: var(--primary-color);
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        .info-card ul {
          list-style: none;
          padding-left: 0;
        }

        .info-card li {
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(102, 126, 234, 0.1);
        }

        .info-card li:last-child {
          border-bottom: none;
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #64748b;
        }

        .empty-state .icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          color: var(--border-color);
        }

        .empty-state h3 {
          margin-bottom: 0.5rem;
          color: var(--dark-color);
        }

        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }

          .header {
            padding: 1.5rem;
          }

          .header h1 {
            font-size: 2rem;
          }

          .main-content {
            padding: 1.5rem;
          }

          .page-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .nav {
            flex-direction: column;
          }

          .action-buttons {
            flex-direction: column;
          }

          table {
            font-size: 0.9rem;
          }

          th, td {
            padding: 0.75rem 0.5rem;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
