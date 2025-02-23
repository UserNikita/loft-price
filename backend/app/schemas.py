from .models import Apartment


ApartmentSchema = Apartment.schema.as_marshmallow_schema()


class UpdateApartmentSchema(ApartmentSchema):
    class Meta:
        fields = ["address", "location", "price", "deal_type"]


class CreateApartmentSchema(ApartmentSchema):
    class Meta:
        fields = ["url", "address", "location", "price", "deal_type"]
