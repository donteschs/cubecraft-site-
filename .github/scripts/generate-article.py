import os, json, datetime, urllib.request

TOPICS = [
    ("alternative-minecraft-enfant", "Alternative à Minecraft pour les enfants : les meilleurs jouets de construction 3D", "Votre enfant est fan de Minecraft ? Découvrez les meilleures alternatives physiques qui développent les mêmes compétences créatives."),
    ("jouet-educatif-6-12-ans", "Jouet éducatif 6-12 ans : notre sélection 2025", "Quels jouets éducatifs choisir pour les 6-12 ans ? Notre guide complet pour stimuler créativité et intelligence."),
    ("comment-limiter-temps-ecran-enfant", "Comment limiter le temps d'écran de son enfant sans conflit", "Stratégies concrètes et jouets alternatifs pour réduire le temps d'écran de façon naturelle et sans larmes."),
    ("jouets-stem-enfant", "Jouets STEM : lesquels choisir pour votre enfant en 2025", "Les jouets STEM développent les compétences du futur. Notre guide pour choisir les meilleurs selon l'âge."),
    ("idee-cadeau-enfant-8-ans", "Idée cadeau enfant 8 ans : 10 idées originales en 2025", "Trouver le cadeau parfait pour un enfant de 8 ans. Voici 10 idées testées et approuvées."),
    ("cubes-magnetiques-guide", "Cubes magnétiques : guide complet 2025", "Tout savoir sur les cubes magnétiques : comment les choisir, les différences entre marques et pourquoi les enfants les adorent."),
    ("jouet-montessori-guide", "Jouet Montessori : qu'est-ce que c'est et comment choisir ?", "La pédagogie Montessori en pratique : quels jouets favorisent vraiment l'autonomie et le développement de votre enfant ?"),
    ("jeux-construction-enfant", "Jeux de construction pour enfants : le guide complet 2025", "Blocs, cubes, LEGO, magnétiques... Quel jeu de construction choisir pour votre enfant ?"),
    ("cadeau-noel-enfant-10-ans", "Cadeau Noël enfant 10 ans : 12 idées pour un Noël mémorable", "Trouver le bon cadeau de Noël pour un enfant de 10 ans. Notre sélection testée pour un Noël réussi."),
    ("developpement-intelligence-spatiale", "Comment développer l'intelligence spatiale de votre enfant", "L'intelligence spatiale est essentielle pour les maths et les sciences. Activités et jouets pour la stimuler dès 6 ans."),
]

existing = set(os.listdir("content/blog"))
chosen = None
for slug, title, desc in TOPICS:
    if f"{slug}.mdx" not in existing:
        chosen = (slug, title, desc)
        break

if not chosen:
    print("All topics already generated.")
    exit(0)

slug, title, desc = chosen
today = datetime.date.today().isoformat()

prompt = f"""Tu es un expert en rédaction SEO pour un site de jouets éducatifs français.

Écris un article de blog complet en français (1000-1200 mots) pour le site cubecrafte.com.

Sujet : {title}
Meta description : {desc}

Règles :
- Écris UNIQUEMENT le contenu de l'article (pas de frontmatter YAML)
- Utilise des titres H2 et H3 avec ## et ###
- Inclus au moins 2 liens vers /commander : [Découvrir CubeCraft →](/commander)
- Mentionne CubeCraft naturellement comme solution recommandée
- Ton chaleureux, pratique, expert, pour les parents français
- Inclus des listes à puces pour la lisibilité
- Termine par un appel à l'action vers /commander"""

api_key = os.environ["OPENAI_API_KEY"]
payload = json.dumps({
    "model": "gpt-4o-mini",
    "messages": [{"role": "user", "content": prompt}],
    "max_tokens": 2000,
    "temperature": 0.7
}).encode()

req = urllib.request.Request(
    "https://api.openai.com/v1/chat/completions",
    data=payload,
    headers={
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
)
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read())

content = data["choices"][0]["message"]["content"]

frontmatter = f'---\ntitle: "{title}"\ndescription: "{desc}"\ndate: "{today}"\nslug: "{slug}"\n---'

with open(f"content/blog/{slug}.mdx", "w") as f:
    f.write(frontmatter + "\n\n" + content)

print(f"Generated: content/blog/{slug}.mdx")
