import {  Center, Heading, Image, ScrollView, Text, VStack } from 'native-base';
import React from 'react';
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import Input from '@components/Input';
import Button from '@components/Button';
import { useNavigation } from '@react-navigation/native';

// import { Container } from './styles';

const SignUp: React.FC = () => {

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
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

          <Input placeholder='Nome' />
          <Input placeholder='Email' keyboardType='email-address' autoCapitalize='none' />
          <Input placeholder='Senha' secureTextEntry />

          <Button title="Criar e acessar" />
        </Center>
        
        <Button title="Voltar para o login" variant="outline" mt={24} onPress={handleGoBack} />

        

      </VStack>
    </ScrollView>
  )
}

export default SignUp;