export const LeftArrow = (isHovered: boolean) => {
	const fill = isHovered ? 'white' :"#7B7C88"
	return (
		<svg width="16.000000" height="16.000000" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<clipPath id="clip69_401">
			<rect id="chevron-left" width="16.000000" height="16.000000" fill="white" fill-opacity="0"/>
		</clipPath>
	</defs>
	<rect id="chevron-left" width="16.000000" height="16.000000" fill={fill} fill-opacity="0"/>
	<g clip-path="url(#clip69_401)">
		<path id="Vector" d="M7.36 8L10.66 4.7L9.72 3.75L5.48 8L9.72 12.24L10.66 11.3L7.36 8Z" fill={fill} fill-opacity="1.000000" fill-rule="nonzero"/>
	</g>
</svg>
	)
}
