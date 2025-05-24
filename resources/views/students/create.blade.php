@extends('layouts.app')

@section('title', 'Add Student - Student Blockchain')

@section('content')
<div class="page-header">
    <h2 class="page-title">
        <i class="fas fa-user-plus"></i> Add New Student
    </h2>
</div>

<div class="card">
    <div class="card-header">
        <i class="fas fa-form"></i> Student Information
    </div>
    <div class="card-body">
        <form method="POST" action="{{ route('students.store') }}">
            @csrf
            
            <div class="form-group">
                <label for="student_code" class="form-label">
                    <i class="fas fa-id-card"></i> Student Code
                </label>
                <input type="text" 
                       id="student_code" 
                       name="student_code" 
                       class="form-input" 
                       value="{{ old('student_code') }}" 
                       placeholder="e.g., ST001"
                       required>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                    <label for="first_name" class="form-label">
                        <i class="fas fa-user"></i> First Name
                    </label>
                    <input type="text" 
                           id="first_name" 
                           name="first_name" 
                           class="form-input" 
                           value="{{ old('first_name') }}" 
                           placeholder="Enter first name"
                           required>
                </div>

                <div class="form-group">
                    <label for="last_name" class="form-label">
                        <i class="fas fa-user"></i> Last Name
                    </label>
                    <input type="text" 
                           id="last_name" 
                           name="last_name" 
                           class="form-input" 
                           value="{{ old('last_name') }}" 
                           placeholder="Enter last name"
                           required>
                </div>
            </div>

            <div class="form-group">
                <label for="sex" class="form-label">
                    <i class="fas fa-venus-mars"></i> Sex
                </label>
                <select id="sex" name="sex" class="form-input" required>
                    <option value="">Select sex</option>
                    <option value="Male" {{ old('sex') === 'Male' ? 'selected' : '' }}>Male</option>
                    <option value="Female" {{ old('sex') === 'Female' ? 'selected' : '' }}>Female</option>
                    <option value="Other" {{ old('sex') === 'Other' ? 'selected' : '' }}>Other</option>
                </select>
            </div>

            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> Add to Blockchain
                </button>
                <a href="{{ route('students.index') }}" class="btn btn-primary">
                    <i class="fas fa-arrow-left"></i> Back to Students
                </a>
            </div>
        </form>
    </div>
</div>

<div class="info-card">
    <h4><i class="fas fa-info-circle"></i> Adding Students to Blockchain</h4>
    <ul>
        <li><strong>Immutable Record:</strong> Once added, the student record becomes part of the permanent blockchain</li>
        <li><strong>Unique Hash:</strong> Each record gets a unique cryptographic hash for verification</li>
        <li><strong>Chain Linking:</strong> New records are cryptographically linked to previous records</li>
        <li><strong>Version 1:</strong> This will be the initial version of the student record</li>
    </ul>
</div>
@endsection
