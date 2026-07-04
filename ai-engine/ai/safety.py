import re
import logging

logger = logging.getLogger(__name__)

class AISafetyError(Exception):
    """Custom exception raised when an input fails a safety check."""
    pass

def validate_text_input(text: str):
    """
    Validates that the input text is not empty, too short, spam, or abusive.
    Raises AISafetyError if validation fails.
    """
    if not text:
        raise AISafetyError("Complaint text is completely empty.")
        
    text_clean = text.strip()
    
    if len(text_clean) < 10:
        raise AISafetyError("Complaint is too short. Please provide more details.")
        
    # Basic Spam Check (e.g. repeated characters "aaaaaaa" or links)
    if re.search(r'(.)\1{10,}', text_clean):
        raise AISafetyError("Input flagged as spam due to excessive repeated characters.")
        
    if "http://" in text_clean or "https://" in text_clean:
        raise AISafetyError("External links are not allowed in complaints for security reasons.")
        
    # Basic Abusive Language Check (Dummy list for example)
    abusive_words = ["abuse1", "abuse2", "curseword", "hateword"]
    text_lower = text_clean.lower()
    for word in abusive_words:
        if word in text_lower:
            raise AISafetyError("Input flagged for inappropriate or abusive language.")

def validate_image(image_bytes: bytes):
    """
    Validates image bytes to ensure they are not empty and not excessively large.
    """
    if not image_bytes or len(image_bytes) == 0:
        raise AISafetyError("Uploaded image is empty or corrupted.")
        
    # Example: 10MB limit
    if len(image_bytes) > 10 * 1024 * 1024:
        raise AISafetyError("Image file size exceeds the 10MB limit.")

def validate_ai_confidence(confidence: int, threshold: int = 50):
    """
    Checks if the AI output confidence is too low.
    """
    if confidence < threshold:
        logger.warning(f"AI returned low confidence ({confidence}%). Requires manual review.")
        # We don't raise an error here, but we log it and could adjust the returned payload if needed.
