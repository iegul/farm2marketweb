import React from "react";
import { Card, Avatar, Space } from "antd";
import {
  InstagramOutlined,
  LinkedinOutlined,
  GithubOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import iremImage from "../../../images/irem.jpg";
import ecemImage from "../../../images/Ecem.jpg";
import edaImage from "../../../images/eda.jpg";
import barisImage from "../../../images/baris.jpg";
import cemHocaImage from "../../../images/cemhoca.png";

const { Meta } = Card;

function Contact() {
  const profiles = [
    {
      name: "Cem Taşkın",
      title: "Dr. Öğretim Üyesi",
      skills: "Project Manager",
      experience: "Çok yıllık deneyim",
      image: cemHocaImage,
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/cem-ta%C5%9Fkin-aa593b142/",
        github: "https://github.com/cemtaskin",
      },
    },
    {
      name: "İrem Elif Gül",
      title: "Frontend Developer",
      skills: "ReactJS",
      experience: "1 yıla yakın deneyim",
      image: iremImage,
      socialLinks: {
        instagram: "https://www.instagram.com/iremelfgl/",
        linkedin: "https://www.linkedin.com/in/ielifgul/",
        github: "https://github.com/iegul",
      },
    },
    {
      name: "Ecem Hatice Özkan",
      title: "Backend Developer",
      skills: "C#",
      experience: "1 yıla yakın deneyim",
      image: ecemImage,
      socialLinks: {
        instagram: "https://www.instagram.com/ecemzkn_/",
        linkedin: "https://www.linkedin.com/in/ecemhaticeozkan17/",
        github: "https://github.com/ehatice",
      },
    },
    {
      name: "Elif Edanur Sesli",
      title: "Mobil Developer",
      skills: "Flutter",
      experience: "1 yıla yakın deneyim",
      image: edaImage,
      socialLinks: {
        instagram: "https://www.instagram.com/edanurseslii/",
        linkedin: "https://www.linkedin.com/in/elifedanursesli/",
        github: "https://github.com/EdanurSesli",
      },
    },
    {
      name: "Barış Deniz Özcan",
      title: "Backend Developer",
      skills: "C#",
      experience: "1 yıla yakın deneyim",
      image: barisImage,
      socialLinks: {
        instagram: "https://www.instagram.com/barisdenizo/",
        linkedin: "https://www.linkedin.com/in/baris-ozcann/",
        github: "https://github.com/Baris007",
      },
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        {profiles.map((profile, index) => (
          <Card
            key={index}
            style={{
              width: "100%",
              maxWidth: "600px",
              margin: "0 auto",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Meta
              avatar={
                <Avatar
                  src={profile.image}
                  size={150}
                  style={{
                    border: "2px solid #e6e6e6",
                  }}
                />
              }
              title={<h2 style={{ margin: 0 }}>{profile.name}</h2>}
              description={
                <div>
                  <p>
                    {profile.title}( {profile.skills})
                  </p>
                  <p></p>
                  <p>{profile.experience}</p>
                  <Space size="middle">
                    <a
                      href={profile.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "20px", color: "#E1306C" }}
                    >
                      <InstagramOutlined />
                    </a>
                    <a
                      href={profile.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "20px", color: "#0077B5" }}
                    >
                      <LinkedinOutlined />
                    </a>
                    <a
                      href={profile.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "20px", color: "#333" }}
                    >
                      <GithubOutlined />
                    </a>
                  </Space>
                </div>
              }
            />
          </Card>
        ))}
      </Space>
    </div>
  );
}

export default Contact;
