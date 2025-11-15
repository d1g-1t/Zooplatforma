from django.db import models
from apps.pets.models import Pet

class PetOwner(models.Model):
    pet = models.ForeignKey(
        Pet,
        on_delete=models.CASCADE,
        related_name='pet_owners',
        verbose_name="Питомец"
    )
    is_legal_entity = models.BooleanField("Юридическое лицо", default=False)
    inn = models.CharField("ИНН", max_length=12, null=True, blank=True)
    first_name = models.CharField("Имя", max_length=255)
    last_name = models.CharField("Фамилия", max_length=255)
    middle_name = models.CharField("Отчество", max_length=255, null=True, blank=True)
    email = models.EmailField("Электронная почта", null=True, blank=True)
    phone = models.CharField("Телефон", max_length=15)
    address = models.CharField("Адрес", max_length=256)
    citizenship = models.CharField("Гражданство", max_length=100)
    document_type = models.CharField("Тип документа", max_length=50)
    document_series_number = models.CharField("Серия и номер документа", max_length=50)
    document_issuance_date = models.DateField("Дата выдачи документа")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"