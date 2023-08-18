import React from "react";

//! Move all cursors to a HOC that will take props to change CSS and settings
function Cursor() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 200 200"
      id="cursor-1"
      style={{ "position": "absolute", "zIndex": "0" }}
    >
      <g filter="url(#filter0_d_7_38)">
        <path
          fill="#00F"
          d="M170.368 136.814l-.034-.077-48.535-104.084c-2.518-5.4-5.53-10.31-9.329-13.87-3.991-3.74-9.724-6.685-16.576-5.528-6.255 1.056-10.725 5.125-13.67 8.82-3.046 3.824-5.595 8.651-7.784 13.915L28.993 140.788l-.021.049c-3.343 7.806-1.994 16.854.776 23.285 2.525 5.861 9.037 15.379 20.625 14.914 4.563-.183 9.314-2.172 12.48-3.554 1.843-.805 3.812-1.721 5.745-2.621l.048-.022a367.37 367.37 0 016.1-2.793c8.572-3.802 17.233-6.86 25.473-6.963 8.186-.103 16.787 2.771 25.441 6.412 1.557.655 3.356 1.442 5.167 2.234 2.487 1.088 4.999 2.188 6.949 2.973 3.305 1.332 8.231 3.196 13.021 3.136 6.237-.078 10.973-3.223 14.038-6.616 2.973-3.292 4.856-7.267 6.009-10.898 2.169-6.827 2.845-16.111-.476-23.51z"
        ></path>
      </g>
      <path
        fill="#8000ff"
        d="M111.3 37.548c-8.94-19.172-18.27-16.142-26.198 2.968L39.62 145.397c-3.409 7.961 2.024 22.396 10.29 22.065 8.265-.332 28.718-15.693 50.165-15.962 21.447-.269 41.903 14.864 50.578 14.755 8.675-.108 12.681-16.825 9.148-24.7L111.3 37.548z"
      ></path>
      <defs>
        <filter
          id="filter0_d_7_38"
          width="155.665"
          height="176.053"
          x="22"
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
            result="effect1_dropShadow_7_38"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_7_38"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export default Cursor;