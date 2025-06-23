const SkillsObjects = [
  {
    Header: "Frontend",
    Description:
      "I am passionate about crafting intuitive and visually appealing user interfaces. From responsive design to interactive features, I focus on creating seamless, user-friendly experiences that bring designs to life on the web.",
    Skills: [
      { Icon: "TS", Name: "TypeScript" },
      { Icon: "JS", Name: "JavaScript(ES6+)" },
      { Icon: "ViteTest", Name: "ViteTest" },
      { Icon: "React", Name: "React" },
      { Icon: "Next", Name: "Next.js" },
      { Icon: "GitHub", Name: "Git/GitHub" },
      { Icon: "Next", Name: "NextAuth" },
      { Icon: "SASS", Name: "SASS" },
      { Icon: "CSS", Name: "CSS" },
      { Icon: "HTML", Name: "HTML" },
    ],
  },
  {
    Header: "Backend",
    Description:
      "I have a deep passion for building robust and scalable backend systems. From designing databases to creating efficient APIs, I thrive on ensuring seamless communication between the server and client.",
    Skills: [
      { Icon: "Node", Name: "Node.js" },
      { Icon: "Express", Name: "Express.js" },
      { Icon: "TS", Name: "Typescript" },
      { Icon: "MongoDB", Name: "MongoDB" },
    ],
  },
  {
    Header: "Softwares i work with",
    Description:
      "I have a deep passion for building robust and scalable backend systems. From designing databases to creating efficient APIs, I thrive on ensuring seamless communication between the server and client.",
    Skills: [
      { Icon: "Postman", Name: "Postman" },
      { Icon: "VSCode", Name: "Vscode" },
      { Icon: "GitHub", Name: "Github" },
      { Icon: "VS", Name: "Visual Studio" },
      { Icon: "MongoDB", Name: "MongoDB compass" },
      { Icon: "MongoDB", Name: "clion" },
    ],
  },
];

const Skills = () => {
  return (
    <div className="flex h-full max-w-7xl flex-col items-center pb-14 justify-center m-auto md:px-16 px-6">
      <div>
        <h1 className="pb-5 text-center uppercase text-6xl  font-bold lg:text-7xl">Stack</h1>
        <p className="pb-5">LANGUAGES I USE - DEV ARSENAL</p>
      </div>
      <section className="relative z-10 flex flex-col justify-center gap-10 max-w-6xl m-auto">
        {SkillsObjects.map((item, index) => (
          <div
            key={index}
            className="z-10 rounded-md  border-[1px] border-[#888889] border-opacity-10 shadow-2xl"
          >
            <div className=" z-10 px-10 py-12">
              <h2 className="text-xl font-semibold">{item.Header}</h2>
              <p className="text-[#888889]">{item.Description}</p>
            </div>
            <div className="whitespace-normal break-words px-10 py-12">
              <ul className="sf-ui flex h-fit max-w-[470px] flex-wrap  gap-3 text-xs uppercase  leading-relaxed text-[#888889] md:text-sm">
                <li className="flex flex-wrap gap-2">
                  {item.Skills.map((skill, index) => (
                    <span
                      key={index}
                      className="flex  w-fit gap-2 rounded-badge border-[2px] border-[#888889] border-opacity-10  bg-[#0E0F11] px-2 py-1 font-semibold opacity-100"
                    >
                      {/* <SVGIcon type={skill.Icon} /> */}
                      {skill.Name}
                    </span>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Skills;
