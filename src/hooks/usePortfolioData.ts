import { useEffect, useState } from "react";

const GH = "https://raw.githubusercontent.com/PrabalBatra/Portfolio/json_data";

export type Banner = { titles: string[]; description: string; imgUrl: string };
export type Skill = { name: string; progress: number };
export type SkillCategory = { title: string; skills: Skill[] };
export type Project = { title: string; description: string; imgUrl: string; link: string };
export type Experience = Project & { duration?: string; ref?: string };
export type SuccessStory = Project;
export type Links = { 
  resume_PDF: string; 
  visume_video: string;
  github: string;
  email: string;
  formspree_ID: string;
};
export type SystemMetadata = {
  version: string;
  systemID: string;
  userName: string;
  terminalUser: string;
  kernel: string;
  status: string;
  efficiency: string;
  uptime: string;
  latency: string;
  deployment_tag: string;
  intelligence_tag: string;
  achievement_tag: string;
  operational_log_tag: string;
  pages?: {
    work: { title1: string; title2: string };
    skills: { title1: string; title2: string };
    achievements: { title1: string; title2: string; subtitle: string };
    log: { title1: string; title2: string; subtitle: string };
  };
  footer?: { copyright_text: string };
};
export type Logo = { logo_url: string };

const FALLBACK = {
  banner: {
    titles: ["AI Engineer", "Geospatial Intelligence Specialist", "Multi-Agent Systems Architect"],
    description: "Building Intelligent AI Systems for Real-World Intelligence.",
    imgUrl: "",
  } as Banner,
  skills: [
    {
      title: "01 [SPATIAL_INTELLIGENCE]",
      skills: [
        { name: "PostGIS Spatial Algorithms", progress: 95 },
        { name: "CesiumJS 3D Tile Pipelines", progress: 90 },
        { name: "LiDAR Point Cloud Processing", progress: 85 },
        { name: "Geospatial Vector Math", progress: 95 },
        { name: "Digital Twin Simulation", progress: 90 }
      ]
    },
    {
      title: "02 [AUTONOMOUS_AGENTS]",
      skills: [
        { name: "LangGraph Multi-Agent Orchestration", progress: 95 },
        { name: "Semantic RAG & Vector Embeddings", progress: 95 },
        { name: "Tool-Calling LLMs (Llama 3/Claude)", progress: 90 },
        { name: "LangChain Custom Executors", progress: 95 },
        { name: "Autonomous Workflow Synthesis", progress: 90 }
      ]
    },
    {
      title: "03 [VISION_&_NEURAL_ENG]",
      skills: [
        { name: "PyTorch Deep Learning Core", progress: 95 },
        { name: "YOLO Real-Time Object Tracking", progress: 95 },
        { name: "Convolutional Neural Networks", progress: 90 },
        { name: "Multi-Sensor Fusion (Camera/Radar)", progress: 85 },
        { name: "CUDA GPU Kernel Optimization", progress: 85 }
      ]
    },
    {
      title: "04 [SYSTEMS_&_INFRASTRUCTURE]",
      skills: [
        { name: "FastAPI High-Concurrency Endpoints", progress: 95 },
        { name: "Python Advanced DSA & Patterns", progress: 95 },
        { name: "Docker Containerization", progress: 90 },
        { name: "AWS Cloud Deployment", progress: 85 },
        { name: "CI/CD & Automated Testing", progress: 90 }
      ]
    },
    {
      title: "05 [MLOPS_&_DATA_ENGINEERING]",
      skills: [
        { name: "Apache Spark Big Data Analytics", progress: 95 },
        { name: "Vector Databases (pgvector/Qdrant)", progress: 95 },
        { name: "MLflow Model Registry & Tracking", progress: 90 },
        { name: "Prefect & Airflow Orchestration", progress: 90 },
        { name: "ONNX & TensorRT Quantization", progress: 85 }
      ]
    },
    {
      title: "06 [DIGITAL_TWINS_&_3D_GRAPHICS]",
      skills: [
        { name: "Deck.gl & Mapbox Spatial Viz", progress: 95 },
        { name: "Three.js & WebGL Custom Shaders", progress: 90 },
        { name: "OGC Standards (3D Tiles, WMS, WFS)", progress: 95 },
        { name: "Unreal Engine Spatial Integrations", progress: 85 },
        { name: "PDAL & CloudCompare LiDAR Pipeline", progress: 85 }
      ]
    }
  ] as SkillCategory[],
  projects: [
    {
      title: "AstroTerra",
      description: "High-precision lunar boulder detection and analysis system for safe landing site selection.",
      imgUrl: "https://res.cloudinary.com/dxh9tugzx/image/upload/v1734274123/AsstroTerra_oo1cew.png",
      link: "https://github.com/PrabalBatra/AstroTerra"
    },
    {
      title: "Project G.U.A.R.D",
      description: "An automated accident detection and response ecosystem. Utilizes multi-sensor fusion and visual neural networks.",
      imgUrl: "https://res.cloudinary.com/dxh9tugzx/image/upload/v1734274123/Guard_e8fr8x.png",
      link: "https://github.com/PrabalBatra/G.U.A.R.D"
    },
    {
      title: "Project O.C.G",
      description: "Object Controlling Glasses for hands-free device interaction. Features advanced eye-tracking algorithms.",
      imgUrl: "https://res.cloudinary.com/dxh9tugzx/image/upload/v1734274123/OCG_sfbkvb.png",
      link: "https://github.com/Rathoreatri03/Object-Detection-Glasses-OCG-"
    },
    {
      title: "Project Robocop",
      description: "Autonomous security and surveillance robotic platform. Integrates automated threat detection protocols.",
      imgUrl: "https://res.cloudinary.com/dxh9tugzx/image/upload/v1734284893/Robocop_xkurfc.jpg",
      link: "https://github.com/PrabalBatra/Robocop_MLG"
    },
    {
      title: "Murphy Systum",
      description: "Advanced medical diagnostic ecosystem utilizing deep learning for multi-disease detection.",
      imgUrl: "https://res.cloudinary.com/dxh9tugzx/image/upload/v1740683019/Murphy_Systum_tgzxv3.png",
      link: "https://github.com/PrabalBatra/BrainDead"
    },
    {
      title: "LifeMatrix",
      description: "Mission-critical patient monitoring system for hospital environments. Features real-time vital tracking.",
      imgUrl: "https://res.cloudinary.com/dxh9tugzx/image/upload/v1734284910/lifematix_g75wzz.png",
      link: " "
    }
  ] as Project[],
  experience: [
    {
      title: "Genesys International Corporation",
      duration: "June 2025 — Present",
      description: "Apprenticeship Trainee. Working on intelligent geospatial systems, production-grade AI workflows, and Digital Twin technologies.",
      imgUrl: "",
      link: "https://www.igenesys.com"
    },
    {
      title: "Ozibook",
      duration: "June 2024 — Aug 2024",
      description: "Business Analyst Assistant Intern. Worked on business analysis processes, operational understanding, and structured problem-solving workflows.",
      imgUrl: "",
      link: "#"
    }
  ] as Experience[],
  successStories: [
    {
      title: "Book Chapter: Printing a Sustainable Future",
      description: "Co-authored a chapter in 'Hybrid Metal Additive Manufacturing' on revolutionizing waste management through additive manufacturing.",
      imgUrl: "https://res.cloudinary.com/dxh9tugzx/image/upload/v1734283497/bookchapter_yx60hp.jpg",
      link: "https://www.taylorfrancis.com/chapters/edit/10.1201/9781003406488-8/printing-sustainable-future-jagdeep-kaur-atri-rathore-tarveen-kaur-prabal-batra"
    },
    {
      title: "Mycofibre Composite and Synthesis",
      description: "Developed fungal-based mycofibre, an eco-friendly and biodegradable material. Filed under patent number 202311048967 on Jul 20, 2023.",
      imgUrl: "https://res.cloudinary.com/dxh9tugzx/image/upload/v1734283499/Patent-2_agztfr.jpg",
      link: ""
    },
    {
      title: "AI-Enabled Tracking-Based Security System",
      description: "Designed a cutting-edge AI-powered tracking security system for enhanced safety and surveillance. Issued under patent number 202311054397 on Aug 13, 2023.",
      imgUrl: "https://res.cloudinary.com/dxh9tugzx/image/upload/v1734283497/Patent-3_pcz4qb.jpg",
      link: ""
    }
  ] as SuccessStory[],
  achievements: [
    {
      title: "Ctrl + Alt + Hack 2025 - NSUT",
      description: "Presented the Murphy Systum project and achieved a 1st position among 250+ teams at this prestigious hackathon in Delhi NSUT.",
      imgUrl: "https://res.cloudinary.com/dxh9tugzx/image/upload/v1740683388/Murphy_Systum_lte47k.png",
      link: ""
    },
    {
      title: "Code Wizard 2025",
      description: "Presented the Brain Wizard project and achieved top 10th position among 400+ teams at this prestigious hackathon in Delhi SRM college.",
      imgUrl: "https://res.cloudinary.com/dxh9tugzx/image/upload/v1740683869/Murphy_Systum_s7g7lr.png",
      link: ""
    },
    {
      title: "INNOV8",
      description: "Presented the G.U.A.R.D. project and achieved a top 5 finalist position among 700+ teams at this prestigious hackathon in Jaipur.",
      imgUrl: "https://res.cloudinary.com/dxh9tugzx/image/upload/v1734278770/INNOV8_werudo.jpg",
      link: ""
    },
    {
      title: "VIHAN 007",
      description: "Won the 'Best IEEE Award' in North India's biggest hackathon for the Global Unified Accident Response Device (G.U.A.R.D.) project.",
      imgUrl: "https://res.cloudinary.com/dxh9tugzx/image/upload/v1734278307/Vihan007_ukz7wt.jpg",
      link: ""
    },
    {
      title: "HIS 2.0",
      description: "Secured the 5th rank in Rajasthan's largest hackathon for the innovative RoboCop highway safety project.",
      imgUrl: "https://res.cloudinary.com/dxh9tugzx/image/upload/v1734278308/HIS2.0_fpxhyg.jpg",
      link: ""
    },
    {
      title: "Think'IN Green",
      description: "Won the Think'N Green Hackathon for the Mycofibre project, which focused on sustainable materials and environmental innovation.",
      imgUrl: "https://res.cloudinary.com/dxh9tugzx/image/upload/v1734278304/ThinNgreen_waluit.jpg",
      link: ""
    },
    {
      title: "Bihar Innovation Challenge 2024",
      description: "Selected among the top 25 teams for presenting Mycofibre, a project revolutionizing sustainable material development.",
      imgUrl: "https://res.cloudinary.com/dxh9tugzx/image/upload/v1734278771/BiharInnovation_my24pq.png",
      link: ""
    },
    {
      title: "VIHAAN 6.0",
      description: "Awarded the 'Best Freshers Award' for outstanding performance and innovation with the Mycofibre project in a major hackathon.",
      imgUrl: "https://res.cloudinary.com/dxh9tugzx/image/upload/v1734278306/VIHAAN6.0_lhgnac.jpg",
      link: ""
    }
  ] as SuccessStory[],
  links: {
    resume_PDF: "/Prabal Batra Resume (1).pdf", 
    visume_video: "", 
    github: "https://github.com/prabal-batra", 
    email: "batraprabal04@gmail.com", 
    formspree_ID: "xredzdqg"
  } as Links,
  metadata: {
    version: "STABLE",
    systemID: "Prabal_Batra",
    userName: "Prabal Batra",
    terminalUser: "batraprabal04@space",
    kernel: "AI-Matrix_64",
    status: "OPTIMAL",
    efficiency: "99.2%",
    uptime: "99.99%",
    latency: "12ms",
    deployment_tag: "Geospatial_Stream",
    intelligence_tag: "Agentic_Intelligence",
    achievement_tag: "Research_Stream",
    operational_log_tag: "Operational_Log",
    pages: {
      work: { title1: "Selected", title2: "Cinematic Projects" },
      skills: { title1: "Technology", title2: "Ecosystem" },
      achievements: { title1: "Hackathons &", title2: "Achievements", subtitle: "COMPETITIVE ARCHIVE OF HACKATHON VICTORIES & HONORS" },
      log: { title1: "Professional", title2: "Trajectory", subtitle: "CHRONOLOGICAL RECORD OF INDUSTRY EXPERIENCE" }
    },
    footer: { copyright_text: "PRABAL_BATRA_AI_SYSTEMS" }
  } as SystemMetadata,
  techStack: ["AI", "ML", "CV", "PYTHON", "FASTAPI", "POSTGIS", "LANGCHAIN", "LANGGRAPH", "RAG"],
  logo: { logo_url: "" } as Logo
};

export function usePortfolioData() {
  const [banner, setBanner] = useState<Banner>(FALLBACK.banner);
  const [skills, setSkills] = useState<SkillCategory[]>(FALLBACK.skills);
  const [projects, setProjects] = useState<Project[]>(FALLBACK.projects);
  const [experience, setExperience] = useState<Experience[]>(FALLBACK.experience);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>(FALLBACK.successStories);
  const [achievements, setAchievements] = useState<SuccessStory[]>(FALLBACK.achievements);
  const [links, setLinks] = useState<Links>(FALLBACK.links);
  const [metadata, setMetadata] = useState<SystemMetadata>(FALLBACK.metadata);
  const [techStack, setTechStack] = useState<string[]>(FALLBACK.techStack);
  const [logo, setLogo] = useState<Logo>(FALLBACK.logo);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancel = false;
    const fetchJson = async <T,>(url: string): Promise<T | null> => {
      try {
        const r = await window.fetch(url, { cache: "no-store" });
        if (!r.ok) return null;
        return (await r.json()) as T;
      } catch { return null; }
    };

    (async () => {
       const v = Date.now();
       const [pr, ss, ac] = await Promise.all([
         fetchJson<Project[]>(`${GH}/projects.json?v=${v}`),
         fetchJson<SuccessStory[]>(`${GH}/researchInsights.json?v=${v}`), 
         fetchJson<SuccessStory[]>(`${GH}/successStories.json?v=${v}`)
       ]);

       if (cancel) return;
       
       if (pr && pr.length > 0) setProjects(pr);
       if (ss && ss.length > 0) {
         setSuccessStories(ss.filter(a => !a.title.toLowerCase().includes("filament") && !a.description?.includes("202311054420")));
       }
       if (ac && ac.length > 0) setAchievements(ac);
       setLoaded(true);
    })();
    return () => { cancel = true; };
  }, []);

  return { banner, skills, projects, experience, successStories, achievements, links, metadata, techStack, logo, loaded };
}
