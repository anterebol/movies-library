import { TextProps } from "@/types/textProps";
import { createElement } from "react";

export const Title: React.FC<TextProps> = (props) => {
	const { title, className, tag,} = props;
	return createElement(tag, { className: className }, title); 
};