import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaStep2 = Yup.object().shape({
  nome: Yup.string().required("Campo obrigatório"),
  sobrenome: Yup.string().required("Campo obrigatório"),
  telefone: Yup.string().required("Campo obrigatório"),
  email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
  senha: Yup.string().required("Campo obrigatório"),
});

type Step2Props = {
  onBack: () => void;
  onSubmit: () => void;
  handleClose: () => void;
  formSteps: FormValues;
  setFormSteps: React.Dispatch<React.SetStateAction<FormValues>>;
};

export function Step2({
  onBack,
  onSubmit,
  handleClose,
  formSteps,
  setFormSteps,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schemaStep2),
    defaultValues: {
      nome: formSteps.nome || "",
      sobrenome: formSteps.sobrenome || "",
      telefone: formSteps.telefone || "",
      email: formSteps.email || "",
      senha: formSteps.senha || "",
    },
  });

  const _onSubmit = (data) => {
    setFormSteps({ ...formSteps, ...data });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Nome"
            fullWidth
            {...register("nome", { required: true })}
            error={!!errors.nome}
            helperText={errors.nome && errors.nome.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Sobrenome"
            fullWidth
            {...register("sobrenome", { required: true })}
            error={!!errors.sobrenome}
            helperText={errors.sobrenome && errors.sobrenome.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Telefone"
            fullWidth
            {...register("telefone", { required: true })}
            error={!!errors.telefone}
            helperText={errors.telefone && errors.telefone.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="E-mail"
            fullWidth
            {...register("email", { required: true })}
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Senha"
            type="password"
            fullWidth
            {...register("senha", { required: true })}
            error={!!errors.senha}
            helperText={errors.senha && errors.senha.message}
          />
        </Grid>
      </Grid>
      <Box marginTop={2} textAlign="right">
        <Button
          style={{ marginRight: 8 }}
          onClick={() => {
            console.log(watch());
            setFormSteps({ ...formSteps, ...watch() });
            onBack();
          }}
        >
          Voltar
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Enviar
        </Button>
      </Box>
    </form>
  );
}
