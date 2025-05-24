import { PrismaClient } from "@prisma/client"
import { createHash } from "crypto"

const prisma = new PrismaClient()

export interface StudentData {
  recordId?: number
  studentCode: string
  firstName: string
  lastName: string
  sex: string
  status: "INSERT" | "UPDATE" | "DELETE"
  version: number
  previousRecordId: number
  previousHash: string
}

export class StudentBlockchain {
  static generateHash(data: StudentData): string {
    const hashString = `${data.recordId}${data.studentCode}${data.firstName}${data.lastName}${data.sex}${data.status}${data.version}${data.previousRecordId}${data.previousHash}`
    return createHash("sha256").update(hashString).digest("hex")
  }

  static async getLastRecord() {
    return await prisma.student.findFirst({
      orderBy: { recordId: "desc" },
    })
  }

  static async getActiveStudents() {
    // Get all record IDs that have been superseded
    const supersededIds = await prisma.student.findMany({
      where: { previousRecordId: { gt: 0 } },
      select: { previousRecordId: true },
    })

    const supersededIdList = supersededIds.map((s) => s.previousRecordId)

    // Return records that are not superseded and not deleted
    return await prisma.student.findMany({
      where: {
        AND: [{ recordId: { notIn: supersededIdList } }, { status: { not: "DELETE" } }],
      },
      orderBy: { recordId: "desc" },
    })
  }

  static async getAllRecords() {
    return await prisma.student.findMany({
      orderBy: { recordId: "asc" },
    })
  }

  static async validateBlockchain(): Promise<boolean> {
    const students = await this.getAllRecords()

    for (const student of students) {
      const expectedHash = this.generateHash({
        recordId: student.recordId,
        studentCode: student.studentCode,
        firstName: student.firstName,
        lastName: student.lastName,
        sex: student.sex,
        status: student.status as "INSERT" | "UPDATE" | "DELETE",
        version: student.version,
        previousRecordId: student.previousRecordId,
        previousHash: student.previousHash,
      })

      if (student.currentHash !== expectedHash) {
        return false
      }
    }

    return true
  }

  static async createStudent(
    data: Omit<StudentData, "recordId" | "status" | "version" | "previousRecordId" | "previousHash">,
  ) {
    const lastRecord = await this.getLastRecord()

    const studentData: StudentData = {
      recordId: lastRecord ? lastRecord.recordId + 1 : 1,
      ...data,
      status: "INSERT",
      version: 1,
      previousRecordId: 0,
      previousHash: lastRecord ? lastRecord.currentHash : "0",
    }

    const currentHash = this.generateHash(studentData)

    return await prisma.student.create({
      data: {
        recordId: studentData.recordId!,
        studentCode: studentData.studentCode,
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        sex: studentData.sex,
        status: studentData.status,
        version: studentData.version,
        previousRecordId: studentData.previousRecordId,
        previousHash: studentData.previousHash,
        currentHash,
      },
    })
  }

  static async updateStudent(
    originalRecordId: number,
    data: Omit<StudentData, "recordId" | "status" | "version" | "previousRecordId" | "previousHash">,
  ) {
    const originalStudent = await prisma.student.findUnique({
      where: { recordId: originalRecordId },
    })

    if (!originalStudent) {
      throw new Error("Student not found")
    }

    const lastRecord = await this.getLastRecord()

    const studentData: StudentData = {
      recordId: lastRecord!.recordId + 1,
      ...data,
      status: "UPDATE",
      version: originalStudent.version + 1,
      previousRecordId: originalStudent.recordId,
      previousHash: lastRecord!.currentHash,
    }

    const currentHash = this.generateHash(studentData)

    return await prisma.student.create({
      data: {
        recordId: studentData.recordId!,
        studentCode: studentData.studentCode,
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        sex: studentData.sex,
        status: studentData.status,
        version: studentData.version,
        previousRecordId: studentData.previousRecordId,
        previousHash: studentData.previousHash,
        currentHash,
      },
    })
  }

  static async deleteStudent(originalRecordId: number) {
    const originalStudent = await prisma.student.findUnique({
      where: { recordId: originalRecordId },
    })

    if (!originalStudent) {
      throw new Error("Student not found")
    }

    const lastRecord = await this.getLastRecord()

    const studentData: StudentData = {
      recordId: lastRecord!.recordId + 1,
      studentCode: originalStudent.studentCode,
      firstName: originalStudent.firstName,
      lastName: originalStudent.lastName,
      sex: originalStudent.sex,
      status: "DELETE",
      version: originalStudent.version + 1,
      previousRecordId: originalStudent.recordId,
      previousHash: lastRecord!.currentHash,
    }

    const currentHash = this.generateHash(studentData)

    return await prisma.student.create({
      data: {
        recordId: studentData.recordId!,
        studentCode: studentData.studentCode,
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        sex: studentData.sex,
        status: studentData.status,
        version: studentData.version,
        previousRecordId: studentData.previousRecordId,
        previousHash: studentData.previousHash,
        currentHash,
      },
    })
  }
}
