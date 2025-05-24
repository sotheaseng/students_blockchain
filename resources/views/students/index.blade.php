@extends('layouts.app')

@section('title', 'Active Students - Student Blockchain')

@section('content')
<div class="page-header">
    <h2 class="page-title">
        <i class="fas fa-users"></i> Active Students
    </h2>
    <div class="status-indicator {{ $isValid ? 'status-valid' : 'status-invalid' }}">
        <i class="fas {{ $isValid ? 'fa-shield-alt' : 'fa-exclamation-triangle' }}"></i>
        <span>Chain Integrity: {{ $isValid ? 'VALID' : 'INVALID' }}</span>
    </div>
</div>

@if($students->count() > 0)
    <div class="card">
        <div class="card-header">
            <i class="fas fa-table"></i> Student Records
            <span style="float: right; font-weight: normal; color: #64748b;">
                {{ $students->count() }} active {{ Str::plural('record', $students->count()) }}
            </span>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th><i class="fas fa-id-card"></i> Student Code</th>
                        <th><i class="fas fa-user"></i> First Name</th>
                        <th><i class="fas fa-user"></i> Last Name</th>
                        <th><i class="fas fa-venus-mars"></i> Sex</th>
                        <th><i class="fas fa-code-branch"></i> Version</th>
                        <th><i class="fas fa-calendar"></i> Created</th>
                        <th><i class="fas fa-cogs"></i> Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($students as $student)
                        <tr>
                            <td>
                                <strong>{{ $student->student_code }}</strong>
                            </td>
                            <td>{{ $student->first_name }}</td>
                            <td>{{ $student->last_name }}</td>
                            <td>
                                <i class="fas {{ $student->sex === 'Male' ? 'fa-mars' : 'fa-venus' }}"></i>
                                {{ $student->sex }}
                            </td>
                            <td>
                                <span class="status-badge status-insert">
                                    v{{ $student->version }}
                                </span>
                            </td>
                            <td>{{ $student->created_at->format('M d, Y') }}</td>
                            <td>
                                <div class="action-buttons">
                                    <a href="{{ route('students.edit', $student->record_id) }}" class="btn btn-primary btn-sm">
                                        <i class="fas fa-edit"></i> Edit
                                    </a>
                                    <form method="POST" action="{{ route('students.destroy', $student->record_id) }}" style="display: inline;">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-danger btn-sm">
                                            <i class="fas fa-trash"></i> Delete
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
@else
    <div class="empty-state">
        <i class="fas fa-users"></i>
        <h3>No Students Found</h3>
        <p>Get started by adding your first student to the blockchain.</p>
        <a href="{{ route('students.create') }}" class="btn btn-primary">
            <i class="fas fa-user-plus"></i> Add First Student
        </a>
    </div>
@endif

<div class="info-card">
    <h4><i class="fas fa-info-circle"></i> About Active Students</h4>
    <ul>
        <li><strong>Active Records:</strong> Shows only the current version of each student</li>
        <li><strong>Version Control:</strong> Each update creates a new version while preserving history</li>
        <li><strong>Blockchain Security:</strong> All records are cryptographically linked for integrity</li>
        <li><strong>Immutable History:</strong> Previous versions remain unchanged in the blockchain</li>
    </ul>
</div>
@endsection
