import os, sys, json, datetime, urllib.request, urllib.error

TOPICS = [
    ("comment-limiter-temps-ecran-enfant", "Comment limiter le temps d ecran de son enfant sans conflit", "Strategies concretes et jouets alternatifs pour reduire le temps d ecran de facon naturelle et sans larmes."),
    ("jouet-stem-enfant-2026", "Jouets STEM : lesquels choisir pour votre enfant en 2026", "Les jouets STEM developpent les competences du futur. Notre guide pour choisir les meilleurs selon l age."),
    ("idee-cadeau-enfant-8-ans", "Idee cadeau enfant 8 ans : 10 idees originales en 2025", "Trouver le cadeau parfait pour un enfant de 8 ans. Voici 10 idees testees et approuvees."),
    ("cubes-magnetiques-guide", "Cubes magnetiques : guide complet 2025", "Tout savoir sur les cubes magnetiques : comment les choisir et pourquoi les enfants les adorent."),
    ("jouet-montessori-guide", "Jouet Montessori : qu est-ce que c est et comment choisir", "La pedagogie Montessori en pratique : quels jouets favorisent vraiment l autonomie de votre enfant ?"),
    ("jeux-construction-enfant", "Jeux de construction pour enfants : le guide complet 2025", "Blocs, cubes, LEGO, magnetiques... Quel jeu de construction choisir pour votre enfant ?"),
    ("cadeau-noel-enfant-10-ans", "Cadeau Noel enfant 10 ans : 12 idees pour un Noel memorable", "Trouver le bon cadeau de Noel pour un enfant de 10 ans. Notre selection testee."),
    ("developpement-intelligence-spatiale", "Comment developper l intelligence spatiale de votre enfant", "L intelligence spatiale est essentielle pour les maths. Activites et jouets pour la stimuler des 6 ans."),
    ("alternative-minecraft-enfant", "Alternative a Minecraft pour les enfants : les meilleurs jouets de construction 3D", "Votre enfant est fan de Minecraft ? Decouvrez les meilleures alternatives physiques qui developpent les memes competences creatives."),
    ("jouet-educatif-6-12-ans", "Jouet educatif 6-12 ans : notre selection 2025", "Quels jouets educatifs choisir pour les 6-12 ans ? Notre guide complet pour stimuler creativite et intelligence."),
    ("cadeau-garcon-6-ans", "Cadeau garcon 6 ans : 10 idees qui font briller les yeux", "Trouver un cadeau original pour un garcon de 6 ans. Notre selection de jouets educatifs et amusants."),
    ("jouet-construction-fille-7-ans", "Jouet de construction pour fille 7 ans : notre guide 2026", "Les filles adorent construire aussi. Decouvrez les meilleurs jouets de construction adaptes aux filles de 7 ans."),
    ("bienfaits-jeu-libre-enfant", "Les bienfaits du jeu libre pour le developpement de l enfant", "Pourquoi laisser votre enfant jouer librement est essentiel. Science et conseils pratiques pour les parents."),
    ("jouet-anti-stress-enfant", "Jouet anti-stress pour enfant : lesquels choisir vraiment", "Face au stress scolaire, quels jouets aident vraiment les enfants a se detendre ? Notre guide sans gadgets inutiles."),
    ("cadeau-anniversaire-fille-9-ans", "Cadeau anniversaire fille 9 ans : les idees qui font la difference", "Notre selection de cadeaux d anniversaire pour une fille de 9 ans curieuse et creative."),
    ("jouet-magnetique-vs-lego", "Jouets magnetiques vs LEGO : lequel choisir pour votre enfant", "Comparatif complet entre jeux magnetiques et LEGO. Avantages, prix, age recommande — on vous aide a choisir."),
    ("activite-rainy-day-enfant", "Activites pour les jours de pluie : 12 idees sans ecran", "Il pleut ? Voici 12 activites creatives et educatives pour occuper vos enfants sans tablette ni tele."),
    ("comment-choisir-jouet-educatif", "Comment choisir un jouet vraiment educatif : le guide des parents", "Tous les jouets se disent educatifs. Comment distinguer le vrai du faux ? Notre methode en 5 criteres."),
    ("jeu-construction-3d-cerveau-enfant", "Comment les jeux de construction 3D developpent le cerveau de votre enfant", "Neurosciences et jeux de construction : ce que la science dit sur l impact des cubes magnetiques sur le QI spatial."),
    ("cadeau-depart-ecole-primaire", "Cadeau rentree scolaire enfant : preparer la rentree avec le bon jouet", "La rentree approche. Quels jouets educatifs offrir pour booster la confiance et la creativite de votre enfant."),
]

os.makedirs("content/blog", exist_ok=True)
existing = set(os.listdir("content/blog"))
print("Existing articles: " + str(existing))

chosen = None
for slug, title, desc in TOPICS:
    if (slug + ".mdx") not in existing:
        chosen = (slug, title, desc)
        break

if not chosen:
    print("All topics already generated.")
    sys.exit(0)

slug, title, desc = chosen
today = datetime.date.today().isoformat()
print("Generating: " + slug)

api_key = os.environ.get("OPENAI_API_KEY", "")
if not api_key:
    print("ERROR: OPENAI_API_KEY not set")
    sys.exit(1)

prompt = (
    "Tu es un expert en redaction SEO pour un site de jouets educatifs francais. "
    "Ecris un article de blog complet en francais (1000-1200 mots) pour cubecrafte.com. "
    "Sujet : " + title + ". "
    "Regles : "
    "Ecris UNIQUEMENT le contenu sans frontmatter YAML. "
    "Utilise des titres H2 et H3 avec ## et ###. "
    "Inclus au moins 2 liens vers /commander avec le texte Decouvrir CubeCraft. "
    "Mentionne CubeCraft comme solution recommandee. "
    "Ton chaleureux et pratique pour les parents francais. "
    "Inclus des listes a puces. "
    "Termine par un appel a l action vers /commander."
)

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
        "Authorization": "Bearer " + api_key,
        "Content-Type": "application/json"
    }
)

try:
    with urllib.request.urlopen(req, timeout=90) as resp:
        data = json.loads(resp.read().decode("utf-8"))
except urllib.error.HTTPError as e:
    body = e.read().decode("utf-8", errors="replace")
    print("OpenAI API error " + str(e.code) + ": " + body)
    sys.exit(1)
except Exception as e:
    print("Request failed: " + str(e))
    sys.exit(1)

content = data["choices"][0]["message"]["content"]

title_safe = title.replace('"', '\\"')
desc_safe = desc.replace('"', '\\"')
frontmatter = '---\ntitle: "' + title_safe + '"\ndescription: "' + desc_safe + '"\ndate: "' + today + '"\nslug: "' + slug + '"\n---'

out_path = "content/blog/" + slug + ".mdx"
with open(out_path, "w", encoding="utf-8") as f:
    f.write(frontmatter + "\n\n" + content)

print("Generated: " + out_path)
