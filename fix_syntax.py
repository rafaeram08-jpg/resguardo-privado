import os

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Replace the text node occurrences without breaking HTML tags
    content = content.replace('> SELECT_MODULO', '{" > SELECT_MODULO"}')
    content = content.replace('> INSPECCIÓN_ACTIVA', '{" > INSPECCIÓN_ACTIVA"}')
    content = content.replace('>> ROOT', '{" >> ROOT"}')
    content = content.replace('> METODOLOGÍA_DEBUG', '{" > METODOLOGÍA_DEBUG"}')
    content = content.replace('> DEPLOYMENT', '{" > DEPLOYMENT"}')
    content = content.replace('>_ Fuentes:', '{" >_ Fuentes:"}')
    content = content.replace('> {link.label}', '{" > "} {link.label}')
    
    # Giros tabs specific
    content = content.replace('<span>></span>', '<span>{">"}</span>')
    content = content.replace('opacity-50">></span>', 'opacity-50\">{\">\"}</span>')
    
    with open(filepath, 'w') as f:
        f.write(content)

fix_file('src/App.tsx')
fix_file('src/components/GirosTabs.tsx')
fix_file('src/components/Sections.tsx')
