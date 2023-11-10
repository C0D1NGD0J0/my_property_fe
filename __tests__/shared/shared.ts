export const mockUserSignup = {
  email: "johndoe@example.com",
  firstName: "John",
  lastName: "Doe",
  location: "Anytown, USA",
  phoneNumber: "123-456-7890",
  password: "password123",
  cpassword: "password123",
  companyName: "Doe Industries",
  accountType: {
    name: "individual",
    id: "1234",
    isEnterpriseAccount: false,
  },
};

export const mockPlansData = {
  plans: [
    {
      id: 1,
      name: "Plan 1",
      amount: "$10.00",
      currency: "USD",
      recurring: "yes",
      features: [],
    },
    {
      id: 2,
      name: "Plan 2",
      amount: "$20.00",
      currency: "USD",
      recurring: "yes",
      features: [],
    },
  ],
};
