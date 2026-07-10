from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

try:
    hashed = get_password_hash("Test@123")
    assert verify_password("Test@123", hashed)
    print("Password hashing test passed!")
except Exception as e:
    print(f"Password hashing failed: {e}")
