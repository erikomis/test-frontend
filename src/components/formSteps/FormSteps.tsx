import { useState } from "react";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";

type FormStepsProps = {
  handleClose: () => void;
};

type FormValues = {
  cnpj: string;
  nomeFantasia: string;
  razaoSocial: string;
  cep: string;
  endereco: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  nome: string;
  sobrenome: string;
  telefone: string;
  email: string;
  senha: string;
};

export function FormSteps({ handleClose }: FormStepsProps) {
  const [step, setStep] = useState(1);

  const [formSteps, setFormSteps] = useState<FormValues>({} as FormValues);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleComplete = () => {
    
  };
  return (
    <>
      {step === 1 && (
        <Step1
          onNext={handleNext}
          formSteps={formSteps}
          setFormSteps={setFormSteps}
          handleClose={handleClose}
        />
      )}
      {step === 2 && (
        <Step2
          formSteps={formSteps}
          setFormSteps={setFormSteps}
          onBack={handleBack}
          onSubmit={handleComplete}
          handleClose={handleClose}
        />
      )}
    </>
  );
}
