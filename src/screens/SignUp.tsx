import {  Center, Heading, Image, ScrollView, Text, useToast, VStack } from 'native-base';
import React, { useState } from 'react';
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import Input from '@components/Input';
import Button from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { api } from '@services/api';
import axios from 'axios';
import { AppError } from '@utils/AppError';
import { useAuth } from '@hooks/useAuth';

// import { Container } from './styles';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos'), 
  password_confirm: yup.string().required('Confirme a senha').oneOf([yup.ref('password'), null], 'A confirmação de senha não confere')
})

const SignUp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const toast = useToast();

  function handleGoBack() {
    navigation.goBack();
  }

  const {control, handleSubmit, formState: {errors}} = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  })

  async function handleSignUp({email, name, password}: FormDataProps) {
    try {
      setIsLoading(true);
      await api.post('/users', {name, email, password})
      await signIn(email, password);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente.';
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }

  }

  return (
    <ScrollView 
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10}>
        <Image 
          source={BackgroundImg} 
          defaultSource={BackgroundImg} 
          alt="Pessoas treinando" 
          resizeMode='contain' 
          position="absolute" 
        />

        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Crie sua conta
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>

          <Controller 
            control={control}
            name="name"
            render={({field: {onChange, value}}) => (
              <Input 
                placeholder='Nome' 
                onChangeText={onChange} 
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="email"
            render={({field: {onChange, value}}) => (
              <Input 
                placeholder='Email' 
                keyboardType='email-address' 
                autoCapitalize='none' 
                onChangeText={onChange} 
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="password"
            render={({field: {onChange, value}}) => (
              <Input placeholder='Senha' secureTextEntry onChangeText={onChange} value={value} errorMessage={errors.password?.message}/>
            )}
          />

          <Controller 
            control={control}
            name="password_confirm"
            render={({field: {onChange, value}}) => (
              <Input 
                placeholder='Confirmar a senha' 
                secureTextEntry onChangeText={onChange} value={value} onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button 
            title="Criar e acessar" 
            onPress={handleSubmit(handleSignUp)} 
            isLoading={isLoading} 
          />
        </Center>
      
        <Button title="Voltar para o login" variant="outline" mt={8} onPress={handleGoBack} />
      </VStack>
    </ScrollView>
  )
}

export default SignUp;