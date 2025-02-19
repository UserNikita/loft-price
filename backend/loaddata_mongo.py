import os
import json

from pymongo import MongoClient

from app.config import Config


def get_apartment_collection():
    client = MongoClient(Config.MONGODB_URI)
    db = client[Config.MONGODB_DATABASE]
    return db.apartments


def get_data():
    data = []
    files = os.listdir("../storage")
    for file_path in files:
        with open("../storage/" + file_path, encoding="utf-8") as f:
            for index, obj in enumerate(json.load(f)):
                try:
                    data.append({
                        "url": obj["url"],
                        "address": obj["address"],
                    })
                except:
                    # print()
                    print("Error data", file_path, index)
                    # print(obj)
    return data


def main():
    apartments = get_apartment_collection()
    apartments.insert_many(get_data())


if __name__ == "__main__":
    main()
