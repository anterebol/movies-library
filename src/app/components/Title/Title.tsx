import { createElement } from "react";

interface TextProps {
	title: string | boolean;
	className: string;
	tag: string;
}

export const Title: React.FC<TextProps> = (props) => {
	const { title, className, tag,} = props;
	return createElement(tag, { className: className }, title,) 
};