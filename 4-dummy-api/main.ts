import axios from "axios";
async function getUsersArray(): Promise<User[]> {
  try {
    const response = await axios.get<UserResponse>(
      "https://dummyjson.com/users"
    );
    const dataUsers: User[] = response.data.users;
    return dataUsers;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(`Неизвестная ошибка: ${error}`);
    }
    return [];
  }
}

async function outputUsers() {
  const usersArray = await getUsersArray();
  usersArray.forEach((user) => {
    console.log(
      `Имя: ${user.firstName}, Пол: ${user.gender}, Email: ${user.email}, Группа крови: ${user.bloodGroup}`
    );
  });
}

interface UserResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: Gender;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: BloodGroup;
  height: number;
  weight: number;
  eyeColor: EyeColor;
  hair: UsersHair;
  ip: string;
  address: UsersAddress;
  macAddress: string;
  university: string;
  bank: UsersBank;
  company: UsersCompnay;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: UsersCrypto;
  role: UsersRole;
}

enum Gender {
  male = "male",
  female = "female",
}

enum BloodGroup {
  A_POSITIVE = "A+",
  A_NEGATIVE = "A-",
  B_POSITIVE = "B+",
  B_NEGATIVE = "B-",
  AB_POSITIVE = "AB+",
  AB_NEGATIVE = "AB-",
  O_POSITIVE = "O+",
  O_NEGATIVE = "O-",
}

enum EyeColor {
  Brown = "Brown",
  Amber = "Amber",
  Blue = "Blue",
  Red = "Red",
  Green = "Green",
  Violet = "Violet",
  Hazel = "Hazel",
}

type UsersHair = {
  color: HairColor;
  type: HairType;
};

enum HairType {
  Straight = "Straight",
  Wavy = "Wavy",
  Curly = "Curly",
  Kinky = "Kinky",
}

enum HairColor {
  Brown = "Brown",
  White = "White",
  Blonde = "Blonde",
  Purple = "Purple",
  Red = "Red",
  Green = "Green",
}

type UsersAddress = {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
};

type UsersBank = {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
};

type UsersCompnay = {
  department: string;
  name: string;
  title: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
  };
};

type UsersCrypto = {
  coin: string;
  wallet: string;
  network: string;
};

enum UsersRole {
  admin = "admin",
  moderator = "moderator",
  user = "user",
}

outputUsers();
