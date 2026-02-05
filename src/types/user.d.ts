interface PersonalInfo {
  fullName: string;
  // dateOfBirth: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: "male" | "female" | "other";
}

interface User {
  fullName: string;
  role: string;
  profileImage: string;
  email: string;
  accountStatus: string;
}
