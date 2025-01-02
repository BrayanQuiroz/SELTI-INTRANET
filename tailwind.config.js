/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./src/**/*.{js,jsx,ts,tsx}",
   ],
   theme: {
      extend: {
         colors:{
            redMain: '#DC2626',
            blueFile: '#1f618d',
         }
      },
   },
   plugins: [],
}