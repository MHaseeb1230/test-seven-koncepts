import { PluginCreator } from "postcss";
import type { Config } from "tailwindcss";

// @ts-ignore
const plugin: PluginCreator<any> = ({ addUtilities, addVariant }) => {
  addUtilities({
    ".container-max": {
      maxWidth: 1920,
      margin: "auto",
    },
    ".flex-centered": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    ".centered-xy": {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  });
  addVariant("path-fill", [
    "&>g>g>line",
    "&>path",
    "&>g>g>path",
    "&>g>g>rect",
    "&>g>path",
    "&>g>line",
  ]);
};

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]},
      colors: {
        primary: 'var(--color-primary)',
        'btn-dark-primary': 'var(--btn-dark-primary)',
        // 'btn-pink': 'var(--btn-pink)',
        // 'btn-dark-pink': 'var(--btn-dark-pink)',
        'bg-primary': 'var(--bg-primary)',

        bordercolor: 'rgba(255, 255, 255, 0.08)',
        backgroundcolor: 'rgba(255, 255, 255, 0.04)',
      },
      borderColor: {
        'custom-gray': '#D9D9D9', 
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        '0.25': '1px',
        88: '22rem',
      },
      borderWidth: {
        '3': '3px',
      },
      // fontFamily: {
      //   primary: "var(--font-poppins)",
      // },
      fontSize: {
        // 10px
        xxs: '0.625rem',
        // 12px
        xs: '0.75rem',
        // 14px
        sm: '0.875rem',
        // 16px
        base: '1rem',
        // 18px
        lg: '1.125rem',
        // 20px
        xl: '1.25rem',
        // 27px
        '2xl': '1.688rem',
        // 32px
        '3xl': '2rem',
        // 36px
        '3.5xl' : '2.25rem',
        //40px
        '4xl': '2.5rem',
        //49px
        '5xl': '3.063rem',

        '6xl': '3.75rem',
        // 60px
        '7xl': '4.75rem',
        // 92px
        '10xl': '5.75rem',
      },
      screens: {
        xxm:"320px",
        xs: '375px',
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
        '3xl': '1580px',
        '4xl': '1920px',
      },
    },
    animation: {
      'fade-in': 'fade-in 0.5s ease-out',
      'fade-up': 'fade-up 0.5s ease-out',
      spin: 'spin 1s linear infinite',
    },
    keyframes: {
      'fade-in': {
        '0%': {
          opacity: '0',
        },
        '100%': {
          opacity: '1',
        },
      },
      'fade-up': {
        '0%': {
          opacity: '0',
          transform: 'translateY(40px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },

      spin: {
        '0%': {
          transform: 'rotate(0deg)',
        },
        '100%': {
          transform: 'rotate(360deg)',
        },
      },
    },
  },
  plugins: [plugin],
};
export default config;
