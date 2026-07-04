from pydantic_settings import BaseSettings

class AIConfig(BaseSettings):
    GEMINI_MODEL: str = "gemini-1.5-flash"
    MAX_RETRIES: int = 3
    TIMEOUT_SECONDS: int = 30
    
ai_settings = AIConfig()
