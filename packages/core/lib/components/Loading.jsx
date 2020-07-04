import Skawe from 'meteor/skawe:lib';
import React from 'react';

const siteTitle = Skawe.settings.get('title');
const logoUrl = Skawe.settings.get('logoUrl');

const Loading = props => {
  return (
    <div className="loader">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        
        width="150px" height="150px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#28a745"
          strokeWidth="1"
          r="35"
          strokeDasharray="164.93361431346415 56.97787143782138"
          transform="rotate(263.144 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"></animateTransform>
        </circle>
      </svg>
    </div>
  );
};

Skawe.registerComponent('Loading', Loading);
