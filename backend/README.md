# JanVaani AI Backend

This is the backend API for JanVaani AI, built using FastAPI.

## Project Structure

- `app/api`: Contains all the API routing (e.g., `v1`).
- `app/core`: Core application settings, configurations, and global error handlers.
- `app/database`: Database connection and ORM session management.
- `app/models`: SQLAlchemy/ORM models.
- `app/schemas`: Pydantic models for data validation.
- `app/services`: Business logic and external service integrations.
- `app/utils`: Helper functions and utilities.
- `uploads/`: Directory for storing uploaded media.

## Setup

1. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```
2. **Activate the environment:**
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Environment Variables:**
   Copy the example config:
   ```bash
   cp .env.example .env
   ```

## Running the Server

Run the FastAPI development server using `uvicorn`:
```bash
uvicorn app.main:app --reload
```

The API will be available at: http://localhost:8000
Interactive Swagger documentation will be available at: http://localhost:8000/docs
