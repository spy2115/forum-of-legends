from flask import Flask, jsonify, request
from flask_cors import CORS
from models import User, Thread, SessionLocal, Comment, Category
from sqlalchemy.orm import joinedload

app = Flask(__name__)
CORS(app)

@app.route('/api/login', methods=['POST'])
def login():
    db = SessionLocal()
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        user = db.query(User).filter(User.email == email).first()

        if not user:
            return jsonify({"error": "Invalid email or password"}), 401

        if user.password != password:
            return jsonify({"error": "Invalid email or password"}), 401

        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email
            }
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        db.close()


@app.route('/api/categories', methods=['GET'])
def get_categories():
    db = SessionLocal()
    try:
        categories = db.query(Category).all()

        categories_data = [
            {
                "id": category.id,
                "name": category.name
            }
            for category in categories
        ]

        return jsonify(categories_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        db.close()

@app.route('/api/threads', methods=['GET'])
def get_threads():
    db = SessionLocal()

    threads = db.query(Thread) \
            .options(joinedload(Thread.author), joinedload(Thread.category)) \
            .order_by(Thread.date_of_creation.desc()) \
            .all()

    db.close()

    threads_data = [
        {
            "id": thread.id,
            "title": thread.title,
            "author": {
                "id": thread.author.id,
                "name": thread.author.name,
                "email": thread.author.email
            },
            "date_of_creation": thread.date_of_creation,
            "is_open": thread.is_open,
            "comments_count": thread.comments_count,
            "category": thread.category.name
        }
        for thread in threads
    ]

    return jsonify(threads_data)

@app.route('/api/<string:category_name>/threads', methods=['GET'])
def get_threads_by_category(category_name: str):
    db = SessionLocal()
    try:
        category = db.query(Category).filter(Category.name == category_name).first()

        if not category:
            return jsonify({"error": f"Category '{category_name}' not found"}), 404

        threads = db.query(Thread).filter(Thread.category_id == category.id).order_by(Thread.date_of_creation.desc()).all()

        threads_data = [
            {
                "id": thread.id,
                "title": thread.title,
                "author_id": thread.author_id,
                "date_of_creation": thread.date_of_creation,
                "comments_count": thread.comments_count,
                "author_name": thread.author.name,
            }
            for thread in threads
        ]

        return jsonify({"category": category.name, "threads": threads_data}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        db.close()

@app.route('/api/<string:user_name>/followed_threads', methods=['GET'])
def get_followed_threads(user_name: str):
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.name == user_name).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        followed_threads = db.query(Thread).join(Thread.followers).filter(User.id == user.id).order_by(Thread.date_of_creation.desc()).all()

        threads_data = [{
            "id": thread.id,
            "title": thread.title,
            "author": thread.author.name,
            "category": thread.category.name,
            "followers_count": len(thread.followers),
            "date_of_creation": thread.date_of_creation,
            "comments_count": thread.comments_count
        } for thread in followed_threads]

        return jsonify(threads_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        db.close()

@app.route('/api/threads/<int:thread_id>/comments', methods=['GET'])
def get_comments_for_thread(thread_id: int):
    db = SessionLocal()

    comments = db.query(Comment).options(
        joinedload(Comment.author),
        joinedload(Comment.thread).joinedload(Thread.followers)  # Dołączamy followersów wątku
    ).filter(Comment.thread_id == thread_id).all()

    db.close()

    comments_data = [
        {
            "id": comment.id,
            "author": {
                "id": comment.author.id,
                "name": comment.author.name,
                "email": comment.author.email
            },
            "content": comment.content,
            "date_of_creation": comment.date_of_creation,
            "upvotes": comment.upvotes,
            "downvotes": comment.downvotes,
            "thread_title": comment.thread.title,
            "thread_followers": [follower.id for follower in comment.thread.followers]
        }
        for comment in comments
    ]

    return jsonify(comments_data)

@app.route('/api/users', methods=['POST'])
def create_user():
    db = SessionLocal()
    try:
        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if not name or not email:
            return jsonify({"error": "Name and email are required"}), 400

        if db.query(User).filter(User.email == email).first():
            return jsonify({"error": "Email already exists"}), 400

        new_user = User(name=name, email=email, password=password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return jsonify({
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        db.close()

@app.route('/api/threads', methods=['POST'])
def create_thread():
    db = SessionLocal()
    try:
        data = request.get_json()
        title = data.get("title")
        author_id = data.get("author")
        category_name = data.get("category")

        if not title or not category_name or not author_id:
            return jsonify({"error": "Title, category, and author are required"}), 400

        category = db.query(Category).filter(Category.name == category_name).first()
        if not category:
            return jsonify({"error": f"Category '{category_name}' does not exist."}), 400

        author = db.query(User).filter(User.id == author_id).first()
        if not author:
            return jsonify({"error": "Author not found"}), 400

        new_thread = Thread(title=title, author=author, category=category)
        db.add(new_thread)
        db.commit()
        db.refresh(new_thread)

        return jsonify({
            "id": new_thread.id,
            "title": new_thread.title,
            "author": {
                "id": author.id,
                "name": author.name,
                "email": author.email
            },
            "category": category.name
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        db.close()

@app.route('/api/threads/<int:thread_id>/comments', methods=['POST'])
def create_comment(thread_id: int):
    db = SessionLocal()
    try:
        data = request.get_json()
        content = data.get("content")
        author_id = data.get("author")

        if not content or not author_id:
            return jsonify({"error": "Content and author are required"}), 400

        thread = db.query(Thread).filter(Thread.id == thread_id).first()
        if not thread:
            return jsonify({"error": "Thread not found"}), 404

        author = db.query(User).filter(User.id == author_id).first()
        if not author:
            return jsonify({"error": "Author not found"}), 404

        new_comment = Comment(content=content, author=author, thread=thread)
        db.add(new_comment)
        db.commit()
        db.refresh(new_comment)

        thread.comments_count += 1
        db.commit()

        return jsonify({
            "id": new_comment.id,
            "content": new_comment.content,
            "author": {
                "id": author.id,
                "name": author.name,
                "email": author.email
            },
            "date_of_creation": new_comment.date_of_creation,
            "upvotes": new_comment.upvotes,
            "downvotes": new_comment.downvotes,
            "thread_id": thread.id,
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        db.close()

@app.route('/api/comments/<int:comment_id>/vote', methods=['POST'])
def vote_on_comment(comment_id: int):
    db = SessionLocal()
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        vote = data.get("vote")

        comment = db.query(Comment).filter(Comment.id == comment_id).first()
        user = db.query(User).filter(User.id == user_id).first()

        if not comment:
            return jsonify({"error": "Comment not found"}), 404

        if not user:
            return jsonify({"error": "User not found"}), 404

        if vote == 1:
            if user in comment.downvoters:
                comment.downvoters.remove(user)
                comment.downvotes -= 1

            if user not in comment.upvoters:
                comment.upvoters.append(user)
                comment.upvotes += 1
            else:
                comment.upvoters.remove(user)
                comment.upvotes -= 1

        elif vote == 0:
            if user in comment.upvoters:
                comment.upvoters.remove(user)
                comment.upvotes -= 1

            if user not in comment.downvoters:
                comment.downvoters.append(user)
                comment.downvotes += 1
            else:
                comment.downvoters.remove(user)
                comment.downvotes -= 1

        db.commit()

        return jsonify({
            "id": comment.id,
            "content": comment.content,
            "upvotes": comment.upvotes,
            "downvotes": comment.downvotes
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        db.close()


@app.route('/api/threads/<int:thread_id>/follow', methods=['POST'])
def follow_thread(thread_id: int):
    db = SessionLocal()
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        action = data.get("action")

        thread = db.query(Thread).filter(Thread.id == thread_id).first()
        user = db.query(User).filter(User.id == user_id).first()

        if not thread:
            return jsonify({"error": "Thread not found"}), 404

        if not user:
            return jsonify({"error": "User not found"}), 404

        if action == 1:
            if user not in thread.followers:
                thread.followers.append(user)

        elif action == 0:
            if user in thread.followers:
                thread.followers.remove(user)

        db.commit()

        return jsonify({
            "id": thread.id,
            "title": thread.title,
            "followers_count": len(thread.followers)
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        db.close()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)