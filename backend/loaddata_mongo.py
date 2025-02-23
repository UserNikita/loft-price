import os
import json

from pymongo import MongoClient
from bson import Decimal128

from app.config import Config
from app.schemas import CreateApartmentSchema


def get_apartment_collection():
    client = MongoClient(Config.MONGODB_URI)
    db = client[Config.MONGODB_DATABASE]
    return db.apartments


def get_data():
    data = {}
    files = os.listdir("../storage")
    for file_path in files:
        with open("../storage/" + file_path, encoding="utf-8") as f:
            for index, obj in enumerate(json.load(f)):
                try:
                    data[obj["url"]] = CreateApartmentSchema().load({
                        "url": obj["url"],
                        "address": obj["address"],
                        "price": float(obj["price"]),
                        "deal_type": obj["price_period"],
                        "location": {
                            "type": "Point",
                            "coordinates": list(obj["coordinates"].values())[::-1]
                        }
                    })
                    data[obj["url"]]["price"] = Decimal128(data[obj["url"]]["price"])
                except Exception as e:
                    print(e)
                    print("Error data", file_path, index)
                    # print(obj)
        #         break
        # break
    return data.values()


def main():
    apartments = get_apartment_collection()
    apartments.delete_many({})
    apartments.insert_many(get_data())


if __name__ == "__main__":
    main()
