import {  Center, Heading, Image, ScrollView, Text, useToast, VStack } from 'native-base';
import React, { useState } from 'react';
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import Input from '@components/Input';
import Button from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '@hooks/useAuth';
import { AppError } from '@utils/AppError';

type FormData = {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast()

  const { signIn } = useAuth();

  const { control, handleSubmit, formState: {errors} } = useForm<FormData>();

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  async function handleSignin({email, password}: FormData) {
    try {
      setIsLoading(true)
      await signIn(email, password);
      setIsLoading(false);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde';
      setIsLoading(false);
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
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>

          <Controller 
            control={control}
            name="email"
            rules={({required: 'Informe o e-mail'})}
            render={({ field: { onChange } }) => (
              <Input 
                placeholder='Email' 
                keyboardType='email-address' 
                autoCapitalize='none' 
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="password"
            rules={({required: 'Informe a senha'})}
            render={({ field: { onChange } }) => (
              <Input 
                placeholder='Senha' 
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button 
            title="Acessar"
            onPress={handleSubmit(handleSignin)}
            isLoading={isLoading}
          />
        </Center>
        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>
          <Button title="Criar conta" variant="outline" onPress={handleNewAccount} />

        </Center>

      </VStack>
    </ScrollView>
  )
}

export default SignIn;