import { useEffect } from "react";

function SEO({
    title,
    description,
    path = "/",
}) {
    const siteName = "Lucky Home Decor";
    const baseUrl = "https://luckyhomedecor.in";

    useEffect(() => {
        document.title = title;

        const fullUrl = `${baseUrl}${path}`;

        // Description
        let descriptionTag = document.querySelector(
            'meta[name="description"]'
        );

        if (!descriptionTag) {
            descriptionTag = document.createElement("meta");
            descriptionTag.setAttribute("name", "description");
            document.head.appendChild(descriptionTag);
        }

        descriptionTag.setAttribute("content", description);

        // Canonical
        let canonical = document.querySelector(
            'link[rel="canonical"]'
        );

        if (!canonical) {
            canonical = document.createElement("link");
            canonical.setAttribute("rel", "canonical");
            document.head.appendChild(canonical);
        }

        canonical.setAttribute("href", fullUrl);

        // Open Graph title
        setMetaProperty("og:title", title);

        // Open Graph description
        setMetaProperty("og:description", description);

        // Open Graph URL
        setMetaProperty("og:url", fullUrl);

        // Open Graph type
        setMetaProperty("og:type", "website");

        // Open Graph site name
        setMetaProperty("og:site_name", siteName);
    }, [title, description, path]);

    return null;
}

function setMetaProperty(property, content) {
    let meta = document.querySelector(
        `meta[property="${property}"]`
    );

    if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
    }

    meta.setAttribute("content", content);
}

export default SEO;