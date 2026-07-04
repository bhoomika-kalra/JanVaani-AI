# JanVaani AI - Backend API Guide

Base URL for all endpoints: `http://127.0.0.1:8000/api/v1`

---

## 1. Citizen Endpoints

### POST `/citizens/register`
- **Purpose**: Register a new citizen account.
- **Authentication**: None
- **Request**:
```json
{
  "phone_number": "9876543210",
  "name": "Rahul Sharma",
  "constituency": "New Delhi",
  "language_preference": "Hindi"
}
```
- **Response**:
```json
{
  "access_token": "eyJhbG... (JWT)",
  "token_type": "bearer",
  "citizen": {
    "id": 1,
    "name": "Rahul Sharma",
    "phone_number": "9876543210"
  }
}
```

### POST `/citizens/login`
- **Purpose**: Login for existing citizens via phone number.
- **Authentication**: None
- **Request**:
```json
{
  "phone_number": "9876543210"
}
```
- **Response**: Same as `/register`.

### GET `/citizens/profile`
- **Purpose**: Retrieve the logged-in citizen's profile.
- **Authentication**: Required (Citizen JWT)
- **Request**: None
- **Response**:
```json
{
  "id": 1,
  "name": "Rahul Sharma",
  "phone_number": "9876543210",
  "constituency": "New Delhi",
  "language_preference": "Hindi"
}
```

### PUT `/citizens/profile`
- **Purpose**: Update the citizen profile.
- **Authentication**: Required (Citizen JWT)
- **Request**:
```json
{
  "name": "Rahul S."
}
```
- **Response**: Updated Citizen object.

### POST `/citizens/verify-id`
- **Purpose**: Submit government ID for profile verification (Multipart Form Data).
- **Authentication**: Required (Citizen JWT)
- **Request** (Form Data):
  - `id_type`: `Aadhaar`
  - `id_number`: `123456789012`
  - `file`: `[File Object]`
- **Response**:
```json
{
  "id": 1,
  "status": "pending",
  "id_type": "Aadhaar"
}
```

---

## 2. Complaints Endpoints

### POST `/complaints/`
- **Purpose**: Submit a new grievance.
- **Authentication**: Required (Citizen JWT)
- **Request**:
```json
{
  "title": "Broken Streetlight",
  "description": "Streetlight on MG road is flickering.",
  "department_id": 1,
  "location_lat": 28.6139,
  "location_lng": 77.2090,
  "address": "MG Road"
}
```
- **Response**:
```json
{
  "id": 1,
  "complaint_uid": "JV-2026-123456",
  "status": "pending",
  "title": "Broken Streetlight"
}
```

### GET `/complaints/{id}/tracking`
- **Purpose**: Retrieve the entire timeline of a specific complaint.
- **Authentication**: None
- **Request**: None
- **Response**:
```json
[
  {
    "id": 1,
    "status_title": "Complaint Registered",
    "description": "Your complaint is pending review.",
    "created_at": "2026-07-04T10:00:00Z"
  }
]
```

### POST `/complaints/{id}/support`
- **Purpose**: Upvote or support a complaint submitted by a neighbor.
- **Authentication**: Required (Citizen JWT)
- **Request**: None
- **Response**:
```json
{
  "complaint_id": 1,
  "total_supports": 5
}
```

---

## 3. AI Engine Endpoints

*(Mocked Rule-Based Engine)*

### POST `/ai/analyze-text`
- **Purpose**: Extract category and priority from raw grievance text.
- **Authentication**: None
- **Request**:
```json
{
  "text": "हमारे गांव में पानी की समस्या है"
}
```
- **Response**:
```json
{
  "detected_language": "Hindi",
  "category": "Water Supply",
  "priority_score": 92,
  "confidence": 94,
  "urgency": "High",
  "recommended_department": "Water Supply Department"
}
```

---

## 4. MP & Official Endpoints

### POST `/mp/login`
- **Purpose**: Login for MP/Officials.
- **Authentication**: None
- **Request**:
```json
{
  "email": "mp@janvaani.gov.in",
  "password": "securepassword123"
}
```
- **Response**:
```json
{
  "access_token": "eyJhbG...",
  "token_type": "bearer",
  "mp_user": {
    "email": "mp@janvaani.gov.in",
    "role": "mp"
  }
}
```

### GET `/mp/dashboard/overview`
- **Purpose**: High-level aggregated statistics for the MP dashboard charts.
- **Authentication**: Required (MP JWT)
- **Request**: None
- **Response**:
```json
{
  "totalComplaints": 1248,
  "activeIssues": 342,
  "aiRecommended": 12,
  "highPriority": 45,
  "completedWorks": 890,
  "citizenParticipation": "8.4k",
  "wards": [
    { "name": "Ward 14", "count": 145, "trend": "+12%" }
  ]
}
```

---

## 5. Workflow Endpoints

### PUT `/workflow/{complaint_id}/approve`
- **Purpose**: Advances a complaint status to "Approved" and notifies citizen.
- **Authentication**: Required (MP JWT)
- **Request**: None
- **Response**: Returns the updated complaint timeline array.

### PUT `/workflow/{complaint_id}/assign-department`
- **Purpose**: Assigns the issue to a dummy department (e.g., PWD).
- **Authentication**: Required (MP JWT)
- **Request**:
```json
{
  "department_name": "PWD",
  "description": "Please dispatch repair crew."
}
```
- **Response**: Returns the updated complaint timeline array.

---

## 6. Notifications Endpoints

### POST `/notifications/send-sms`
- **Purpose**: Manually dispatch a mock SMS to a citizen.
- **Authentication**: None
- **Request**:
```json
{
  "citizen_id": 1,
  "message": "Your project budget was approved today!"
}
```
- **Response**:
```json
{
  "id": 1,
  "status": "Delivered",
  "message": "Your project budget was approved today!"
}
```

---

## 7. Reports Endpoints

### GET `/reports/complaints-csv`
- **Purpose**: Streams a CSV export of all complaints.
- **Authentication**: Required (MP JWT)
- **Request**: None
- **Response**: `text/csv` streaming download.

### GET `/reports/ai-summary`
- **Purpose**: Executive text summary of the constituency.
- **Authentication**: Required (MP JWT)
- **Request**: None
- **Response**:
```json
{
  "title": "Constituency Health Report",
  "executive_summary": "Overall grievance resolution improved by 14%.",
  "critical_action_items": [
    "Approve budget for MG Road drainage repair."
  ]
}
```

---

## 8. Transparency Endpoints

### GET `/transparency/overview`
- **Purpose**: Public-facing high-level statistics for anonymous viewing.
- **Authentication**: None (Fully Public)
- **Request**: None
- **Response**:
```json
{
  "reported_issues": 1248,
  "approved_works": 145,
  "ongoing_works": 67,
  "completed_works": 890
}
```

### GET `/transparency/before-after`
- **Purpose**: Public visual proof of completed works.
- **Authentication**: None (Fully Public)
- **Request**: None
- **Response**:
```json
[
  {
    "project_id": "JV-2026-09122",
    "title": "Water Pipe Leak Fix",
    "before_url": "https://via.placeholder.com/300x200?text=Before",
    "after_url": "https://via.placeholder.com/300x200?text=After"
  }
]
```
