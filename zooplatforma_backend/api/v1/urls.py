from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views.announcements import AnnouncementViewSet
from .views.categories import CategoryViewSet
from .views.comments import CommentViewSet, LikeOnCommentViewSet
from .views.journals import JournalViewSet, LikeOnJournalViewSet, JournalImageViewSet
from .views.medias import MediaViewSet
from .views.curator import CuratorViewSet
from .views.pet import PetViewSet, PetPhotoViewSet
from .views.owner import PetOwnerViewSet
from .views.marking import PetMarkingViewSet
from .views.vaccination import VaccinationViewSet
from .views.treatments import TreatmentsViewSet
from .views.ownerprofile import OwnerProfileViewSet
from .views.user_profile import ZooUserViewSet
from .views.zoobase import ZoobaseViewSet


router = DefaultRouter()

router.register(r"announcements", AnnouncementViewSet)
router.register(r"categories", CategoryViewSet)
router.register(r"comments", CommentViewSet)
router.register(r"journals", JournalViewSet)
router.register(r"journal-images", JournalImageViewSet)
router.register(r"medias", MediaViewSet)
router.register(r"curators", CuratorViewSet)
router.register(r"pets", PetViewSet, basename="pet")
router.register(r"pet-photos", PetPhotoViewSet, basename="pet-photo")
router.register(r"pet-owners", PetOwnerViewSet, basename="pet-owner")
router.register(r"pet-markings", PetMarkingViewSet, basename="pet-marking")
router.register(r"vaccinations", VaccinationViewSet)
router.register(r"treatments", TreatmentsViewSet)
router.register(r"like-on-comments", LikeOnCommentViewSet)
router.register(r"like-on-journals", LikeOnJournalViewSet)
router.register(r'owner-profiles', OwnerProfileViewSet, basename='owner-profile')
router.register(r'zoobase', ZoobaseViewSet, basename='zoobase')
router.register(r"users", ZooUserViewSet, basename='user')

urlpatterns = [
    path("", include(router.urls)),
    path("", include("djoser.urls")),
    path("", include("djoser.urls.jwt")),
]