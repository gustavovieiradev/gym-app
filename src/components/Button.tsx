import {Button as ButtonNativeBase, IButtonProps, Text} from 'native-base'

type Props = IButtonProps & {
  title: string;
  variant?: 'solid' | 'outline'
}

const Button: React.FC<Props> = ({title, variant = 'solid', ...rest}) => {
  return (
    <ButtonNativeBase 
      w="full"
      h={14}
      bg={variant === 'outline' ? "transparent" :"green.700"}
      rounded="sm"
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor="green.500"
      _pressed={{
        bg: variant === 'outline' ? 'gray.500' : 'green.500'
      }}
      {...rest}
    >
      <Text
        color={variant === 'outline' ? "green.500" : "white"}
        fontFamily="heading"
        fontSize="md"
      >
        {title}
      </Text>
    </ButtonNativeBase>
  )
}

export default Button;