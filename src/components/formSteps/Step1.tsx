import { TextField, Grid, Box, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";

type FormValuesform1 = {
  cnpj: string;
  nomeFantasia: string;
  razaoSocial: string;
  cep: string;
  endereco: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  numero: string;
};

const schemaStep = Yup.object().shape({
  cnpj: Yup.string()
    .required("Campo obrigatório")
    .test({
      name: "testCnpj",
      message: "Cnpj inválido",
      test: (value: string) =>
        value.match(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/),
    }),
  nomeFantasia: Yup.string().required("Campo obrigatório"),
  razaoSocial: Yup.string().required("Campo obrigatório"),
  cep: Yup.string()
    .required("Campo obrigatório")
    .test({
      name: "testCep",
      message: "Cep Invalido",
      test: (value: string) => value.match(/^\d{5}-\d{3}$/),
    }),
  endereco: Yup.string().required("Campo obrigatório"),
  complemento: Yup.string(),
  bairro: Yup.string().required("Campo obrigatório"),
  cidade: Yup.string().required("Campo obrigatório"),
  uf: Yup.string().required("Campo obrigatório"),
  numero: Yup.string().required("Campo obrigatório"),
});

type Step1Props = {
  onNext: () => void;
  handleClose: () => void;
  formSteps: FormValues;
  setFormSteps: React.Dispatch<React.SetStateAction<FormValues>>;
};

export function Step1({
  onNext,
  handleClose,
  formSteps,
  setFormSteps,
}: Step1Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(schemaStep),
    defaultValues: {
      cnpj: formSteps?.cnpj || "",
      nomeFantasia: formSteps?.nomeFantasia || "",
      razaoSocial: formSteps?.razaoSocial || "",
      cep: formSteps?.cep || "",
      endereco: formSteps?.endereco || "",
      complemento: formSteps?.complemento || "",
      bairro: formSteps?.bairro || "",
      cidade: formSteps?.cidade || "",
      uf: formSteps?.uf || "",
      numero: formSteps?.numero || "",
    },
  });

  useEffect(() => {
    const cep = watch("cep");
  
    if (cep.length >= 8) {
      const fecthCep = async () => {
        const respone = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        if (respone?.data?.cep) {
          const { uf, logradouro, localidade, bairro, completo } =
            respone.data;
          setValue("uf", uf);

          setValue("cidade", localidade);
          setValue("bairro", bairro);

          setValue("endereco", logradouro);

          setValue("complemento", completo);
        }
      };
      fecthCep();
    }
  }, [watch("cep")]);

  const onSubmit = (data: FormValuesform1) => {
    setFormSteps(data);
    onNext();
  };

  function formatedCnpj(value: string) {
    if (!value) return;
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }

  function formatedCep(value: string) {
    if (!value) return;

    return value
      ?.replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {/*<InputMask mask={"99.999.999/9999-99"}  {...register("cnpj", { required: true })}>*/}
          {/*    {() => (*/}

          <TextField
            label="CNPJ"
            fullWidth
            error={!!errors.cnpj}
            helperText={errors.cnpj && errors.cnpj.message}
            value={formatedCnpj(watch("cnpj"))}
            onChange={(event) => {
              setValue("cnpj", event.target.value);
            }}
          />
          {/*    />*/}
          {/*)}*/}
          {/*</InputMask>*/}
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Nome fantasia"
            fullWidth
            {...register("nomeFantasia", { required: true })}
            error={!!errors.nomeFantasia}
            helperText={errors.nomeFantasia && errors.nomeFantasia.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Razão social"
            fullWidth
            {...register("razaoSocial", { required: true })}
            error={!!errors.razaoSocial}
            helperText={errors.razaoSocial && "Campo obrigatório"}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            {...register("cep", { required: true })}
            label="CEP"
            fullWidth
            error={!!errors.cep}
            helperText={errors.cep && errors.cep.message}
            value={formatedCep(watch("cep"))}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Endereço"
            fullWidth
            {...register("endereco", { required: true })}
            error={!!errors.endereco}
            helperText={errors.endereco && "Campo obrigatório"}
            InputLabelProps={{
              shrink: !!watch("endereco"),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Numero"
            fullWidth
            {...register("numero", { required: true })}
            error={!!errors.endereco}
            helperText={errors.numero &&  errors.numero.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Complemento"
            fullWidth
            {...register("complemento")}
            InputLabelProps={{
              shrink: !!watch("complemento"),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Bairro"
            fullWidth
            {...register("bairro", { required: true })}
            error={!!errors.bairro}
            helperText={errors.bairro && errors.bairro.message}
            InputLabelProps={{
              shrink: !!watch("bairro"),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Cidade"
            fullWidth
            {...register("cidade", { required: true })}
            error={!!errors.cidade}
            helperText={errors.cidade && errors.cidade.message}
            InputLabelProps={{
              shrink: !!watch("cidade"),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="UF"
            fullWidth
            {...register("uf", { required: true })}
            error={!!errors.uf}
            helperText={errors.uf && errors.uf.message}
            InputLabelProps={{
              shrink: !!watch("uf"),
            }}
          />
        </Grid>
      </Grid>

      <Box marginTop={2} textAlign="right">
        <Button onClick={handleClose}>Fechar </Button>{" "}
        <Button variant="contained" color="primary" type="submit">
          Próximo
        </Button>
      </Box>
    </form>
  );
}
