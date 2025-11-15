from PIL import Image
import os


class Converter:
    def __init__(self, width, height, format):
        self.width = width
        self.height = height
        self.format = format.upper()
        if self.format not in ["JPG", "PNG", "GIF"]:
            raise ValueError(
                "Выбран недопустимый формат изображения. Допустимые форматы: JPG, PNG, GIF"
            )

    def convert(self, image_path):
        with Image.open(image_path) as img:
            img = img.resize((self.width, self.height), Image.ANTIALIAS)
            new_image_path = self._get_new_image_path(image_path)
            img.save(new_image_path, self.format)
            return new_image_path

    def _get_new_image_path(self, image_path):
        base, ext = os.path.splitext(image_path)
        return f"{base}_{self.width}x{self.height}.{self.format.lower()}"
