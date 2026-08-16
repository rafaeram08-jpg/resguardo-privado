const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');

const seoEffect = `
  // Dynamic SEO Meta Tags per Section
  useEffect(() => {
    const seoData: Record<string, { title: string, desc: string }> = {
      'top': { 
        title: 'Resguardo | Cumplimiento LFPIORPI', 
        desc: 'Documentación de cumplimiento para negocios que realizan Actividades Vulnerables en México. Evite multas y asegure su continuidad.' 
      },
      'alcance': { 
        title: 'Giros Obligados | Resguardo', 
        desc: 'Conozca si su empresa se considera Actividad Vulnerable según el Artículo 17 de la LFPIORPI. Inmobiliarias, agencias, joyerías y más.' 
      },
      'comparativa': { 
        title: 'Alternativas de Cumplimiento | Resguardo', 
        desc: 'Comparamos las diferentes formas de cumplir con la Ley Antilavado: desde no hacer nada hasta contratar especialistas o software.' 
      },
      'calendario': { 
        title: 'Fechas Clave SAT | Resguardo', 
        desc: 'Las fechas críticas de la LFPIORPI. Conozca cuándo debe entregar su Manual de Políticas Internas y Metodología de Evaluación de Riesgos.' 
      },
      'diagnostico': { 
        title: 'Diagnóstico LFPIORPI | Resguardo', 
        desc: 'Evalúe el nivel de cumplimiento de su negocio en solo dos minutos con nuestro cuestionario interactivo y confidencial.' 
      },
      'entregables': { 
        title: 'Alcance y Honorarios | Resguardo', 
        desc: 'Transparencia en nuestros entregables y costos. Conozca el detalle del Manual de Políticas y la Metodología de Evaluación de Riesgos.' 
      },
      'glosario': { 
        title: 'Glosario Antilavado | Resguardo', 
        desc: 'Términos clave sobre cumplimiento normativo, UIF, SAT y Prevención de Lavado de Dinero explicados de forma sencilla.' 
      },
      'contacto': { 
        title: 'Solicitar Diagnóstico | Resguardo', 
        desc: 'Hablemos 15 minutos sin costo. Evaluamos si su giro entra en el alcance de la ley y determinamos cómo podemos ayudarle a cumplir.' 
      }
    };

    const currentSeo = seoData[activeTab] || seoData['top'];
    
    // Update Title
    document.title = currentSeo.title;
    
    // Helper to update meta tags
    const updateMeta = (nameAttr: string, nameValue: string, content: string) => {
      let el = document.querySelector(\`meta[\${nameAttr}="\${nameValue}"]\`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(nameAttr, nameValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('name', 'description', currentSeo.desc);
    updateMeta('property', 'og:title', currentSeo.title);
    updateMeta('property', 'og:description', currentSeo.desc);
    
    // Update URL Hash for shareability (optional but good for SEO)
    if (activeTab && activeTab !== 'top') {
      window.history.replaceState(null, '', \`#\${activeTab}\`);
    } else {
      window.history.replaceState(null, '', window.location.pathname);
    }
    
  }, [activeTab]);
`;

app = app.replace("  // Intersection Observer Effect", seoEffect + "\n  // Intersection Observer Effect");

fs.writeFileSync('src/App.tsx', app);
