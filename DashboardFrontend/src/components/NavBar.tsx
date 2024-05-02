import { HStack,Image } from "@chakra-ui/react"
import logo from "../assets/react.svg"
import ColorModeSwitch from "./ColorModeSwitch"
import LoginButton from "./LoginButton"



const NavBar = () => {
    return (
        <>
        <HStack justifyContent="space-between">
            <Image src={logo} boxSize="60px"></Image>
            <ColorModeSwitch/>
            <LoginButton></LoginButton>
        </HStack>
        </>
    )
}

export default NavBar;