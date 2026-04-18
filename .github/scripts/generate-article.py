import os, json, datetime, urllib.request, urllib.error, sys

TOPICS = [
    ("alternative-minecraft-enfant", "Alternative a Minecraft pour les enfants : les meilleurs jouets de construction 3D", "Votre enfant est fan de Minecraft ? Decouvrez les meilleures alternatives physiques qui developpent les memes competences creatives."),
    ("jouet-educatif-6-12-ans", "Jouet educatif 6-12 ans : notre selection 2025", "Quels jouets educatifs choisir pour les 6-12 ans ? Notre guide complet pour stimuler creativite et intelligence."),
    ("comment-limiter-temps-ecran-enfant", "Comment limiter le temps d ecran de son enfant sans conflit", "Strategies concretes et jouets alternatifs pour reduire le temps d ecran de facon naturelle et sans larmes."),
    ("jouets-stem-enfant", "Jouets STEM : lesquels choisir pour votre enfant en 2025", "Les jouets STEM developpent les competences du futur. Notre guide pour choisir les meilleurs selon l age."),
    ("idee-cadeau-enfant-8-ans", "Idee cadeau enfant 8 ans : 10 idees originales en 2025", "Trouver le cadeau parfait pour un enfant de 8 ans. Voici 10 idees testees et approuvees."),
    ("cubes-magnetiques-guide", "Cubes magnetiques : guide complet 2025", "Tout savoir sur les cubes magnetiques : comment les choisir et pourquoi les enfants les adorent."),
    ("jouet-montessori-guide", "Jouet Montessori : qu est-ce que c est et comment choisir", "La pedagogie Montessori en pratique : quels jouets favorisent vraiment l autonomie de votre enfant ?"),
    ("jeux-construction-enfant", "Jeux de construction pour enfants : le guide complet 2025", "Blocs, cubes, LEGO, magnetiques... Quel jeu de construction choisir pour votre enfant ?"),
    ("cadeau-noel-enfant-10-ans", "Cadeau Noel enfant 10 ans : 12 idees pour un Noel memorable", "Trouver le bon cadeau de Noel pour un enfant de 10 ans. Notre selection testee."),
    ("developpement-intelligence-spatiale", "Comment developper l intelligence spatiale de votre enfant", "L intelligence spatiale est essentielle pour les maths. Activites et jouets pour la stimuler des 6 ans."),
]

os.makedirs("content/blog", exist_ok=True)
existing = set(os.listdir("content/blog"))
print(f"Existing articles: {existing}")

chosen = None
for slug, title, desc in TOPICS:
    if f"{slug}.mdx" not in existing:
        chosen = (slug, title, desc)
        break

if not chosen:
    print("All topics already generated.")
    sys.exit(0)

slug, title, desc = chosen
today = datetime.date.today().isoformat()
print(f"Generating: {slug}")

prompt = (
    "Tu es un expert en redaction SEO pour un site de jouets educatifs francais.\n\n"
    f"Ecris un article de blog complet en francais (1000-1200 mots) pour cubecrafte.com.\n\n"
    f"Sujet : {title}\n\n"
    "Regles :\n"
    "- Ecris UNIQUEMENT le contenu (pas de frontmatter YAML)\n"
    "- Utilise des titres H2 et H3 avec ## et ###\n"
    "- Inclus au moins 2 liens : [Decouvrir CubeCraft](/commander)\n"
    "- Mentionne CubeCraft comme solution recommandee\n"
    "- Ton chaleureux, pratique, pour les parents francais\n"
    "- Inclus des listes a puces\n"
    "- Termine par un appel a l action vers /commander"
)

api_key = os.environ.get("OPENAI_API_KEY", "")
if not api_key:
    print("ERROR: OPENAI_API_KEY not set")
    sys.exit(1)

payload = json.dumps({
    "model": "gpt-4o-mini",
    "messages": [{"role": "user", "content": prompt}],
    "max_tokens": 2000,
    "temperature": 0.7
}).encode("utf-8")

req = urllib.request.Request(
    "https://api.openai.com/v1/chat/completions",
    data=payload,
    headers={
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
)

try:
    with urllib.request.urlopen(req, timeout=60) as resp:
        data = json.loads(resp.read().decode("utf-8"))
except urllib.error.HTTPError as e:
    print(f"OpenAI API error: {e.code} {e.read().decode()}")
    sys.exit(1)

content = data["choices"][0]["message"]["content"]

title_safe = title.replace('"', '\\"')
desc_safe = desc.replace('"', '\\"')
frontmatter = f'---\ntitle: "{title_safe}"\ndescription: "{desc_safe}"\ndate: "{today}"\nslug: "{slug}"\n---'

with open(f"content/blog/{slug}.mdx", "w", encoding="utf-8") as f:
    f.write(frontmatter + "\n\n" + content)

print(f"Generated: content/blog/{slug}.mdx")
