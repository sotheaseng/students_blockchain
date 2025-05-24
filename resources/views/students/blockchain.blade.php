@extends('layouts.app')

@section('title', 'Blockchain View - Student Blockchain')

@section('content')
<div class="page-header">
    <h2 class="page-title">
        <i class="fas fa-cubes"></i> Blockchain View
    </h2>
    <div class="status-indicator {{ $isValid ? 'status-valid' : 'status-invalid' }}">
        <i class="fas {{ $isValid ? 'fa-shield-alt' : 'fa-exclamation-triangle' }}"></i>
        <span>Chain Integrity: {{ $isValid ? 'VALID' : 'INVALID' }}</span>
    </div>
</div>

<div style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1)); padding: 1.5rem; border-radius: var(--border-radius); margin-bottom: 2rem; border: 1px solid rgba(102, 126, 234, 0.2);">
    <p><i class="fas fa-info-circle"></i> This view shows the complete blockchain including all historical versions, updates, and deletions. Each record is cryptographically linked to maintain data integrity.</p>
</div>

@if($students->count() > 0)
    <div class="card">
        <div class="card-header">
            <i class="fas fa-link"></i> Complete Blockchain History
            <span style="float: right; font-weight: normal; color: #64748b;">
                {{ $students->count() }} total {{ Str::plural('block', $students->count()) }}
            </span>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th><i class="fas fa-hashtag"></i> Block ID</th>
                        <th><i class="fas fa-id-card"></i> Student Code</th>
                        <th><i class="fas fa-user"></i> Name</th>
                        <th><i class="fas fa-venus-mars"></i> Sex</th>
                        <th><i class="fas fa-flag"></i> Status</th>
                        <th><i class="fas fa-code-branch"></i> Version</th>
                        <th><i class="fas fa-link"></i> Previous Block</th>
                        <th><i class="fas fa-fingerprint"></i> Hash</th>
                        <th><i class="fas fa-clock"></i> Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($students as $student)
                        <tr>
                            <td>
                                <strong style="color: var(--primary-color);">{{ $student->record_id }}</strong>
                            </td>
                            <td>{{ $student->student_code }}</td>
                            <td>{{ $student->first_name }} {{ $student->last_name }}</td>
                            <td>
                                <i class="fas {{ $student->sex === 'Male' ? 'fa-mars' : 'fa-venus' }}"></i>
                                {{ $student->sex }}
                            </td>
                            <td>
                                <span class="status-badge status-{{ strtolower($student->status) }}">
                                    <i class="fas fa-{{ $student->status === 'INSERT' ? 'plus' : ($student->status === 'UPDATE' ? 'edit' : 'trash') }}"></i>
                                    {{ $student->status }}
                                </span>
                            </td>
                            <td>
                                <span class="status-badge status-insert">v{{ $student->version }}</span>
                            </td>
                            <td>
                                @if($student->previous_record_id > 0)
                                    <span class="hash">{{ $student->previous_record_id }}</span>
                                @else
                                    <span style="color: #64748b; font-style: italic;">Genesis</span>
                                @endif
                            </td>
                            <td>
                                <span class="hash">{{ substr($student->current_hash, 0, 12) }}...</span>
                            </td>
                            <td>{{ $student->created_at->format('M d, Y H:i') }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
@else
    <div class="empty-state">
        <i class="fas fa-cubes"></i>
        <h3>Empty Blockchain</h3>
        <p>No blocks found in the blockchain. Add your first student to get started.</p>
        <a href="{{ route('students.create') }}" class="btn btn-primary">
            <i class="fas fa-user-plus"></i> Create Genesis Block
        </a>
    </div>
@endif

<div class="info-card">
    <h4><i class="fas fa-graduation-cap"></i> Understanding the Blockchain</h4>
    <ul>
        <li><strong><i class="fas fa-plus text-success"></i> INSERT:</strong> Creates a new student record (genesis or new entry)</li>
        <li><strong><i class="fas fa-edit text-warning"></i> UPDATE:</strong> Creates a new version that supersedes the previous record</li>
        <li><strong><i class="fas fa-trash text-danger"></i> DELETE:</strong> Marks a student as deleted while preserving history</li>
        <li><strong><i class="fas fa-link text-primary"></i> Hash Chain:</strong> Each block's hash includes the previous block's hash for integrity</li>
        <li><strong><i class="fas fa-shield-alt text-success"></i> Validation:</strong> System verifies that all hashes are correct and the chain is unbroken</li>
        <li><strong><i class="fas fa-history text-info"></i> Immutability:</strong> Once added, blocks cannot be modified, only superseded</li>
    </ul>
</div>
@endsection
