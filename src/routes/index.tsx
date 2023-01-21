import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box, useTheme } from "native-base";
import AuthRoutes from "./auth.routes";

const Routes: React.FC = () => {
  const { colors } = useTheme()

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700]

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}

export default Routes;