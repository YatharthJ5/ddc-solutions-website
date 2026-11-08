const O = "https://ddcsolutions.co.uk";
export const remote = (p: string) => `${O}/wp-content/uploads/${p}`;
export const WA = "https://api.whatsapp.com/send?phone=%20447800955376&text=Hello%2C%20I%E2%80%99m%20visiting%20from%20the%20DDC%20Solutions%20website%20and%20would%20like%20more%20information%20about%20your%20services.";
export const contact = { tel: "0208 058 5031", email: "info@ddcsolutions.co.uk", address: "36 Scotts Road, Bromley, BR1 3QD" };
export const socials = [["LinkedIn","https://www.linkedin.com/company/ddcsolutions/"],["X","https://twitter.com/DDC_Solutions"],["Facebook","https://web.facebook.com/DDCSolutionsUK"],["Instagram","https://www.instagram.com/ddc_solutions/"]];
export type Svc = { slug: string; name: string; kicker: string; blurb: string; image?: string; related: string[] };
// Blurbs are the homepage wording of the live site (clash / revit / scan: adapted from the live site's homepage; replace with original service-page copy).
export const services: Svc[] = [
 { slug:"training-service", image:"2026/08/49.png", name:"Project START and Training", kicker:"Project START", blurb:"Kickstart your projects with rock-solid BIM foundations. Complete execution planning, team alignment, and risk-mitigation strategies from day one.", related:[] },
 { slug:"bim-information-management", image:"2026/08/50.png", name:"Information Management", kicker:"Compliance & data", blurb:"Complete conflict resolution, compliance auditing, and strict data management aligned with international and UK BIM Framework standards.", related:["higgins","tsk-group"] },
 { slug:"ddc-subscription-service", image:"2026/08/51.png", name:"Inhouse BIM Management", kicker:"Subscription · All in one", blurb:"On-demand leadership to embed strategic BIM expertise directly into your business. We act as your internal partners to optimize workflows and upskill your staff.", related:[] },
 { slug:"revit-4-project-delivery", image:"2026/08/52.png", name:"Project Modeling & R4PD", kicker:"Revit 4 Project Delivery", blurb:"High-performance Revit modeling and Revit 4 Project Delivery (R4PD) support. Fast, scalable, and accurate production to keep your design pipeline moving.", related:["stiff-trevillion"] },
 { slug:"clash-detection-services", name:"Clash Detection", kicker:"Coordination", blurb:"Proactive clash detection and information management strategies that significantly reduce on-site remodeling costs and overheads.", related:["stiff-trevillion","tsk-group"] },
 { slug:"revit-modeling-services", name:"Revit Modeling", kicker:"Production", blurb:"Production-ready structural and architectural Revit modeling, delivered as an integrated extension of your house team.", related:["stiff-trevillion","david-kohn-architects"] },
 { slug:"scan-to-bim-services", name:"Scan to BIM", kicker:"Point cloud modeling", blurb:"Specialized Scan to BIM and point cloud modeling expertise for your upcoming project, backed by over 20 years of experience.", related:[] },
];
export type Proj = { slug: string; src?: string; image?: string; gallery?: string[]; illustrative?: boolean; client: string; title: string; sector: string; place?: string; services?: string; body: string; orig: string | null; quote?: number };
export const projects: Proj[] = [
 { slug:"tsk-group", image:"/images/projects/tsk-illustrative-bim.svg", illustrative:true, client:"TSK Group", title:"Digital Design Transformation", sector:"Architecture & Contracting", place:"London & Manchester", body:"Faced with surging project demands, TSK needed a scalable digital foundation. DDC Solutions implemented a business-first risk management programme anchored on ISO 19650 principles. We built a bespoke Revit framework and governance layer, delivering faster mobilization, fewer on-site design clashes, and seamless multi-office collaboration.", orig:null, quote:2 },
 { slug:"higgins", src:"ddc-higgins", image:"/images/projects/higgins.jpg", gallery:["/images/projects/higgins-detail.jpg"], client:"Higgins", title:"Achieving Information Excellence: The Higgins BIM Roadmap", sector:"Construction & Development", services:"Information Management & Accreditation", body:"A comprehensive auditing and information governance program designed to align multi-disciplinary workflows. DDC developed an actionable compliance roadmap that resolved complex audit findings and enabled full regulatory alignment with strict UK BIM Framework standards.", orig:O+"/ddc-higgins/", quote:0 },
 { slug:"stiff-trevillion", src:"stiff-trevillions", image:"/images/projects/stiff-trevillion.jpg", gallery:["/images/projects/stiff-trevillion-detail.jpg"], client:"Stiff & Trevillion / ST Modelling", title:"High-Performance Revit Production", sector:"High-End Architecture", place:"London", body:"Delivering production-ready structural and architectural Revit modeling under aggressive commercial deadlines. We acted as an integrated extension of their house team, streamlining drawing standards and ensuring clash-free pipeline delivery across major London developments.", orig:O+"/stiff-trevillions/" },
 { slug:"david-kohn-architects", src:"david-kohn-architects", image:"/images/projects/david-kohn-architects.webp", gallery:["/images/projects/david-kohn-architects-slide1.png"], client:"David Kohn Architects", title:"Advanced BIM Support & Model Auditing", sector:"Award-Winning Architecture", place:"United Kingdom", body:"Providing specialized Revit configuration and strategic data optimization for high-profile projects. DDC introduced reliable template structures and object library auditing, minimizing manual modeling errors and securing compliance for complex design delivery.", orig:O+"/david-kohn-architects/" },
];
export const team: [string, string, string, string][] = [
 ["Jimi Clarke","Founder","Jimi Clarke is a pioneering force in digital construction solutions. With a profound understanding of the global construction sector, Jimi is committed to reshaping project execution through innovative digital technologies, emphasizing cost reduction, waste mitigation, and sustainability.","2026/09/Jimmy-Clarke.png"],
 ["Adeel Khaliq","Commercial Director","Adeel Khaliq is a respected figure in the Building Information Modeling (BIM) industry with a 20-year career. He is known for his visionary approach, personal client engagement, and commitment to excellence. Under his leadership, DDC Solution is at the forefront of shaping the future of digital construction.","2026/08/2.png"],
 ["Daniel Betancur","Information Manager","Brings extensive expertise in BIM consultancy, with a focus on trust-building and tailored solutions. His mission is to seamlessly guide professionals through the BIM/ISO 19650 journey.","2026/08/3.png"],
 ["Daniel Posada","Information Manager","Strong technical proficiency in BIM software and meticulous attention to detail, supporting clients in achieving their BIM objectives and maximizing the benefits of digitalization.","2026/08/Camiseta-Sin-Letras-KLF-1-1.png"],
 ["Radia Zubair","Specialist in AI and Data Analytics","Helps organisations turn raw information into clear, actionable direction, streamlining workflows and rethinking how data is used to drive better decisions.","2026/08/1.png"],
 ["Rishabh Jain","BIM Consultant","Helps project teams improve BIM workflows through technical support, training, and practical guidance, with expertise in Revit, BIM coordination, and ISO 19650.","2026/09/Rishabh-Jain.png"],
 ["Daniel Leal","Information Manager","","2026/08/5-1.png"],
 ["Kunjum Arora","BIM Consultant","","2026/08/4.png"],
 ["Estefania Pulido","","","2026/08/7-1.png"],
];
export const whyUs = [
 ["UK Framework Standards","100% compliance alignment with the latest UK BIM Framework and ISO 19650 protocols to prevent future legal or design disputes."],
 ["Zero Operational Friction","We embed our strategic expertise into your existing pipeline, acting as an extension of your house team from day one."],
 ["Clash Free Guarantee","Proactive clash detection and information management strategies that significantly reduce on-site remodeling costs and overheads."],
 ["Upskilling Your Workforce","We focus on corporate autonomy. We train and empower your in-house staff to make your firm fully self-sufficient over time."],
];
export const testimonials = [
 ["BIM and Compliance Lead","Higgins","Working with DDC on the Higgins BIM Level 2 Certification has been a breath of fresh air. The willingness to learn, embrace industry trends and adapt to overcome every finding during the audit enabled Higgins to meet and, in some areas, exceed regulatory requirements."],
 ["Senior Project Director","London Developments","DDC Solutions provided assistance with Revit modelling on two large commercial projects in central London. The modelling was carried out to a high standard on a fast turnaround, enabling us to get up to speed much quicker than anticipated."],
 ["Digital Design & Transformation Lead","TSK Group","DDC Solutions framed our digital transformation as a business risk-management programme. By implementing a bespoke Revit framework, they delivered a stronger information baseline that enables faster project mobilisation, cleaner outputs, and predictable multi-office collaboration."],
];
export const logos: [string, string][] = [["2025/07/Higgins-1.webp","Higgins"],["2025/07/Piercy-and-C0mpany.webp","Piercy & Company"],["2025/07/Stiff-Trivilli0n.webp","Stiff & Trevillion"]];
export type Post = { slug: string; title: string; date: string; author: string; excerpt: string; html?: string; cats: { slug: string; name: string }[]; featured?: string | null; external?: string };
const ext = (slug: string, title: string, date: string, author = "DDC Solutions"): Post => ({ slug, title, date, author, excerpt: "", cats: [], external: `${O}/${slug}/` });
export const interimPosts: Post[] = [
 ext("why-instant-quotes-are-hiding-construction-risk", "Why Instant Quotes Are Hiding Construction Risk", "2026-05-11", "Jimi Clarke"),
 ext("__trashed-3", "Thirty Years Ahead of the Standard: Why DDC Solutions Clients Are Already Ready for the Future", "2026-04-07", "Jimi Clarke"),
 ext("cad-vs-bim", "CAD vs BIM, Simply Explained", "2025-08-14"),
 ext("how-bim-improves-communication-collaboration", "How BIM Improves Communication and Collaboration on Design and Construction Projects", "2025-01-23"),
 ext("bim-levels-explained", "BIM Levels Explained (What Each One Means)", "2024-10-14"),
 ext("bim-cost-estimation", "Best Practices for Accurate BIM-based Cost Estimation", "2024-03-04"),
 ext("bim-coordination-explained", "BIM Coordination Explained", ""),
 ext("how-to-make-revit-run-faster", "How to Make Revit Run Faster?", ""),
 ext("bim-for-facility-managers", "How BIM Empowers Facility Managers?", ""),
];
