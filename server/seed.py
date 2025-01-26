from models import User, SessionLocal

db = SessionLocal()

new_users = [
    User(name="Alice", email="alice@example.com"),
    User(name="Bob", email="bob@example.com"),
    User(name="Charlie", email="charlie@example.com"),
]

for user in new_users:
    db.add(user)

db.commit()

db.close()

print("Dummy data zostały dodane do bazy danych!")