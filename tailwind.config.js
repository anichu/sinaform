/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/forms")],
	styles: {
		modal:
			"bg-white rounded-lg p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64",
		overlay:
			"bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none",
		".ReactModal__Overlay--after-open": "opacity-100 pointer-events-auto",
		".ReactModal__Overlay--before-close": "opacity-0 pointer-events-none",
	},
};
