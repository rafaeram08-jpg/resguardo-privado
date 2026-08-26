with open("src/components/GirosTabs.tsx", "r") as f:
    content = f.read()

content = content.replace('<span className="text-[var(--accent-blue)] opacity-50">opacity-50">>gt;</span>', '<span className="text-[var(--accent-blue)] opacity-50">&gt;</span>')

with open("src/components/GirosTabs.tsx", "w") as f:
    f.write(content)
