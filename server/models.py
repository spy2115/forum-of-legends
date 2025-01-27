from sqlalchemy import Table, create_engine, Column, Integer, String, ForeignKey, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime

DATABASE_URL = "mysql+pymysql://root:1234@localhost:3306/my_flask_app"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Create an association table for upvoters
upvoter_association = Table(
    'upvoter_association',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('comment_id', Integer, ForeignKey('comments.id'), primary_key=True)
)

# Create an association table for downvoters
downvoter_association = Table(
    'downvoter_association',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('comment_id', Integer, ForeignKey('comments.id'), primary_key=True)
)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)

    # Relationships for upvoted and downvoted comments
    upvoted_comments = relationship('Comment', secondary=upvoter_association, back_populates="upvoters")
    downvoted_comments = relationship('Comment', secondary=downvoter_association, back_populates="downvoters")

class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)

    threads = relationship("Thread", back_populates="category")

class Thread(Base):
    __tablename__ = "threads"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    date_of_creation = Column(DateTime, default=datetime.utcnow)
    is_open = Column(Boolean, default=True)
    comments_count = Column(Integer, default=0)

    author = relationship("User", back_populates="threads")
    comments = relationship("Comment", back_populates="thread")
    category = relationship("Category", back_populates="threads")

class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True, index=True)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    thread_id = Column(Integer, ForeignKey("threads.id"), nullable=False)
    content = Column(String(500), nullable=False)
    date_of_creation = Column(DateTime, default=datetime.utcnow)
    upvotes = Column(Integer, default=0)
    downvotes = Column(Integer, default=0)

    # Relationships for upvoters and downvoters
    upvoters = relationship("User", secondary=upvoter_association, back_populates="upvoted_comments")
    downvoters = relationship("User", secondary=downvoter_association, back_populates="downvoted_comments")

    # Relationships to User and Thread models
    author = relationship("User", back_populates="comments")
    thread = relationship("Thread", back_populates="comments")

User.threads = relationship("Thread", back_populates="author")
User.comments = relationship("Comment", back_populates="author")
Thread.comments = relationship("Comment", back_populates="thread")

Base.metadata.create_all(bind=engine)
