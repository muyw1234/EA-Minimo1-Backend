## Us de la IA

Eina: Gemini Model: Gemini 3 Flash

## Entrada 1: Error de tipat en la llista (LibroRef vs string)

- Pregunta: Com solucionar l'error de TypeScript on un objecte LibroRef no es pot assignar a un string en una llista.

- Prompt: "me puedes corregir el error que tengo Type 'string | LibroRef' is not assignable to type 'string'. Type 'LibroRef' is not assignable to type 'string'.ts(2322)
  historial-list.component.ts(93, 66): The expected type comes from property 'value' which is declared here on type '{ label: string; value: string; }' en la funcion getvisiblesfields?"

- Incoherències: La IA va suggerir una funció de visualització, però no va considerar inicialment que el camp fecha també causaria un error de tipat en ser un objecte Date i no un string.

- Solució: Vaig implementar una funció getLibrosDisplay que utilitza typeof per verificar si la dada és un string o un objecte. Manualment vaig afegir .toLocaleDateString() al camp de la data per
  complir amb el tipat string de la interfície de la llista.

## Entrada 2: Error de FormArray i selecció múltiple

- Pregunta: Correcció de l'error en intentar assignar un array de strings a un camp que espera un sol identificador de llibre.

- Prompt: "y este error? Type 'string[]' is not assignable to type 'string | LibroRef' [codi del component HistorialFormComponent adjunt]"

- Incoherències: El codi proporcionat per la IA encara feia referència a validacions d'usuari (Validators.email) i a la càrrega d'un model d'usuari que no formava part de la lògica d'historials.

- Solució: Vaig eliminar el FormArray del FormBuilder i el vaig substituir per un FormControl simple (libro: ['']). Vaig netejar els validadors sobrants i vaig ajustar la funció onToggleLibro perquè
  funcionés com un selector únic malgrat usar un checkbox.

## Entrada 3: Integració de la llista de llibres al formulari

- Pregunta: Com mostrar tots els llibres de la base de dades al formulari d'historial i permetre la seva selecció.

- Prompt: "me tiene que salir en el form todos los libros del backend y cuando clico el checobox puedo ahadir historiales"

- Incoherències: La IA va proposar un HTML genèric que no seguia les classes BEM del meu projecte (usuario-form\_\_label, etc.).

- Solució: Vaig adaptar manualment el template HTML per utilitzar el @Input() libros que ja venia del component pare i vaig corregir les classes CSS per mantenir la coherència visual amb la resta de
  l'aplicació.

## Entrada 4: Error de propietats nul·les (Runtime Error)

- Pregunta: Resolució de l'error de lectura de la propietat title quan el llibre és nul.

- Prompt: "Component update failed: Cannot read properties of null (reading 'title') TypeError: Cannot read properties of null (reading 'title') at \_HistorialListComponent.getLibrosDisplay"

- Incoherències: La IA va suggerir l'ús d'optional chaining, però no va preveure que el backend podria retornar una referència buida si el llibre hagués estat esborrat de la col·lecció principal.

- Solució: Vaig modificar la funció getLibrosDisplay per afegir una guarda inicial if (!historial.libro) que retorna un missatge per defecte ("Sin libro asignado"), evitant que tota la llista deixi de
  renderitzar-se.

## Entrada 5: Adaptació final de l'arquitectura i noms

- Pregunta: Correcció i neteja dels fitxers HTML per adaptar el mòdul d'usuaris al de historials.

- Prompt: "me puedes corregir los html corespondientes para ellos? [codis HTML d'usuaris adjunts]"

- Incoherències: El codi retornat barrejava termes com usuario i historial en les classes CSS i en els mètodes de crida (onRestore, usuario.name), el que hagués causat errors de compilació.

- Solució: Vaig reanomenar manualment totes les variables en el template (p. ex. de usuario a h o historial) i vaig ajustar els mètodes d'esborrat per apuntar a deletePermanent segons el servei
  d'historials creat.
