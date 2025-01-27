import mysql.connector

# Database credentials
DB_HOST = "localhost"
DB_USER = "root"
DB_PASSWORD = "1234"
DB_NAME = "my_flask_app"

try:
    # Connect to MySQL server
    conn = mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD
    )
    cursor = conn.cursor()

    # Drop the database
    cursor.execute(f"DROP DATABASE IF EXISTS {DB_NAME}")
    print(f"Database '{DB_NAME}' dropped successfully.")

    # Recreate the database
    cursor.execute(f"CREATE DATABASE {DB_NAME}")
    print(f"Database '{DB_NAME}' created successfully.")

    # Close connection
    cursor.close()
    conn.close()

except mysql.connector.Error as err:
    print(f"Error: {err}")
