from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.users.models import ZooUser
from apps.users.tasks import send_activation_email

@receiver(post_save, sender=ZooUser)
def send_activation_email_signal(sender, instance, created, **kwargs):
    if created and not instance.is_active:
        send_activation_email.delay(instance.id)