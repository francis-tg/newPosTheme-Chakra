import {
  Box,
  Button,
  Input,
  Stack,
  Heading,
  useColorModeValue,
  FormControl,
  FormLabel,
  InputGroup,
  IconButton,
  InputRightElement,
  Text,
  useToast
} from "@chakra-ui/react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {useState} from "react";
import {API_URL} from "../api/common";
import {useNavigate} from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const textColor = useColorModeValue("black", "black");
  const borderColor = useColorModeValue("gray.300", "gray.300");
  const btnColor = useColorModeValue("orange", "orange.600");
  const [isLoading, setLoadingState] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(false);
  const toast = useToast({variant: "subtle"});
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  function onChange(e) {
    setLoginData(prevData => ({
      ...prevData,
      [e.target.id]: e.target.value
    }));
  }
  async function onSubmit() {
    setLoadingState(true);
    if (
      Object.keys(loginData).filter(k => loginData[k].length === 0).length !== 0
    ) {
      setLoadingState(false);
      return toast({
        title: "Attention !",
        description: "Les champs sont vides...",
        status: "warning"
      });
    }
    fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    }).then(async r => {
      if (r.ok) setPageLoading(true);
      if (r.status === 401) {
        setPageLoading(false);
        toast({title: "Erreur", description: await r.text()});
      }
      if (r.status === 200) {
        setLoadingState(false);
        sessionStorage.setItem("token", await r.json());
        return navigate("/");
      }
    });
  }
  return pageLoading
    ? <LoadingPage />
    : <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        backgroundImage="url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80')"
        backgroundSize="cover"
      >
        <Box
          bg="white"
          px={8}
          py={10}
          width={{base: "90%", sm: "450px"}}
          borderWidth={1}
          borderRadius="md"
          boxShadow="lg"
        >
          <Stack spacing={4}>
            <Heading textAlign="center" mb={2} color={textColor}>
              PLACE DE LA VICTOIRE
            </Heading>
            <Text textAlign="center" mb={6} color={textColor} fontSize="lg">
              Heureux de vous voir!
            </Text>
            <FormControl>
              <FormLabel htmlFor="username" color={textColor}>
                Nom d'utilisateur
              </FormLabel>
              <Input
                type="text"
                color={textColor}
                borderColor={borderColor}
                id="username"
                value={loginData.username}
                _hover={{borderColor: borderColor}}
                onChange={onChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="username" color={textColor}>
                Mot de passe
              </FormLabel>
              <InputGroup>
                <Input
                  color={textColor}
                  type={showPassword ? "text" : "password"}
                  borderColor={borderColor}
                  _hover={{borderColor: borderColor}}
                  value={loginData.password}
                  id="password"
                  onChange={onChange}
                />
                <InputRightElement width="3rem">
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    color={textColor}
                    onClick={handleShowPassword}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              isLoading={isLoading}
              bg={btnColor}
              _hover={{bg: btnColor}}
              size="lg"
              fontSize="md"
              width="full"
              onClick={onSubmit}
            >
              Connectez-vous
            </Button>
          </Stack>
        </Box>
      </Box>;
}

export default LoginPage;
