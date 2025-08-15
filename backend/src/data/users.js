import bcrypt from "bcryptjs";

const { hash, compare } = bcrypt; // Add compare import

// Initialize with plain text passwords that will be hashed
let users = [
  { id: "1", email: "test@gmail.com", password: "password", name: "John" },
  { id: "2", email: "test2@gmail.com", password: "password2", name: "Max" },
  { id: "3", email: "test3@gmail.com", password: "password3", name: "Ivan" },
];

// Hash existing passwords on startup
const hashExistingPasswords = async () => {
  for (let user of users) {
    if (!user.password.startsWith("$2a$")) {
      // Check if already hashed
      user.password = await hash(user.password, 12);
    }
  }
};

// Call this on startup
hashExistingPasswords();

const usersData = {
  getAllUsers: () => users,
  findUser: (email) => users.find((u) => u.email === email),
  getUserById: (id) => users.find((u) => u.id === id.toString()),
  createUser: async ({ name, email, password }) => {
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    try {
      const hashedPassword = await hash(password, 12);
      const newUser = {
        id: (users.length + 1).toString(),
        name,
        email,
        password: hashedPassword,
      };

      users.push(newUser);
      console.log("New user created:", {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      });
      console.log("Total users after creation:", users.length);
      return {
        success: true,
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
      };
    } catch (error) {
      console.error("Error creating user:", error);
      return { success: false, message: "Error creating user" };
    }
  },
  verifyUser: async (email, password) => {
    if (!email || !password) {
      return {
        success: false,
        message: "Email and password are both required",
      };
    }

    const user = users.find((u) => u.email === email);

    if (!user) {
      return { success: false, message: "User not found" };
    }

    try {
      // Compare hashed password
      const isPasswordValid = await compare(password, user.password);

      if (isPasswordValid) {
        return {
          success: true,
          message: "User is verified!",
          user: { id: user.id, name: user.name, email: user.email },
        };
      } else {
        return { success: false, message: "Invalid password" };
      }
    } catch (error) {
      console.error("Password comparison error:", error);
      return { success: false, message: "Error verifying password" };
    }
  },
};

export default usersData;
