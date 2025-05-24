import { type NextRequest, NextResponse } from "next/server"
import { StudentBlockchain } from "@/lib/blockchain"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const recordId = Number.parseInt(params.id)

    const student = await prisma.student.findUnique({
      where: { recordId },
    })

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 })
    }

    return NextResponse.json(student)
  } catch (error) {
    console.error("Error fetching student:", error)
    return NextResponse.json({ error: "Failed to fetch student" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const recordId = Number.parseInt(params.id)
    const body = await request.json()
    const { studentCode, firstName, lastName, sex } = body

    if (!studentCode || !firstName || !lastName || !sex) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const student = await StudentBlockchain.updateStudent(recordId, {
      studentCode,
      firstName,
      lastName,
      sex,
    })

    return NextResponse.json(student)
  } catch (error) {
    console.error("Error updating student:", error)
    return NextResponse.json({ error: "Failed to update student" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const recordId = Number.parseInt(params.id)

    const student = await StudentBlockchain.deleteStudent(recordId)

    return NextResponse.json(student)
  } catch (error) {
    console.error("Error deleting student:", error)
    return NextResponse.json({ error: "Failed to delete student" }, { status: 500 })
  }
}
