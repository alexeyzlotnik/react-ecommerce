import bcrypt from "bcryptjs";

const { hash } = bcrypt

// Initialize with plain text passwords that will be hashed
let users = [
  { id: '1', email: 'test@gmail.com', password: 'password', name: 'John' },
  { id: '2', email: 'test2@gmail.com', password: 'password2', name: 'Max' },
  { id: '3', email: 'test3@gmail.com', password: 'password3', name: 'Ivan' },
];

const usersData = {
  getAllUsers: () => users,
  findUser: (email) => users.find(u => u.email === email),
  getUserById: (id) => users.find(u => u.id === id.toString()),
  createUser: async ({ name, email, password }) => {
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      return { success: false, message: 'User already exists' };
    }

    try {
      const hashedPassword = await hash(password, 12);
      const newUser = {
        id: (users.length + 1).toString(),
        name,
        email,
        password: hashedPassword
      };

      users.push(newUser);
      return { success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email } };
    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, message: 'Error creating user' };
    }
  },
  verifyUser: async (email, password) => {
    if (!email || !password) {
      return { success: false, message: 'Email and password are both required' };
    }

    const emailIsValid = users.find(u => u.email === email)
    const passwordIsValid = users.find(u => u.password === password) // TODO: use hashed version here. compare from bcryptojs

    if (emailIsValid && passwordIsValid) {
      return {
        success: true,
        message: 'User is verified!',
        user: { id: emailIsValid.id, name: emailIsValid.name, email: emailIsValid.email }
      }
    } else {
      return { success: false, message: 'Credentials are wrong, user is not verified.' }
    }
  }

}

export default usersData;