export const RightArrow = (isHovered: boolean) => {
	const fill = isHovered ? 'white' : "#7B7C88"
	return (
		<svg width="16.000000" height="16.000000" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<clipPath id="clip69_410">
			<rect id="chevron-left" width="16.000000" height="16.000000" transform="matrix(-1 0 0 1 16 0)" fill="white" fill-opacity="0"/>
		</clipPath>
	</defs>
	<rect id="chevron-left" width="16.000000" height="16.000000" transform="matrix(-1 0 0 1 16 0)" fill="#FFFFFF" fill-opacity="0"/>
	<g clip-path="url(#clip69_410)">
		<path id="Vector" d="M8.63 8L5.33 4.7L6.27 3.75L10.51 8L6.27 12.24L5.33 11.3L8.63 8Z" fill={fill} fill-opacity="1.000000" fill-rule="nonzero"/>
	</g>
</svg>
	)
}
