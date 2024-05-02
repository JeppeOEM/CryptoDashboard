import { HStack,Image } from "@chakra-ui/react"
import logo from "../assets/react.svg"
import ColorModeSwitch from "./ColorModeSwitch"
import Login from "./Login/Login"



const NavBar = () => {
    return (
        <>
        <HStack justifyContent="space-between">
            <Image src={logo} boxSize="60px"></Image>
            <ColorModeSwitch/>
            <Login></Login>
        </HStack>
        </>
    )
}

export default NavBar;