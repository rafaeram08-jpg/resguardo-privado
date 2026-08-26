with open("src/components/Sections.tsx", "r") as f:
    content = f.read()

content = content.replace("export function Capas() {", "import { Zap } from 'lucide-react';\n\nexport function Capas() {")
content = content.replace('ease: "easeOut"', 'ease: "easeOut" as any')

with open("src/components/Sections.tsx", "w") as f:
    f.write(content)
