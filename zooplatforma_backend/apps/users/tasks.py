from celery import shared_task
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from apps.users.models import ZooUser
from apps.users.utils import generate_activation_link, generate_password_reset_link

@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def send_activation_email(self, user_id):
    """
    Отправка письма с активацией аккаунта.
    """
    try:
        user = ZooUser.objects.get(id=user_id)
        activation_link = generate_activation_link(user, domain=settings.DOMAIN)
        subject = 'Активация вашего аккаунта'
        from_email = settings.DEFAULT_FROM_EMAIL
        to = user.email
        text_content = f"Здравствуйте, {user.first_name}! Пожалуйста, активируйте свой аккаунт, перейдя по ссылке: {activation_link}"
        html_content = render_to_string('emails/activate_account.html', {'user': user, 'activation_link': activation_link})
        
        email = EmailMultiAlternatives(subject, text_content, from_email, [to])
        email.attach_alternative(html_content, "text/html")
        email.send()
    except ZooUser.DoesNotExist:
        self.retry(exc=ZooUser.DoesNotExist)
    except Exception as exc:
        self.retry(exc=exc)

@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def send_password_reset_email(self, user_id):
    """
    Отправка письма со ссылкой для восстановления пароля.
    """
    try:
        user = ZooUser.objects.get(pk=user_id)
        reset_link = generate_password_reset_link(user)

        context = {"user": user, "reset_link": reset_link}
        subject = "Сброс пароля"
        text_body = render_to_string("emails/password_reset_email.txt", context)
        html_body = render_to_string("emails/password_reset_email.html", context)

        msg = EmailMultiAlternatives(
            subject,
            text_body,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
        )
        msg.attach_alternative(html_body, "text/html")
        msg.send()
    except ZooUser.DoesNotExist:
        pass
    except Exception as exc:
        raise self.retry(exc=exc)

@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def send_curator_status_email(self, user_id):
    """
    Отправка письма пользователю после проверки его документов на статус куратора.
    """
    try:
        user = ZooUser.objects.get(pk=user_id)
        context = {"user": user}
        subject = "Статус куратора подтверждён"
        text_body = render_to_string("emails/curator_status_email.txt", context)
        html_body = render_to_string("emails/curator_status_email.html", context)

        msg = EmailMultiAlternatives(
            subject,
            text_body,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
        )
        msg.attach_alternative(html_body, "text/html")
        msg.send()
    except ZooUser.DoesNotExist:
        pass
    except Exception as exc:
        raise self.retry(exc=exc)

@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def send_complaint_email(self, user_id, complaint_category, complaint_message):
    """
    Отправка жалобы на сервисную почту и уведомление пользователя о принятии жалобы.
    """
    try:
        user = ZooUser.objects.get(pk=user_id)
        admin_email = settings.DEFAULT_FROM_EMAIL
        context = {
            "user": user,
            "category": complaint_category,
            "message": complaint_message,
        }
        subject_admin = f"Новая жалоба от {user.email} ({complaint_category})"
        text_body_admin = render_to_string("emails/complaint_email.txt", context)
        html_body_admin = render_to_string("emails/complaint_email.html", context)

        admin_msg = EmailMultiAlternatives(
            subject_admin, text_body_admin, settings.DEFAULT_FROM_EMAIL, [admin_email]
        )
        admin_msg.attach_alternative(html_body_admin, "text/html")
        admin_msg.send()

        subject_user = "Ваша жалоба принята"
        text_body_user = render_to_string("emails/complaint_user_response.txt", context)
        html_body_user = render_to_string("emails/complaint_user_response.html", context)

        user_msg = EmailMultiAlternatives(
            subject_user,
            text_body_user,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
        )
        user_msg.attach_alternative(html_body_user, "text/html")
        user_msg.send()

    except ZooUser.DoesNotExist:
        pass
    except Exception as exc:
        raise self.retry(exc=exc)