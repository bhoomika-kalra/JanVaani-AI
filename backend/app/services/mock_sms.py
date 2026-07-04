import logging

logger = logging.getLogger(__name__)

def send_dummy_sms(phone_number: str, message: str) -> str:
    """
    Mock SMS Provider Service.
    Logs the message to console and returns a dummy delivery status.
    """
    logger.info(f"--- MOCK SMS DISPATCH ---")
    logger.info(f"To: {phone_number}")
    logger.info(f"Message: {message}")
    logger.info(f"-------------------------")
    
    # Return a dummy success status
    return "Delivered"
