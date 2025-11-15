from django.urls import reverse
import pytest


@pytest.mark.django_db
def test_admin_page(client):
    response = client.get(reverse("admin:login"))
    assert response.status_code == 200
