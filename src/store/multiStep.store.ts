// useMultiStepFormStore.ts
import create from "zustand";

interface MultiStepFormState {
  currentStep: number;
  formData: { [key: string]: any }; // Replace 'any' with a more specific type as needed
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (newData: { [key: string]: any }) => void; // Replace 'any' with a more specific type as needed
}

const useMultiStepFormStore = create<MultiStepFormState>((set) => ({
  currentStep: 0,
  formData: {},
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  updateFormData: (newData) =>
    set((state) => ({ formData: { ...state.formData, ...newData } })),
}));

export default useMultiStepFormStore;
