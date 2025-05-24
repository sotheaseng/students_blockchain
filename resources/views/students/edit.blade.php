@extends('layouts.app')

@section('title', 'Edit Student - Student Blockchain')

@section('content')
<div class="page-header">
    <h2 class="page-title">
        <i class="fas fa-edit"></i> Edit Student
    </h2>
    <div class="status-badge status-update">
        <i class="fas fa-code-branch"></i> Creating Version {{ $student->version + 1 }}
    </div>
</div>

<div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
    <div class="card">
        <div class="card-header">
            <i class="fas fa-form"></i> Update Student Information
        </div>
        <div class="card-body">
            <form method="POST" action="{{ route('students.update', $student->record_id) }}">
                @csrf
                @method('PUT')
                
                <div class="form-group">
                    <label for="student_code" class="form-label">
                        <i class="fas fa-id-card"></i> Student Code
                    </label>
                    <input type="text" 
                           id="student_code" 
                           name="student_code" 
                           class="form-input" 
                           value="{{ old('student_code', $student->student_code) }}" 
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
                               value="{{ old('first_name', $student->first_name) }}" 
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
                               value="{{ old('last_name', $student->last_name) }}" 
                               required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="sex" class="form-label">
                        <i class="fas fa-venus-mars"></i> Sex
                    </label>
                    <select id="sex" name="sex" class="form-input" required>
                        <option value="Male" {{ old('sex', $student->sex) === 'Male' ? 'selected' : '' }}>Male</option>
                        <option value="Female" {{ old('sex', $student->sex) === 'Female' ? 'selected' : '' }}>Female</option>
                        <option value="Other" {{ old('sex', $student->sex) === 'Other' ? 'selected' : '' }}>Other</option>
                    </select>
                </div>

                <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                    <button type="submit" class="btn btn-success">
                        <i class="fas fa-save"></i> Update Student
                    </button>
                    <a href="{{ route('students.index') }}" class="btn btn-primary">
                        <i class="fas fa-arrow-left"></i> Cancel
                    </a>
                </div>
            </form>
        </div>
    </div>

    <div class="card">
        <div class="card-header">
            <i class="fas fa-info-circle"></i> Current Record Info
        </div>
        <div class="card-body">
            <div style="margin-bottom: 1rem;">
                <strong>Record ID:</strong><br>
                <span class="hash">{{ $student->record_id }}</span>
            </div>
            
            <div style="margin-bottom: 1rem;">
                <strong>Current Version:</strong><br>
                <span class="status-badge status-{{ strtolower($student->status) }}">
                    v{{ $student->version }}
                </span>
            </div>
            
            <div style="margin-bottom: 1rem;">
                <strong>Status:</strong><br>
                <span class="status-badge status-{{ strtolower($student->status) }}">
                    <i class="fas fa-{{ $student->status === 'INSERT' ? 'plus' : ($student->status === 'UPDATE' ? 'edit' : 'trash') }}"></i>
                    {{ $student->status }}
                </span>
            </div>
            
            <div style="margin-bottom: 1rem;">
                <strong>Created:</strong><br>
                {{ $student->created_at->format('M d, Y H:i') }}
            </div>
            
            <div>
                <strong>Current Hash:</strong><br>
                <span class="hash">{{ substr($student->current_hash, 0, 16) }}...</span>
            </div>
        </div>
    </div>
</div>

<div class="info-card">
    <h4><i class="fas fa-code-branch"></i> About Updates</h4>
    <ul>
        <li><strong>Version Control:</strong> Updates create a new version (v{{ $student->version + 1 }}) while preserving the original</li>
        <li><strong>Blockchain Integrity:</strong> The new record will be cryptographically linked to the current chain</li>
        <li><strong>Audit Trail:</strong> All previous versions remain accessible in the blockchain view</li>
        <li><strong>Immutable History:</strong> Original data cannot be modified, only superseded</li>
    </ul>
</div>
@endsection
