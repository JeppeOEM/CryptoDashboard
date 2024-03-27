import { HStack, Switch, useColorMode } from "@chakra-ui/react"


// Color mode switch changes dark/light mode
const ColorModeSwitch = () => {
    const {colorMode, toggleColorMode} = useColorMode(); // useColorMode from chakra

    return(
        <div>

        <HStack>
            <Switch
            colorScheme="green"
            isChecked={colorMode === "dark"}
            onChange={toggleColorMode}
            ></Switch>
        <p className="text-green-500">lol</p>

        </HStack>
            </div>
    )
}

export default ColorModeSwitch;