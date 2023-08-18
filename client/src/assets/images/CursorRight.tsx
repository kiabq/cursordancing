import React from "react";

//! Move all cursors to a HOC that will take props to change CSS and settings
function CursorRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 200 200"
      //! for all that is holy, please change this, ^ see above
      style={{ 'height': '1rem', 'marginTop': '6px' }}
    >
      <g filter="url(#filter0_d_7_19)">
        <path
          fill="#00F"
          d="M169.999 157.123l.001-.084V42.195c0-5.957-.654-11.68-2.593-16.512-2.037-5.076-5.988-10.169-12.687-12.016-6.115-1.687-11.886.113-16.116 2.217-4.377 2.177-8.727 5.476-12.936 9.32l-85.479 75.774-.04.035c-6.328 5.662-8.93 14.432-9.137 21.431-.189 6.38 1.691 17.757 12.39 22.234 4.212 1.762 9.36 1.967 12.813 2.053 2.01.049 4.182.051 6.314.053h.053c2.197.001 4.415.003 6.708.046 9.376.177 18.518 1.066 26.03 4.455 7.462 3.366 14.043 9.606 20.348 16.563a414.424 414.424 0 013.738 4.209c1.794 2.037 3.606 4.095 5.042 5.631 2.433 2.604 6.108 6.375 10.476 8.345 5.685 2.565 11.306 1.716 15.518-.064 4.086-1.727 7.473-4.534 10.052-7.337 4.851-5.271 9.387-13.399 9.505-21.509z"
        ></path>
      </g>
      <path
        fill="#0F0"
        d="M158.417 42.195c0-21.154-9.737-22.35-24.998-8.382l-85.546 75.833c-6.455 5.774-7.63 21.153 0 24.346 7.63 3.193 32.66-2.086 52.211 6.734 19.551 8.821 31.695 31.18 39.603 34.748 7.908 3.568 18.604-9.889 18.73-18.519V42.195z"
      ></path>
      <defs>
        <filter
          id="filter0_d_7_19"
          width="149"
          height="184.648"
          x="26"
          y="12"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2.5"></feGaussianBlur>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_7_19"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_7_19"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export default CursorRight;
