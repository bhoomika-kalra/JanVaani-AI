import logging
from contextlib import asynccontextmanager
import time
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.config import settings
from app.core.errors import add_exception_handlers
from app.api.v1.api import api_router
from app.database.session import engine, SessionLocal
from app.database.base_class import Base
from app.database.seed import seed_db

# Setup basic logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create tables and seed data
    logger.info("Initializing database tables...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        seed_db(db)
    finally:
        db.close()
        
    yield
    # Shutdown logic can go here

def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
        lifespan=lifespan
    )

    # Set up CORS middleware
    origins = [str(origin) for origin in settings.BACKEND_CORS_ORIGINS] if settings.BACKEND_CORS_ORIGINS else []
    origins.extend(["https://jan-vaani-ai-one.vercel.app", "http://localhost:5173"])
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Add exception handlers
    add_exception_handlers(app)

    @app.middleware("http")
    async def log_requests(request: Request, call_next):
        start_time = time.time()
        response = await call_next(request)
        process_time = time.time() - start_time
        logger.info(
            f"Path: {request.url.path} "
            f"Method: {request.method} "
            f"Status: {response.status_code} "
            f"Time: {process_time:.4f}s"
        )
        return response

    # Include the API router
    app.include_router(api_router, prefix=settings.API_V1_STR)

    @app.get("/health", tags=["Health"])
    async def health_check():
        return {"status": "ok", "version": settings.VERSION}

    @app.post("/admin/populate-demo", tags=["Admin"])
    async def populate_demo():
        db = SessionLocal()
        try:
            # You might want to clear tables or just run seed_db if it handles existence
            seed_db(db)
            return {"status": "success", "message": "Demo data populated."}
        finally:
            db.close()

    # Mount static files for uploads
    app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

    return app

app = create_app()
