// "use client";
// import { bounceAnimation, staggeredAnimation } from "@/lib/utils";
// import { motion, useInView } from "framer-motion";

// import { useRef } from "react";

// const stats = [
//   { id: 1, name: "Years of Experience", value: "4+" },
//   { id: 2, name: "Proficient Frameworks", value: "20+" },
//   { id: 3, name: "Applications Deployed", value: "20+" },
//   { id: 4, name: "Featured Projects", value: "10+" },
// ];

// export default function Stats() {
//   const ref = useRef(null);
//   const isInView = useInView(ref);
//   return (
//     <div className="w-full border-t">
//       <motion.dl
//         initial="initial"
//         ref={ref}
//         animate={isInView ? "animate" : "initial"}
//         variants={staggeredAnimation}
//         className="grid grid-cols-2 gap-0.5 divide-y divide-border rounded-2xl text-center lg:grid-cols-4 lg:divide-x lg:divide-y-0"
//       >
//         {stats.map((stat) => (
//           <motion.div variants={bounceAnimation} key={stat.id} className="flex flex-col p-8">
//             <dt className=" z-10 text-sm leading-6 lg:text-lg">{stat.name}</dt>
//             <dd className="font-incognito z-10 order-first text-6xl font-semibold lg:text-8xl">
//               {stat.value}
//             </dd>
//           </motion.div>
//         ))}
//       </motion.dl>
//     </div>
//   );
// }
