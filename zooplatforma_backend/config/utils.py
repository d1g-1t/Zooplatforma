from rest_framework.views import exception_handler
from rest_framework import serializers

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        if isinstance(exc, serializers.ValidationError):
            if isinstance(exc.detail, dict):
                messages = []
                for field_errors in exc.detail.values():
                    if isinstance(field_errors, list):
                        messages.extend(field_errors)
                    else:
                        messages.append(field_errors)
                message = " ".join(messages)
            elif isinstance(exc.detail, list):
                message = " ".join(exc.detail)
            else:
                message = str(exc.detail)
            
            custom_response = {
                "success": False,
                "message": message
            }
        else:
            custom_response = {
                "success": False,
                "message": str(exc)
            }
        response.data = custom_response

    return response