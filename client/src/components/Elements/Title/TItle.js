import React from "react";
import "./Title.css";

export const Title = () => (
  <div className="money-title-container">
    <div className="svg-container">
      <svg viewBox="0 0 140 25">
        <defs>
          <linearGradient id="sucka" x1="0" y1="0" x2="100%" y2="0" gradientUnits="userSpaceOnUse" >
            <stop stopColor="#005204" offset="10%" />
            <stop stopColor="#5eff00" offset="30%" />
            <stop stopColor="#005204" offset="50%" />
            <stop stopColor="#5eff00" offset="70%" />
            <stop stopColor="#005204" offset="90%" />
          </linearGradient>
        </defs>
        <text fill="url(#sucka)">
          <tspan fontSize="17" x="6" dy="18" stroke="#ffd000" strokeWidth=".2">Mind</tspan>
          <tspan fontSize="17" x="68" dy="0" stroke="#ffd000" strokeWidth=".2">Money</tspan>
          <tspan fontSize="8" x="50" dy="-3" stroke="#ffd000" strokeWidth=".2" fill="#ff0055">Over</tspan>
        </text>
      </svg>
    </div>
  </div>
);