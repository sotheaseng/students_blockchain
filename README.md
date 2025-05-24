# Next.js Student Blockchain Management System

A modern, secure student record management system built with blockchain technology using Next.js, TypeScript, and Prisma.

## 🚀 Features

- **Blockchain Technology**: Immutable record keeping with cryptographic hash chains
- **Version Control**: Complete audit trail of all changes
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Type Safety**: Full TypeScript implementation
- **Real-time Validation**: Blockchain integrity checking
- **CRUD Operations**: Create, read, update, and delete students
- **Data Integrity**: SHA256 hash verification

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Styling**: CSS-in-JS with modern design
- **Blockchain**: Custom implementation with SHA256 hashing

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd nextjs-student-blockchain
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up the database**
   \`\`\`bash
   npx prisma db push
   \`\`\`

4. **Seed with sample data**
   \`\`\`bash
   npm run db:seed
   \`\`\`

5. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   \`\`\`
   http://localhost:3000
   \`\`\`

## 🔗 How the Blockchain Works

### Hash Chain Structure
Each student record contains:
- **Record ID**: Unique identifier
- **Student Data**: Code, name, sex
- **Status**: INSERT, UPDATE, or DELETE
- **Version**: Incremental version number
- **Previous Hash**: Hash of the previous record
- **Current Hash**: SHA256 hash of all record data

### Operations
- **INSERT**: Creates new student records
- **UPDATE**: Creates new version while preserving history
- **DELETE**: Marks student as deleted without removing data
- **VALIDATION**: Verifies entire chain integrity

### Data Integrity
- Each record's hash includes the previous record's hash
- Any tampering breaks the chain and is detected
- Complete audit trail of all changes
- Immutable history preservation

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── students/          # Student pages
│   ├── blockchain/        # Blockchain view
│   └── layout.tsx         # Root layout
├── components/            # React components
├── lib/                   # Blockchain logic
├── prisma/               # Database schema & seed
└── README.md
\`\`\`

## 🎨 Features

### Student Management
- View active students
- Add new students
- Update existing students (creates new version)
- Delete students (creates deletion record)

### Blockchain View
- Complete transaction history
- Hash verification
- Chain integrity status
- Audit trail

### Modern UI
- Responsive design
- Smooth animations
- Professional styling
- Intuitive navigation

## 🔐 Security Features

- **Cryptographic Hashing**: SHA256 for data integrity
- **Immutable Records**: No data modification, only versioning
- **Chain Validation**: Real-time integrity checking
- **Audit Trail**: Complete history of all changes

## 📊 Database Schema

\`\`\`sql
CREATE TABLE students (
  record_id INTEGER PRIMARY KEY,
  student_code TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  sex TEXT NOT NULL,
  status TEXT NOT NULL,
  version INTEGER NOT NULL,
  previous_record_id INTEGER NOT NULL,
  previous_hash TEXT NOT NULL,
  current_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

## 🚀 Deployment

The application can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **Railway**
- **Docker**

For production, consider switching from SQLite to PostgreSQL or MySQL.

## 📝 License

This project is open source and available under the MIT License.
