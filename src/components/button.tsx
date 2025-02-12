'use client';

import { ReactNode } from "react";

import styles from "./button.module.css";

export default function ButtonLink({}:{}) {
  
}




// export default function Button({
//   variant,
//   to,
//   children,
//   className = "",
//   onHover,
// }: {
//   variant: "filled" | "transparent";
//   to: string;
//   children: ReactNode;
//   className?: string;
//   onHover?: () => {}
// }) {

//   function handleButton(to: string) {
//     window.location.href = to;
//   }

//   return (
//     <button
//       className={`${className} ${styles.button} ${
//         variant === "transparent"
//           ? styles.button__transparent
//           : styles.button__bordered
//       }`}
//       onClick={() => handleButton(to)}
//       onMouseEnter={onHover}
//     >
//       {children}
//     </button>
//   );
// }
