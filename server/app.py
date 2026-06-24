from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS
import xml.etree.ElementTree as ET
from urllib.parse import urljoin

app = Flask(__name__)
CORS(app)

DEFAULT_THUMBNAIL = "https://via.placeholder.com/300x200?text=No+Image"

class NewsItem:
    def __init__(self, title, link, source, thumbnail=None):
        self.title = title
        self.link = link
        self.source = source
        self.thumbnail = thumbnail or DEFAULT_THUMBNAIL

    def to_dict(self):
        return {
            "title": self.title,
            "link": self.link,
            "source": self.source,
            "thumbnail": self.thumbnail
        }

# ---------------------
# Utility Functions
# ---------------------

def fetch_page(url, headers=None, timeout=5):
    try:
        headers = headers or {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers, timeout=timeout)
        if response.status_code == 200:
            return response
    except Exception as e:
        print(f"[ERROR] Failed to fetch {url}: {e}")
    return None

def get_meta_image(url):
    """Extract og:image or twitter:image from a page's meta tags."""
    response = fetch_page(url)
    if response:
        soup = BeautifulSoup(response.text, "html.parser")
        image_tag = (
            soup.find("meta", property="og:image") or
            soup.find("meta", attrs={"name": "twitter:image"})
        )
        if image_tag and image_tag.get("content"):
            return image_tag["content"]
    return None

def get_absolute_url(base, path):
    return path if path and path.startswith("http") else urljoin(base, path or "")

# ---------------------
# News Source Scrapers
# ---------------------

def scrape_google_news(query):
    print("[*] Scraping Google News...")
    url = f"https://news.google.com/rss/search?q={query}&hl=en-US&gl=US&ceid=US:en"
    response = fetch_page(url)
    news_items = []

    if not response:
        return news_items

    root = ET.fromstring(response.content)
    for item in root.findall(".//item")[:5]:
        title = item.find("title").text
        link = item.find("link").text

        media = item.find("{http://search.yahoo.com/mrss/}thumbnail")
        thumbnail = media.attrib.get("url") if media is not None else get_meta_image(link)
        thumbnail = get_absolute_url(link, thumbnail) or DEFAULT_THUMBNAIL

        news_items.append(NewsItem(title, link, "Google News", thumbnail))

    return news_items

def scrape_cnn(query):
    print("[*] Scraping CNN...")
    base_url = "https://edition.cnn.com"
    response = fetch_page(base_url)
    news_items = []

    if not response:
        return news_items

    soup = BeautifulSoup(response.text, "html.parser")
    for article in soup.select("article.cd"):
        title_tag = article.select_one("h3.cd__headline")
        link_tag = article.find("a")

        if not title_tag or not link_tag:
            continue

        title = title_tag.get_text(strip=True)
        link = urljoin(base_url, link_tag.get("href"))

        if query.lower() not in title.lower():
            continue

        img_tag = article.find("img")
        thumbnail = img_tag.get("data-src-medium") or img_tag.get("src") if img_tag else None
        thumbnail = thumbnail or get_meta_image(link)
        thumbnail = get_absolute_url(base_url, thumbnail)

        news_items.append(NewsItem(title, link, "CNN", thumbnail))
    
    return news_items

def scrape_bbc(query):
    print("[*] Scraping BBC News...")
    base_url = "https://www.bbc.com/news"
    response = fetch_page(base_url)
    news_items = []

    if not response:
        return news_items

    soup = BeautifulSoup(response.text, "html.parser")
    for promo in soup.select("div.gs-c-promo"):
        title_tag = promo.select_one("a.gs-c-promo-heading")
        if not title_tag:
            continue

        title = title_tag.get_text(strip=True)
        link = urljoin(base_url, title_tag.get("href"))
        if query.lower() not in title.lower():
            continue

        img_tag = promo.select_one("img")
        thumbnail = img_tag.get("src") if img_tag else get_meta_image(link)
        thumbnail = get_absolute_url(base_url, thumbnail)

        news_items.append(NewsItem(title, link, "BBC", thumbnail))

    return news_items

# ---------------------
# Flask Endpoint
# ---------------------

@app.route("/process", methods=["POST"])
def process_command():
    try:
        data = request.get_json()
        query = data.get("command", "").strip()
        print(f"[COMMAND RECEIVED] {query}")

        if not query:
            return jsonify({"results": [], "error": "No query provided"}), 400

        all_news = (
            scrape_google_news(query) +
            scrape_cnn(query) +
            scrape_bbc(query)
        )

        if not all_news:
            return jsonify({"results": [], "error": "No articles found"}), 404

        return jsonify({"results": [item.to_dict() for item in all_news]})

    except Exception as e:
        print(f"[SERVER ERROR] {e}")
        return jsonify({"results": [], "error": str(e)}), 500

# ---------------------
# Main App Runner
# ---------------------

if __name__ == "__main__":
    app.run(debug=True)
