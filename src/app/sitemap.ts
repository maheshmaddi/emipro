import { MetadataRoute } from "next";

const BASE_URL = "https://emipro-calculator.netlify.app";

const loanTypes = [
  "home-loan",
  "car-loan",
  "personal-loan",
  "education-loan",
  "gold-loan",
  "business-loan",
];

const tools = ["compare", "prepayment", "afford", "refinance", "foreclosure", "rate-change"];

export default function sitemap(): MetadataRoute.Sitemap {
  const loanPages = loanTypes.map((type) => ({
    url: `${BASE_URL}/${type}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const toolPages = tools.map((tool) => ({
    url: `${BASE_URL}/${tool}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...loanPages,
    ...toolPages,
  ];
}
