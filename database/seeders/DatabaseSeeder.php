<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create some sample students to demonstrate the blockchain
        $this->createStudent('ST001', 'John', 'Doe', 'Male');
        $this->createStudent('ST002', 'Jane', 'Smith', 'Female');
        $this->createStudent('ST003', 'Bob', 'Johnson', 'Male');
        
        // Update a student to show versioning
        $student = Student::where('student_code', 'ST002')->first();
        if ($student) {
            $this->updateStudent($student, 'ST002', 'Jane', 'Wilson', 'Female');
        }
    }
    
    private function createStudent($code, $firstName, $lastName, $sex)
    {
        $lastRecord = Student::orderBy('record_id', 'desc')->first();
        
        $student = new Student();
        $student->record_id = $lastRecord ? $lastRecord->record_id + 1 : 1;
        $student->student_code = $code;
        $student->first_name = $firstName;
        $student->last_name = $lastName;
        $student->sex = $sex;
        $student->status = 'INSERT';
        $student->version = 1;
        $student->previous_record_id = 0;
        $student->previous_hash = $lastRecord ? $lastRecord->current_hash : '0';
        $student->current_hash = $student->generateHash();
        $student->save();
    }
    
    private function updateStudent($originalStudent, $code, $firstName, $lastName, $sex)
    {
        $lastRecord = Student::orderBy('record_id', 'desc')->first();
        
        $student = new Student();
        $student->record_id = $lastRecord->record_id + 1;
        $student->student_code = $code;
        $student->first_name = $firstName;
        $student->last_name = $lastName;
        $student->sex = $sex;
        $student->status = 'UPDATE';
        $student->version = $originalStudent->version + 1;
        $student->previous_record_id = $originalStudent->record_id;
        $student->previous_hash = $lastRecord->current_hash;
        $student->current_hash = $student->generateHash();
        $student->save();
    }
}
