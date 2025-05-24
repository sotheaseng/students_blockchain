import { type NextRequest, NextResponse } from "next/server"
import { StudentBlockchain } from "@/lib/blockchain"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { studentCode, firstName, lastName, sex } = body

    if (!studentCode || !firstName || !lastName || !sex) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const student = await StudentBlockchain.createStudent({
      studentCode,
      firstName,
      lastName,
      sex,
    })

    return NextResponse.json(student)
  } catch (error) {
    console.error("Error creating student:", error)
    return NextResponse.json({ error: "Failed to create student" }, { status: 500 })
  }
}
