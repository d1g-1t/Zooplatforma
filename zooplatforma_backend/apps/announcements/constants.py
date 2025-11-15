MAX_TEXT_LENGTH = 1024
MAX_ADRESS_LENGTH = 256
MAX_TITLE_LENGTH = 256
MIN_AMOUNT = 0.00
MAX_AMOUNT_LENGTH = 10
MAX_DECIMAL_PLACES = 2
MAX_RESIDENCE_PLACE_LENGTH = 256
MAX_CATEGORY_NAME_LENGTH = 256
MAX_IMAGE_NAME_LENGTH = 256
FUNDRAISING = "FUNDRAISING"
LOOKING_HOME = "LOOKING_HOME"
LOST_FOUND = "LOST_FOUND"
MARKING_TYPE_CHOICES = (
    (FUNDRAISING, "Сбор средств"),
    (LOOKING_HOME, "Ищет дом"),
    (LOST_FOUND, "Потерялся/Нашелся"),
)
HOME = "Дома"
NEW_PET = "Новый питомец"
PET_CHOICES = [
    ("Новый питомец", "Новый питомец"),
    ("Старый питомец", "Старый питомец")
]
GENDER_CHOICES = [
    ("Самец", "Самец"),
    ("Самка", "Самка")
]

RESIDENCE_PLACE = [
    ("Дома", "Дома"),
    ("На передержке", "На передержке"),
    ("В приюте", "В приюте")
]
