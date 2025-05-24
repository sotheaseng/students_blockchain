import { PrismaClient } from "@prisma/client"
import { StudentBlockchain } from "../lib/blockchain"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create some sample students
  await StudentBlockchain.createStudent({
    studentCode: "ST001",
    firstName: "John",
    lastName: "Doe",
    sex: "Male",
  })

  await StudentBlockchain.createStudent({
    studentCode: "ST002",
    firstName: "Jane",
    lastName: "Smith",
    sex: "Female",
  })

  await StudentBlockchain.createStudent({
    studentCode: "ST003",
    firstName: "Bob",
    lastName: "Johnson",
    sex: "Male",
  })

  // Update a student to show versioning
  const students = await StudentBlockchain.getActiveStudents()
  const janeStudent = students.find((s) => s.studentCode === "ST002")

  if (janeStudent) {
    await StudentBlockchain.updateStudent(janeStudent.recordId, {
      studentCode: "ST002",
      firstName: "Jane",
      lastName: "Wilson",
      sex: "Female",
    })
  }

  console.log("Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
