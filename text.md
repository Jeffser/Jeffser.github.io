<style>#Discord-Activity-Fetcher{display: none;}</style>
<script>
    $.ajaxSetup({ cache: false });
    $.getJSON('https://api.jeffser.com/discord.json', function (data) {
        if (data.length > 0){
            $("#Discord-Activity-Fetcher").css('display', 'block');
            $("#Discord-Activity-Fetcher h2").attr("class", "");
        }
        data.forEach(element => {
            $("#status-wrapper").append(makeBigCard(element['details'], element['large_image_url'], element['details'], element['state'], element['name']))
        });
        makeSummary();
    });
    hljs.highlightAll();
</script>

# Bienvenidos a mi Página!

Hola soy Jeffry y les doy la bienvenida a la nueva versión de mi página web, si han visitado mi página antes se darán cuenta de que ahora es completamente distinta, decidí rehacerla un fin de semana para incorporar los nuevos conocimientos que he adquirido en los ultmos meses, al fin de al cabo ¿Que clase de programador se conforma con algo que funciona?, siempre hay que buscar como mejorarlo y hacerlo más lindo.

## Sobre mi

Bueno soy un estudiante de programación, actualmente me centro en el desarrollo de paginas de web tanto backend como frontend, pero honestamente prefiero el frontend, me encanta ponerle estilo a las paginas web, le da un toque personal. Además de eso también programo en Python, la mayoria del tiempo hago pequeños scripts para automatizar cosas que hago en mi vida diaria en la computadora.

En cuanto a mis hobbies, lo que más me gusta es escuchar música, es algo que puedo hacer mientras programo, juego y estudio, hay muchas canciones que me encantan y no dejo de escuchar a diario, además de eso también veo series coreanas, anime y una que otra serie occidental.

Si se preguntan por que no pongo una foto mía, no tengo ninguna buena.

<section id="Discord-Activity-Fetcher">
    <h2 class="dont-index">Que estoy haciendo?</h2>
    Powered by <a href="https://github.com/Jeffser/DiscordActivityFetcher">Discord Activity Fetcher</a>
    <div class="block" id="status-wrapper"></div>
</section>

## Cosas que me gustan ^^

<a href="/blog/musica" class="bigCard"><div><h2>Música</h2></div></a>

---

# Nueva Página Huh?

Bueno voy a explicar aquí exactamente que hay de nuevo en esta versión de mi página web.

## Markdown

Así es! Llevaba meses queriendo rehacer la página solo para integrarlo de la mejor forma posible, pero ¿Que es Markdown?

Markdown es una extensión para archivos de texto, no hay nada especial de ello pero muchas aplicaciones y scripts lo pueden leer para convertirlo en estructuras para documentos y páginas web, por ejemplo:

```MD
# Titulo Principal (H1)
## Titulo Secundario (H2)
### Subtitulo (H3)
*Texto en italic*
**Texto en negrita**
```

Quiero usarlo para mis distintas entradas de blogs y subpáginas por que este formato es el mismo que uso para mis documentos de la universidad, de la misma forma me acostumbre muy rapido a usarlo y de esa forma puedo escribir más, la alternativa sería escribir en HTML y realmente cansa despues de un rato.

Claro que Markdown no tiene todo lo que HTML tiene, lo bueno es que puedo convinar ambos y funciona sin problema.

También cabe aclarar que estoy usando el proyecto open source [Showdown](https://github.com/showdownjs/showdown) para hacer la conversión entre Markdown y HTML, si en algún momento quieren intentar hacer algo similar usen ese repositorio.

Si quieren ver el codigo MD directamente de cada pagina agreguen '/text' al final del url.

## Indice

Nuevo sistema hecho en casa, el indice automatico que ven a la derecha (si están en escritorio) es rellenado automaticamente según los headings y separadores en la página, también puede ser actualizado en cualquier momento haciendolo dinamico a cualquier cambio en la página, está realmente bien hecho no mentiré.

### Indice en Moviles?

Ahora mismo diferencio 'escritorio' y 'movil' según la relación aspecto de la pantalla, si es más alta que ancha se asume que es un movil, cuando la pantalla está en vertical se desactiva el dibujo del limón y el indice para que la lectura sea optima, pero puede que en futuro haga que el indice salga al hacer un gesto o algo por el estilo.

## Nuevo Sistema de Colores

Como deben de saber si han visitado mis páginas antes, me gusta mucho jugar con colores y paletas, en esta nueva versión he hecho mucho más facil el integrar los colores a los elementos.

Funciona teniendo un valor de hue por cada página web y despues se divide en otros hue por medio de operaciones matematicas, en el siguiente ejemplo se ve como se integra a un titulo el color.

```CSS
:root{
    --color-hue: 20;
    --color-hue-2: calc(360 - var(--color-hue));
    --color-hue-3: calc(360 - var(--color-hue) / 2);
    --color-hue-4: calc(360 - var(--color-hue) * 2);
}
section#main h1{
    color: hsl(var(--color-hue-2), 30%, 40%);
}
```

Como pueden observar el hue es usado en un hsl (Hue, Saturation, Lightness), de esta forma podré modificar los valores por separado de manera más efectiva a diferencia de Hex y RGB los cuales pueden ser más utiles en otras sircunstacias pero no en esta.

También puedo usar hsla() si necesito especificar el alpha (transparencia) de un color.

## Mejor Integración con HLJS

HLJS es una librería de javascript que permite resaltar palabras y valores dentro de las cajas de código de la página, en versiones anteriores de mi sitio web lo he usado pero en ciertos escenarios rompía la estructura la página. Ahora se adapta de mejor forma a distintas medidas y escenarios. Espero poder sacarle mayor provecho para hacer cosas más dinamicas en el futuro.

## Notificaciones

Si han visitado esta página en la versión beta se habrán encontrado con una notificación en la parte de abajo diciendolo. Este nuevo sistema de notificaciones me permitirá informar cosas sin tener que interrumpir al usuario con Rich Alerts, de igual forma siguen existiendo pero rehechas desde cero para que se adapten mejor al nuevo diseño, si quieren ver un ejemplo ingresen a 'Contacto', esa sección está hecha sobre Rich Alert.

## ~New~ Muse

⚠️Aún en desarrollo⚠️ New Muse es el remplazo de la sección Muse de [mi anterior sitio web](https://jeffser.github.io/old/code/muse), la nueva versión funciona sin la necesidad de mover al usuario a un url distinto haciendolo más comodo de usar.

<a class="block" style="cursor: pointer;" onclick="muse('GfrN-YxqZDk')">Click aquí para probar.</a>

## Nuevo Sistema de Dirección

Cuando ingresas a una página distinta el sitio web no se recarga, en cambio solo cambia el url y carga el texto, esto es util por que de esa forma no hay que cargar los scripts cada vez que se cambia el texto, de la misma forma eso permite que Muse se use como un reproductor de música legitimo, no es interrumpido sin importar cuantas paginas visites en el sitio.