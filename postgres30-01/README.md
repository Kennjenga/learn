## Running and Testing the App

Follow these steps to run and test the app:

### Step 1: Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-directory>
```

### Step 2: Install Dependencies

Install the necessary dependencies:

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory and add your environment variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DB_NAME?schema=public"
JWT_SECRET="your_jwt_secret_key"
```

### Step 4: Initialize Prisma

Initialize Prisma and run migrations to set up the database:

```bash
npx prisma migrate dev --name init
```

### Step 5: Start the Server

Start the Express server:

```bash
npm run dev
```

The server will be running on `http://localhost:3000`.

### Step 6: Test with Postman

#### Register a New User

Send a POST request to `http://localhost:3000/api/users/register` with the following JSON body:

```json
{
  "email": "user@example.com",
  "password": "secret123",
  "name": "John Doe"
}
```

#### Login

Send a POST request to `http://localhost:3000/api/users/login` with the following JSON body:

```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

You will receive a JWT token in the response.

#### Access Protected Route

Send a GET request to `http://localhost:3000/profile` with the JWT token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

You will receive the user's profile information in the response.

### Key Security Practices

- **Password Hashing**: Never store plain-text passwords (we used bcrypt with 10 salt rounds).
- **JWT Expiry**: Tokens expire after 1 hour (adjust in `generateToken`).
- **Environment Variables**: Keep secrets like `JWT_SECRET` and `DATABASE_URL` in `.env`.
- **HTTPS**: Always use HTTPS in production.
- **Input Validation**: Add validation for email/password (e.g., with Zod).

By following these steps, you can run and test the app effectively.

### Generating a JWT Secret

You can generate a secure JWT secret using one of the following methods:

#### a. Using Node.js Crypto Module

Run this in your terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

This will generate a 64-character random string.

#### b. Using Online Tools

You can use online tools like:

- RandomKeygen
- UUID Generator

#### c. Using OpenSSL

Run this in your terminal:

```bash
openssl rand -hex 32
```

This will also generate a 64-character random string.

Make sure to add the generated JWT secret to your `.env` file:

```env
JWT_SECRET="your_generated_jwt_secret"
```

### Explanation of Salt Rounds and JWT Secret

- **Salt Rounds**: Salt rounds determine the complexity of the hashing process. Higher salt rounds mean more computational effort to hash passwords, making it harder for attackers to crack them. We use 10 salt rounds for bcrypt hashing.
- **JWT Secret**: The JWT secret is a key used to sign and verify JWT tokens. It should be a long, random string to ensure security. This secret must be kept confidential and stored securely in your `.env` file.

By understanding these concepts, you can enhance the security of your application.
