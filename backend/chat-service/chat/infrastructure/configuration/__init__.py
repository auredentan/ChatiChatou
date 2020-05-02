import os
from dataclasses import fields as dataclass_fields

from .dataclass import Configuration


def get():
    return Configuration(**env_data())


def env_data() -> dict:
    field_names = {field.name for field in dataclass_fields(Configuration)}
    return {key: value for key, value in os.environ.items() if key in field_names}
