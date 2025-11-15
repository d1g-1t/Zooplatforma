from django.contrib import admin
from django.contrib.auth.models import Group

from apps.pets.models.owner import PetOwner
from apps.pets.models import (
    Pet,
    PetMarking,
    PetPhoto,
    Vaccination,
    Treatments,
)


@admin.register(PetMarking)
class PetMarkingAdmin(admin.ModelAdmin):
    list_display = ("id", "pet", "type", "number", "is_verifed")
    list_display_links = ("pet",)
    list_filter = ("type", "is_verifed")
    search_fields = ("pet", "number")


class PetMarkingInline(admin.TabularInline):
    model = PetMarking
    extra = 1



@admin.register(PetPhoto)
class PetPhotoAdmin(admin.ModelAdmin):
    list_display = ("id", "pet")
    list_display_links = ("pet",)
    search_fields = ("pet",)


class PetPhotoInline(admin.TabularInline):
    model = PetPhoto
    extra = 1


@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "type",
        "gender",
        "breed",
        "color",
        "date_of_birth",
        "date_birth_approx",
    )
    list_display_links = ("name",)
    list_filter = ("type", "gender")
    search_fields = ("name", "breed", "color")
    inlines = (PetMarkingInline, PetPhotoInline)


@admin.register(Vaccination)
class VaccinationAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "pet",
        "type",
        "medicament",
        "date_vaccination",
    )
    list_display_links = (
        "pet",
        "type",
        "medicament",
    )
    search_fields = (
        "pet",
        "type",
        "medicament",
    )


admin.site.unregister(Group)


@admin.register(Treatments)
class TreatmentsAdmin(admin.ModelAdmin):
    list_display = ("pet", "type_treatment", "medicament", "date_treatment", "created_at")
    search_fields = ("pet__name", "type_treatment", "medicament")
    list_filter = ("type_treatment", "medicament", "date_treatment")



@admin.register(PetOwner)
class PetOwnerAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'pet', 'get_ownership_status']

    def get_ownership_status(self, obj):
        return "Юридическое лицо" if obj.is_legal_entity else "Физическое лицо"
    get_ownership_status.short_description = 'Статус владения'
