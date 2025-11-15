from django.db import models

from apps.announcements.base import BaseLike
from apps.announcements.constants import MAX_TEXT_LENGTH
from apps.announcements.models.announcements import Announcement
from apps.announcements.models.base import User
from apps.pets.models.base import AbstractModelOnlyCreatedField


class Comment(AbstractModelOnlyCreatedField):
    """Модель комментария."""

    announcement = models.ForeignKey(
        Announcement,
        verbose_name="Комментарий",
        on_delete=models.CASCADE,
        related_name="announcements_comment",
    )
    author = models.ForeignKey(
        User,
        verbose_name="Автор комментария",
        on_delete=models.CASCADE,
        related_name="users_comments",
    )
    text = models.TextField(
        "Описание",
        max_length=MAX_TEXT_LENGTH,
        help_text="Ваш комментарий",
    )

    class Meta:
        verbose_name = "Комметарий"
        verbose_name_plural = "Комметарии"
        ordering = ("created_at",)

    def __str__(self) -> str:
        return f"{self.author} - {self.created_at}"


class LikeOnComment(BaseLike):
    """Модель лайка на комментарии."""

    comment = models.ForeignKey(
        Comment, related_name="comment_likes", on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = "Лайк на комментарии"
        verbose_name_plural = "Лайки на комментарии"
        constraints = [
            models.UniqueConstraint(
                fields=["comment", "user"], name="unique_user_comment_like"
            )
        ]
