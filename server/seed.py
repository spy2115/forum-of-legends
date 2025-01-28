from datetime import datetime
from models import User, Thread, Comment, SessionLocal, Category

db = SessionLocal()

# Tworzenie przykładowych kategorii
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
user1 = User(name="spy2115", email="spy@2115.com", password="password123")
user2 = User(name="Bugisymax", email="bugis@.com", password="password123")
user3 = User(name="Xardas25", email="Xardas25@example.com", password="password123")
user4 = User(name="teeziomek", email="teeziomek@.com", password="password123")
user5 = User(name="Venom", email="Venom@.com", password="password123")
user6 = User(name="SodaDrink", email="SodaDrink@.com", password="password123")
# Dodanie użytkowników do bazy
db.add(user1)
db.add(user2)
db.add(user3)
db.add(user4)
db.add(user5)
db.add(user6)
db.commit()

# Tworzenie przykładowego wątku
thread1 = Thread(title="Poradnik do Dariusa", author_id=1, category_id=category6.id)
db.add(thread1)
thread2 = Thread(title="Kiedy electrocute, a kiedy conqueror na Zedzie?", author_id=2, category_id=category2.id)
db.add(thread2)
thread3 = Thread(title="Itemy na supporta są niezbalansowane", author_id=3, category_id=category3.id)
db.add(thread3)
thread4 = Thread(title="Czy ktoś tu gra w PoE?", author_id=4, category_id=category4.id)
db.add(thread4)
thread5 = Thread(title="Mel, czy do reworka? W wydaję za mocne", author_id=5, category_id=category1.id)
db.add(thread5)
thread6 = Thread(title="T1 vs BLG", author_id=6, category_id=category5.id)
db.add(thread6)
thread7 = Thread(title="Varus pod AP, too OP czy skill issue", author_id=1, category_id=category1.id)
db.add(thread7)
thread8 = Thread(title="Ziggs, Detonacja turretów z % na hp na W wydaję się być overkillem", author_id=1, category_id=category1.id)
db.add(thread8)
db.commit()

# Tworzenie przykładowych komentarzy
comment1 = Comment(content="Grając Dariusem, należy znać podstawowe kombinacje umiejętności, typu auto-reset na w oraz pewne trafienie drugim pierścieniem Q poprzez użycie Q od razu po E. Dariusz jest bardzo mocną postacią już od pierwszego poziomu i trzeba budować przewagę od początku gry. Głównym celem wybrania tej postaci jest właśnie wygranie linii, w późniejszych walkach drużynowych często może się okazać nieużyteczny przez mały zasięg i brak możliwości skrócenia dystansu.", author_id=user1.id, thread_id=thread1.id)
comment2 = Comment(content="No w sumie to prawda, +1", author_id=user3.id, thread_id=thread1.id)
comment3 = Comment(content="W końcu ktoś to powiedział, DARIUSEM TRZEBA WYGRAĆ LINIE, there is no between", author_id=user5.id, thread_id=thread1.id)
comment4 = Comment(content="Zgadzam się", author_id=user4.id, thread_id=thread1.id)
comment5 = Comment(content="Dokładnie tak", author_id=user6.id, thread_id=thread1.id)
comment6 = Comment(content="Ostatnio zacząłem grać Zedem, ale nie wiem kiedy wybrać Electrocute, a kiedy Conqueror, poradzi ktoś?", author_id=user2.id, thread_id=thread2.id)
comment7 = Comment(content="Itemy na supporta dają za duże value w porównaniu z ich kosztem, ja wiem że support ma ograniczony przyrost golda, ale nie może być sytuacji, w której support z tanimi itemami robi tyle jakby miał kupione itemy niesupportowe", author_id=user3.id, thread_id=thread3.id)
comment8 = Comment(content="Zbieram ludzi do gildii i zapraszam wszystkich tu obecnych do mojej gildii w PoE", author_id=user4.id, thread_id=thread4.id)
comment9 = Comment(content="W mimo bycia nowego typu mechaniką w grze zdecydwowanie wydaje się być dla niej toksyczne i umożliwia za łatwy counterplay dla Mel", author_id=user5.id, thread_id=thread5.id)
comment10 = Comment(content="T1 vs BLG, co myślicie, lepsze finały niż Worldsy 2022 czy jednak to nie był jeszcze ten poziom??", author_id=user6.id, thread_id=thread6.id)
comment11 = Comment(content="Varus z Nashor Toothem i Solari jest w stanie na kombo zabić tanka z 3k hp, jeśli ten nie będzie miał itema pod resisty, czy powinny zostać zmienione przeliczniki na w z procentowymi obrażeniami czy tanki widząc Varusa muszą kupić do konfrontacji minimum jeden null magic mantle?", author_id=user1.id, thread_id=thread7.id)
comment12 = Comment(content="Detonacja turretów z pewnego % tresholda hp turreta wydaję się być bardzo mocną umiejętnością, szczególnie przy rotacji ziggsa na mapie przed upuszczeniem plate'ów, kiedy turrety normalnie byłyby bardzo tankowate oraz uwzględniając pasywke, która też zadaje dodatkowe obrażenia turretom. Riot powinien się przyglądnąć balansowi Ziggsa i moim zdaniem usunąć detonacje turretów z W", author_id=user1.id, thread_id=thread8.id)

# Dodanie komentarzy do bazy
db.add(comment1)
db.add(comment2)
db.add(comment3)
db.add(comment4)
db.add(comment5)
db.add(comment6)
db.add(comment7)
db.add(comment8)
db.add(comment9)
db.add(comment10)
db.add(comment11)
db.add(comment12)

thread1.comments_count += 5
thread2.comments_count += 1
thread3.comments_count += 1
thread4.comments_count += 1
thread5.comments_count += 1
thread6.comments_count += 1
thread7.comments_count += 1
thread8.comments_count += 1
db.commit()

# Dodanie upvotów do komentarzy
comment1.upvoters.append(user1)
comment1.upvoters.append(user2)
comment1.upvoters.append(user3)
comment1.upvoters.append(user4)
comment1.upvoters.append(user5)
comment1.upvoters.append(user6)

comment3.upvoters.append(user1)

comment6.upvoters.append(user1)
comment6.upvoters.append(user3)

comment7.upvoters.append(user3)
comment7.upvoters.append(user5)
comment7.downvoters.append(user6)
comment7.downvoters.append(user4)
comment7.downvoters.append(user1)

comment8.downvoters.append(user1)
comment8.downvoters.append(user2)
comment8.downvoters.append(user3)
comment8.downvoters.append(user5)
comment8.downvoters.append(user6)

comment9.downvoters.append(user4)
comment9.upvoters.append(user3)
comment9.upvoters.append(user6)
comment9.upvoters.append(user5)

comment10.upvoters.append(user1)
comment10.downvoters.append(user3)

comment11.upvoters.append(user1)
comment11.upvoters.append(user2)
comment11.upvoters.append(user4)
comment11.upvoters.append(user5)
comment11.upvoters.append(user3)
comment11.downvoters.append(user6)

comment12.upvoters.append(user1)
comment12.downvoters.append(user2)
comment12.downvoters.append(user4)
comment12.upvoters.append(user5)
comment12.downvoters.append(user3)
comment12.upvoters.append(user6)

comment1.upvotes = len(comment1.upvoters)
comment2.upvotes = len(comment2.upvoters)
comment3.upvotes = len(comment3.upvoters)
comment4.upvotes = len(comment4.upvoters)
comment5.upvotes = len(comment5.upvoters)
comment6.upvotes = len(comment6.upvoters)
comment7.upvotes = len(comment7.upvoters)
comment8.upvotes = len(comment8.upvoters)
comment9.upvotes = len(comment9.upvoters)
comment10.upvotes = len(comment10.upvoters)
comment11.upvotes = len(comment11.upvoters)
comment12.upvotes = len(comment12.upvoters)

comment1.downvotes = len(comment1.downvoters)
comment2.downvotes = len(comment2.downvoters)
comment3.downvotes = len(comment3.downvoters)
comment4.downvotes = len(comment4.downvoters)
comment5.downvotes = len(comment5.downvoters)
comment6.downvotes = len(comment6.downvoters)
comment7.downvotes = len(comment7.downvoters)
comment8.downvotes = len(comment8.downvoters)
comment9.downvotes = len(comment9.downvoters)
comment10.downvotes = len(comment10.downvoters)
comment11.downvotes = len(comment11.downvoters)
comment12.downvotes = len(comment12.downvoters)

db.commit()

db.close()

print("Dane zostały dodane do bazy danych!")
