from datetime import datetime
from models import User, Thread, Comment, SessionLocal, Category

db = SessionLocal()

category1 = Category(name="Postacie")
category2 = Category(name="Runy")
category3 = Category(name="Przedmioty")
category4 = Category(name="Dyskusje ogólne")
category5 = Category(name="E-sport")
category6 = Category(name="Poradniki")
category7 = Category(name="Buildy")


db.add(category1)
db.add(category2)
db.add(category3)
db.add(category4)
db.add(category5)
db.add(category6)
db.add(category7)
db.commit()

# Tworzenie przykładowych użytkowników
user1 = User(name="spy2115", email="spy@2115.com")
user2 = User(name="Bugisymax", email="bugis@.com")
user3 = User(name="Xardas25", email="Xardas25@example.com")
user4 = User(name="teeziomek", email="teeziomek@.com")
user5 = User(name="Venom", email="Venom@.com")
user6 = User(name="SodaDrink", email="SodaDrink@.com")

# Dodanie użytkowników do bazy
db.add(user1)
db.add(user2)
db.add(user3)
db.add(user4)
db.add(user5)
db.add(user6)
db.commit()

# Tworzenie przykładowego wątku
thread1 = Thread(title="Poradnik do Dariusa", author_id=1, category_id=category1.id)
db.add(thread1)
db.commit()

# Tworzenie przykładowych komentarzy
comment1 = Comment(content="Dariusz to postać, którą należy zawsze wygrać linie, inaczej jest uselles.", author_id=user1.id, thread_id=thread1.id)
comment2 = Comment(content="Moje ulubione gry to RPG i strategie.", author_id=user3.id, thread_id=thread1.id)
comment3 = Comment(content="Lubię gry akcji, szczególnie FPS.", author_id=user5.id, thread_id=thread1.id)
comment4 = Comment(content="Ja to gram w PoE.", author_id=user4.id, thread_id=thread1.id)
comment5 = Comment(content="Jestem na 400 fali z 60 niesporczakami i nie wiem co już robić.", author_id=user6.id, thread_id=thread1.id)

# Dodanie komentarzy do bazy
db.add(comment1)
db.add(comment2)
db.add(comment3)
db.add(comment4)
db.add(comment5)

thread1.comments_count += 5
db.commit()

db.close()

print("Dane zostały dodane do bazy danych!")
