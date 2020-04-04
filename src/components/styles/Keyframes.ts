import { keyframes } from 'styled-components';

export const zoomIn = keyframes`
0% {
    transform: scale(0.3);
  }
  100% {
    transform: rotate(1);
  }
`;

export const slideInLeft = keyframes`
  from {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
`;

export const slideOutLeft = keyframes`
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
`;

export const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const spin = keyframes`
  from,15% { -webkit-transform: rotateY(0deg);    }
  20%,35%  { -webkit-transform: rotateY(-72deg);  }
  40%,55%  { -webkit-transform: rotateY(-144deg); }
  60%,75%  { -webkit-transform: rotateY(-216deg); }
  80%,95%  { -webkit-transform: rotateY(-288deg); }
  to       { -webkit-transform: rotateY(-360deg); }
`;

export const load = keyframes`
  0% {
    opacity: 1;
  }

  10% {
    opacity: 0.85;
  }

  20% {
    opacity: 0.70;
  }

  30% {
    opacity: 0.55;
  }

  40% {
    opacity: 0.40;
  }

  50% {
    opacity: 0.25;
  }

  60% {
    opacity: 0.40;
  }

  70% {
    opacity: 0.55;
  }

  80% {
    opacity: 0.70;
  }

  90% {
    opacity: 0.85;
  }

  100% {
    opacity: 1;
  }
`;
