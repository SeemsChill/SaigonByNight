import React from "react";
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input
} from "@chakra-ui/react";

const FormComponent = (props) => {
	
	return(
		<FormControl id={props.title} isInvalid={props.error} mt={4}>
			<FormLabel mt={4}>{props.title}:</FormLabel>
			<Input w="90%" transition="all 400ms ease-in-out" _hover={{transform: "scale(1.1)"}} placeholder=`君の${props.title}.` {...props}/>
			<FormErrorMessage>
				{error && error.message}
			</FormErrorMessage>
		</FormControl>
	);
};

export default FormComponent;
