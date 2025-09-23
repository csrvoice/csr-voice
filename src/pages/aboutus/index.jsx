import { Layout } from "@/components/Layout/Layout";
import { AboutUs } from "@/components/QuickLinks/AboutUs";
import Head from "next/head";
import { INIT_URI } from "@/constant";
import React from "react";

const Index = () => {
  const siteName = "CSR Voice";
  const aboutUrl = `${INIT_URI}/about`;
  const logoUrl = "/images/logo.jpg";

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>
          About CSR Voice | India's Leading Corporate Social Responsibility
          Platform
        </title>
        <meta
          name="description"
          content="Learn about CSR Voice - India's premier platform for Corporate Social Responsibility news, sustainability insights, and ESG reporting. Discover our mission to promote responsible business practices and social impact across India."
        />
        <meta
          name="keywords"
          content="About CSR Voice, Corporate Social Responsibility platform India, CSR news platform, sustainability news India, ESG reporting platform, social impact journalism, responsible business news, CSR Voice mission, CSR Voice team, business ethics platform"
        />
        <meta name="author" content="CSR Voice Editorial Team" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large"
        />
        <meta name="googlebot" content="index, follow" />

        {/* Viewport and Charset */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="Content-Language" content="en" />

        {/* Canonical URL */}
        <link rel="canonical" href={aboutUrl} />

        {/* Favicon and Icons */}
        <link rel="icon" href={logoUrl} />
        <link rel="apple-touch-icon" sizes="180x180" href={logoUrl} />
        <link rel="icon" type="image/png" sizes="32x32" href={logoUrl} />
        <link rel="icon" type="image/png" sizes="16x16" href={logoUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta
          property="og:title"
          content="About CSR Voice | India's Leading CSR Platform"
        />
        <meta
          property="og:description"
          content="CSR Voice is India's premier platform for Corporate Social Responsibility news, sustainability insights, and ESG reporting. Promoting responsible business practices across India."
        />
        <meta property="og:url" content={aboutUrl} />
        <meta property="og:image" content={`${INIT_URI}${logoUrl}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="CSR Voice - About Our Platform"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="en_IN" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@csrvoice" />
        <meta
          name="twitter:title"
          content="About CSR Voice | India's Leading CSR Platform"
        />
        <meta
          name="twitter:description"
          content="Learn about CSR Voice - India's premier platform for Corporate Social Responsibility news and sustainability insights."
        />
        <meta name="twitter:image" content={`${INIT_URI}${logoUrl}`} />
        <meta name="twitter:image:alt" content="CSR Voice Logo" />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#2E7D32" />
        <meta name="msapplication-TileColor" content="#2E7D32" />
        <meta name="format-detection" content="telephone=no" />

        {/* Organization Schema - Critical for About Us pages */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteName,
              alternateName: "CSR Voice India",
              description:
                "India's leading platform for Corporate Social Responsibility news, sustainability insights, and ESG reporting",
              url: INIT_URI,
              logo: {
                "@type": "ImageObject",
                url: `${INIT_URI}${logoUrl}`,
                width: 200,
                height: 60,
              },
              foundingDate: "2020",
              founders: [
                {
                  "@type": "Person",
                  name: "CSR Voice Founder",
                },
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
                addressRegion: "India",
              },
              areaServed: {
                "@type": "Country",
                name: "India",
              },
              sameAs: [
                "https://twitter.com/csrvoice",
                "https://www.linkedin.com/company/csrvoice",
                "https://www.facebook.com/csrvoice",
                "https://www.instagram.com/csrvoice",
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "editorial",
                  availableLanguage: ["English", "Hindi"],
                  areaServed: "IN",
                },
                {
                  "@type": "ContactPoint",
                  contactType: "media relations",
                  availableLanguage: "English",
                  areaServed: "IN",
                },
              ],
              knowsAbout: [
                "Corporate Social Responsibility",
                "Sustainability",
                "ESG Reporting",
                "Environmental Social Governance",
                "Social Impact",
                "Business Ethics",
                "Responsible Business Practices",
                "Sustainable Development Goals",
                "Corporate Philanthropy",
                "Community Development",
              ],
              memberOf: {
                "@type": "Organization",
                name: "Indian Media Network",
              },
              publishingPrinciples: `${INIT_URI}/editorial-guidelines`,
              diversityPolicy: `${INIT_URI}/diversity-policy`,
              ethicsPolicy: `${INIT_URI}/ethics-policy`,
            }),
          }}
        />

        {/* AboutPage Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              name: "About CSR Voice",
              description:
                "Learn about CSR Voice, India's premier platform for Corporate Social Responsibility news and insights",
              url: aboutUrl,
              inLanguage: "en-IN",
              isPartOf: {
                "@type": "WebSite",
                name: siteName,
                url: INIT_URI,
              },
              about: {
                "@type": "Organization",
                name: siteName,
                description:
                  "Corporate Social Responsibility news and insights platform",
              },
              mainEntity: {
                "@type": "Organization",
                name: siteName,
                url: INIT_URI,
              },
              breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: INIT_URI,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "About Us",
                    item: aboutUrl,
                  },
                ],
              },
            }),
          }}
        />

        {/* NewsMediaOrganization Schema for Media Credibility */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              name: siteName,
              url: INIT_URI,
              logo: {
                "@type": "ImageObject",
                url: `${INIT_URI}${logoUrl}`,
              },
              description:
                "India's leading Corporate Social Responsibility news and insights platform",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              sameAs: [
                "https://twitter.com/csrvoice",
                "https://www.linkedin.com/company/csrvoice",
              ],
              diversityPolicy: `${INIT_URI}/diversity-policy`,
              ethicsPolicy: `${INIT_URI}/ethics-policy`,
              masthead: aboutUrl,
              missionCoveragePrioritiesPolicy: `${INIT_URI}/editorial-mission`,
              noBylinesPolicy: `${INIT_URI}/bylines-policy`,
              ownershipFundingInfo: `${INIT_URI}/funding-info`,
              actionableFeedbackPolicy: `${INIT_URI}/feedback-policy`,
              correctionsPolicy: `${INIT_URI}/corrections-policy`,
              unnamedSourcesPolicy: `${INIT_URI}/sources-policy`,
            }),
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteName,
              url: INIT_URI,
              description:
                "India's premier Corporate Social Responsibility news and insights platform",
              publisher: {
                "@type": "Organization",
                name: siteName,
                logo: {
                  "@type": "ImageObject",
                  url: `${INIT_URI}${logoUrl}`,
                },
              },
              potentialAction: {
                "@type": "SearchAction",
                target: `${INIT_URI}/search?text={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* FAQ Schema for About Us */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is CSR Voice?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "CSR Voice is India's premier platform for Corporate Social Responsibility news, sustainability insights, and ESG reporting. We focus on promoting responsible business practices and social impact across India.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What type of content does CSR Voice publish?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "CSR Voice publishes news and insights on Corporate Social Responsibility, sustainability initiatives, ESG reporting, environmental issues, social impact stories, and responsible business practices in India.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Who is the target audience of CSR Voice?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our audience includes CSR professionals, sustainability managers, corporate executives, policy makers, NGO leaders, and anyone interested in responsible business practices and social impact in India.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How can I contribute to CSR Voice?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You can contribute by sharing CSR stories, submitting articles, participating in our community discussions, and following our editorial guidelines for guest contributions.",
                  },
                },
              ],
            }),
          }}
        />

        {/* Local Business Schema (if applicable) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: siteName,
              description:
                "Corporate Social Responsibility news and consulting services",
              url: INIT_URI,
              areaServed: "IN",
              serviceType: [
                "CSR News Publishing",
                "Sustainability Reporting",
                "ESG Content Services",
                "Corporate Communication",
              ],
            }),
          }}
        />

        {/* Preload and DNS prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />

        {/* Alternate languages */}
        <link rel="alternate" hrefLang="en" href={aboutUrl} />
        <link rel="alternate" hrefLang="en-in" href={aboutUrl} />

        {/* Additional About Us specific meta */}
        <meta name="company-name" content={siteName} />
        <meta name="company-type" content="Media Organization" />
        <meta
          name="industry"
          content="Corporate Social Responsibility, Sustainability News"
        />
        <meta name="founded" content="2020" />
        <meta name="headquarters" content="India" />

        {/* Trust and credibility indicators */}
        <meta
          name="editorial-policy"
          content={`${INIT_URI}/editorial-policy`}
        />
        <meta name="privacy-policy" content={`${INIT_URI}/privacy-policy`} />
        <meta name="terms-of-service" content={`${INIT_URI}/terms`} />

        {/* Contact and support links */}
        <link rel="contact" href={`${INIT_URI}/contact`} />
        <link rel="help" href={`${INIT_URI}/help`} />
      </Head>

      <Layout>
        <AboutUs />
      </Layout>
    </>
  );
};

export default Index;
