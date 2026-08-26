with open("src/App.tsx", "r") as f:
    content = f.read()

content = content.replace("Read the announcement ->", "Read the announcement -&gt;")

with open("src/App.tsx", "w") as f:
    f.write(content)
