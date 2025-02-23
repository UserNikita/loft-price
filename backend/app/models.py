from enum import Enum

from aiohttp import web
from datetime import datetime
from umongo import Document, fields
from .db import instance


async def create_indexes(app: web.Application) -> None:
    await Apartment.ensure_indexes()
    await Apartment.collection.create_index([("location", "2dsphere")])


class DealType(Enum):
    DAILY_RENT = "daily_rent"
    MONTHLY_RENT = "monthly_rent"
    SALE = "sale"


@instance.register
class Apartment(Document):
    url = fields.URLField(required=True, unique=True)
    created_time = fields.DateTimeField(default=datetime.utcnow)
    address = fields.StringField(required=True)
    location = fields.DictField()
    price = fields.DecimalField(required=True)
    deal_type = fields.StringField(choices=DealType, required=True)

    class Meta:
        collection_name = "apartments"
        indexes = ['-created_time']
