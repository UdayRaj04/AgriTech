import React from "react";
import "./team.css"; // Import the CSS file

const teamMembers = [
  {
    name: "Uday Raj Sharma",
    role: "B.Tech | CSE(Data Science)",
    university: "FIEM",
    img: "uday-p.png",
    instagram: "https://www.facebook.com/sharmarajuday",
    linkedin: "https://www.facebook.com/sharmarajuday",
    github: "https://www.facebook.com/sharmarajuday",
  },
  {
    name: "Aryan Raj",
    role: "B.Tech | CSE(Data Science)",
    university: "FIEM",
    img: "aryan.jpg",
    instagram: "https://www.facebook.com/sharmarajuday",
    linkedin: "https://www.facebook.com/sharmarajuday",
    github: "https://www.facebook.com/sharmarajuday",
  },
  {
    name: "Gourav Dey",
    role: "B.Tech | CSE(Data Science)",
    university: "FIEM",
    img: "gou.jpg",
    instagram: "https://www.facebook.com/sharmarajuday",
    linkedin: "https://www.facebook.com/sharmarajuday",
    github: "https://www.facebook.com/sharmarajuday",
  },
  {
    name: "Chhavinav Verma",
    role: "B.Tech | CSE(Data Science)",
    university: "FIEM",
    img: "chavi.jpg",
    instagram: "https://www.facebook.com/sharmarajuday",
    linkedin: "https://www.facebook.com/sharmarajuday",
    github: "https://www.facebook.com/sharmarajuday",
  },
  
  
];

const About = () => {
  return (
    <section className="about" id="about">
      <div className="heading">
        <h1>Team Members</h1>
      </div>

      <div className="box-container">
        {teamMembers.map((member, index) => (
          <div className="box" key={index}>
            <img src={member.img} alt={member.name} />
            <h3>{member.name}</h3>
            <p>
              {member.role} <br /> {member.university}
            </p>
            {/* <div className="social-icons">
              <a href={member.instagram} target="_blank" rel="noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href={member.linkedin} target="_blank" rel="noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href={member.github} target="_blank" rel="noreferrer">
                <i className="fab fa-github"></i>
              </a>
            </div> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
