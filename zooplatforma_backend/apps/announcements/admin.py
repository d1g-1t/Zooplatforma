from django.contrib import admin
from apps.announcements.models import (
    Announcement,
    Comment,
    Category,
    Journal,
    JournalImage,
    LikeOnComment,
    LikeOnJournal,
    AnnouncementImage,
)

class BaseInline(admin.TabularInline):
    """Базовый класс для инлайнов."""
    extra = 0
    readonly_fields = ("created_at",)

class BaseAuthorAdmin(admin.ModelAdmin):
    """Базовый класс полем автора, для моделей в админке."""
    search_fields = ("author__username",)
    list_filter = ("author",)

class BaseWithCommentsAdmin(BaseAuthorAdmin):
    """Базовый класс для моделей с комментариями и записями в журнале."""
    
    @admin.display(description="Комментариев")
    def get_comment_count(self, obj):
        return obj.announcements_comment.count()

    @admin.display(description="Записей в журнале")
    def get_journal_count(self, obj):
        return obj.announcements_journal.count()

class CommentInline(BaseInline):
    model = Comment
    readonly_fields = BaseInline.readonly_fields + ("text",)

class JournalInline(BaseInline):
    model = Journal
    readonly_fields = BaseInline.readonly_fields + ("text",)

class LikeOnCommentInline(BaseInline):
    model = LikeOnComment
    readonly_fields = ("user", "created_at")

class LikeOnJournalInline(BaseInline):
    model = LikeOnJournal
    readonly_fields = ("user", "created_at")

class AnnouncementImageInline(admin.TabularInline):
    model = AnnouncementImage
    extra = 0
    readonly_fields = ("created_at",)

class JournalImageInline(BaseInline):
    model = JournalImage
    readonly_fields = ("image", "created_at")

class AnnouncementAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "author",
        "co_curator",
        "pet",
        "category",
        "title",
        "immediately",
        "completed",
        "published",
        "pet_with_me",
        "residence_place",
        "get_comments_count",
    )
    list_filter = ("author", "category", "immediately", "completed", "published")
    search_fields = ("title", "description", "address", "author__email", "co_curator__email")
    inlines = [AnnouncementImageInline]

    def get_comments_count(self, obj):
        return obj.get_comments_count()
    get_comments_count.short_description = "Количество комментариев"

@admin.register(Comment)
class CommentAdmin(BaseAuthorAdmin):
    list_display = (
        "id",
        "announcement",
        "author",
        "text",
        "get_likes_count",
    )
    inlines = (LikeOnCommentInline,)

    @admin.display(description="Лайков")
    def get_likes_count(self, obj):
        return obj.comment_likes.count()

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)

@admin.register(Journal)
class JournalAdmin(BaseAuthorAdmin):
    list_display = ("id", "announcement", "author", "text", "get_likes_count")
    inlines = (LikeOnJournalInline, JournalImageInline)

    @admin.display(description="Лайков")
    def get_likes_count(self, obj):
        return obj.journal_likes.count()