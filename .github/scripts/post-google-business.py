import os, sys, json, urllib.request, urllib.error, datetime, random

CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", "")
CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", "")
REFRESH_TOKEN = os.environ.get("GOOGLE_REFRESH_TOKEN", "")
LOCATION_ID = os.environ.get("GOOGLE_LOCATION_ID", "")

if not all([CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, LOCATION_ID]):
    print("ERROR: Missing required environment variables")
    sys.exit(1)

# Step 1: Get access token
token_payload = json.dumps({
    "client_id": CLIENT_ID,
    "client_secret": CLIENT_SECRET,
    "refresh_token": REFRESH_TOKEN,
    "grant_type": "refresh_token"
}).encode("utf-8")

token_req = urllib.request.Request(
    "https://oauth2.googleapis.com/token",
    data=token_payload,
    headers={"Content-Type": "application/json"}
)

try:
    with urllib.request.urlopen(token_req, timeout=30) as resp:
        token_data = json.loads(resp.read().decode("utf-8"))
except urllib.error.HTTPError as e:
    print("Token error " + str(e.code) + ": " + e.read().decode())
    sys.exit(1)

access_token = token_data.get("access_token", "")
if not access_token:
    print("ERROR: No access token received: " + str(token_data))
    sys.exit(1)

print("Access token obtained")

# Step 2: Get account ID
accounts_req = urllib.request.Request(
    "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
    headers={"Authorization": "Bearer " + access_token}
)

try:
    with urllib.request.urlopen(accounts_req, timeout=30) as resp:
        accounts_data = json.loads(resp.read().decode("utf-8"))
except urllib.error.HTTPError as e:
    print("Accounts error " + str(e.code) + ": " + e.read().decode())
    sys.exit(1)

accounts = accounts_data.get("accounts", [])
if not accounts:
    print("ERROR: No accounts found")
    sys.exit(1)

account_name = accounts[0]["name"]
print("Account: " + account_name)

# Step 3: Post content rotation
POSTS = [
    {
        "summary": "Votre enfant passe trop de temps devant les ecrans ? CubeCraft est la solution ! Des cubes magnetiques qui developpent la creativite et l intelligence spatiale. Decouvrez notre jouet certifie CE, concu pour les 8-12 ans. Offre de lancement -30% en ce moment !",
        "url": "https://cubecrafte.com/commander"
    },
    {
        "summary": "L alternative a Minecraft que tous les parents cherchent ! CubeCraft, ce sont de vrais cubes magnetiques 3D pour construire des mondes physiques. Jouet STEM, certifie CE, livraison rapide. Profitez de -30% sur votre premiere commande.",
        "url": "https://cubecrafte.com/commander"
    },
    {
        "summary": "Idee cadeau parfaite pour enfant 8-12 ans : les cubes magnetiques CubeCraft ! Jouet educatif qui remplace les ecrans, stimule la creativite et developpe l intelligence spatiale. Certifie CE, aimants N52 ultra-resistants. -30% de reduction !",
        "url": "https://cubecrafte.com/commander"
    },
    {
        "summary": "Jouet STEM recommande par les parents Montessori : CubeCraft ! Des cubes magnetiques pour construire, imaginer, apprendre. Vos enfants adorent, vous etes rassures. Offre speciale lancement : -30% sur tous les packs.",
        "url": "https://cubecrafte.com/blog"
    },
    {
        "summary": "Comment remplacer les ecrans sans conflit ? Avec CubeCraft ! Le jouet qui captive les enfants autant que leurs jeux video, mais qui developpe de vraies competences. Lire nos conseils sur notre blog.",
        "url": "https://cubecrafte.com/blog"
    },
]

today = datetime.date.today()
post = POSTS[today.toordinal() % len(POSTS)]

# Step 4: Create the post
location_name = "locations/" + LOCATION_ID
post_url = "https://mybusiness.googleapis.com/v4/" + account_name + "/" + location_name + "/localPosts"

post_body = json.dumps({
    "languageCode": "fr",
    "summary": post["summary"],
    "callToAction": {
        "actionType": "ORDER",
        "url": post["url"]
    },
    "topicType": "STANDARD"
}).encode("utf-8")

post_req = urllib.request.Request(
    post_url,
    data=post_body,
    headers={
        "Authorization": "Bearer " + access_token,
        "Content-Type": "application/json"
    }
)

try:
    with urllib.request.urlopen(post_req, timeout=30) as resp:
        result = json.loads(resp.read().decode("utf-8"))
        print("Post created: " + result.get("name", "ok"))
except urllib.error.HTTPError as e:
    body = e.read().decode("utf-8", errors="replace")
    print("Post error " + str(e.code) + ": " + body)
    sys.exit(1)
