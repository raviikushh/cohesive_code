import {nextui} from '@nextui-org/react'
import { orange,emerald } from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({defaultTheme:'dark',themes:{
    dark:{
      colors:{
        primary:{
          ...orange,
          DEFAULT:orange["600"],
        },
        secondary:{
          ...emerald,
          DEFAULT:emerald["600"],
        }
      }
    }
  }},)],
}

