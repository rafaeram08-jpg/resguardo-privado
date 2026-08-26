import os

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Just fix the specific strings I know are problematic in JSX text
    # e.g. "> ARQUITECTURA" should be "&gt; ARQUITECTURA"
    content = content.replace('> INSPECCIÓN_ACTIVA', '&gt; INSPECCIÓN_ACTIVA')
    content = content.replace('>> ROOT', '&gt;&gt; ROOT')
    content = content.replace('> ARQUITECTURA_DE_AUDITORÍA', '&gt; ARQUITECTURA_DE_AUDITORÍA')
    content = content.replace('> METODOLOGÍA_DEBUG', '&gt; METODOLOGÍA_DEBUG')
    content = content.replace('> DEPLOYMENT', '&gt; DEPLOYMENT')
    content = content.replace('> SELECT_MODULO', '&gt; SELECT_MODULO')
    
    content = content.replace('> {link.label}', '&gt; {link.label}')
    content = content.replace('>_ Fuentes:', '&gt;_ Fuentes:')
    
    with open(filepath, 'w') as f:
        f.write(content)

fix_file('src/App.tsx')
fix_file('src/components/GirosTabs.tsx')
fix_file('src/components/Sections.tsx')
