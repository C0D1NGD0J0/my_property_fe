import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "@app/(auth)/signup/page";
import { NotificationProvider } from "@hooks/notification";
import { mockPlansData } from "../shared/shared";

const Wrapper = () => {
  return (
    <NotificationProvider>
      <Signup />
    </NotificationProvider>
  );
};

// Mock the modules
jest.mock("@services/auth", () => ({
  ...jest.requireActual("@services/auth"),
  getUserPlans: jest.fn(() =>
    Promise.resolve({ plans: [{ id: "individual", name: "Individual Plan" }] }),
  ),
  signup: jest.fn(() => Promise.resolve({ success: true })),
}));

// Mock the authValidation and its methods
jest.mock("@validations/auth.validation", () => ({
  signup: jest.fn(() => Promise.resolve({ isValid: true })),
}));

// Mock SWR
jest.mock("swr", () =>
  jest.fn(() => ({ data: mockPlansData, error: undefined, isLoading: false })),
);

describe("User Signup Component", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders signup page", () => {
    render(Wrapper());
    const el = screen.getByText("Sign Up");
    expect(el).toBeInTheDocument();
  });

  it("renders plan selection component", async () => {
    render(Wrapper());
    const planName = screen.getByText(mockPlansData.plans[0].name);
    expect(planName).toBeInTheDocument();
  });

  it("renders userinfo form component", async () => {
    // Render the Signup component
    render(Wrapper());
    // Simulate selecting a plan
    const selectPlanBtn = await screen.findAllByText("Select");
    await userEvent.click(selectPlanBtn[0]);

    await waitFor(async () => {
      const nextButton = screen.getByText(/next/i);
      expect(nextButton).toBeEnabled();
      await userEvent.click(nextButton);
    });

    const inputFields = screen.getAllByRole("textbox");
    expect(inputFields.length).toBeGreaterThan(3);
  });
});
