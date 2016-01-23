# Kumpanium
Komunitní web pro správu pivního účetnictví a šíření dobrých zpráv.

<pre>
root/
├── app/				← php server postavený na Nette 
│	├── FutroModule		← modul pro REST API obsahuje
│	│						rutiny pro jednotlivé resource 
│	├── module			← pár obslužných modulů
│	├── presenters		← generuje HTML ze šablon pro 		
│	│						statické stránky a Angular
│	├── router			← nastavuje URL routy
│	├── templates		← šablony pro HTML a Angular
├── src/				
│	├── images			← obrázky
│	├── scripts			← JS Angular scripty
├── www/				← optimalizované výsledky pro Web
							připravené pomocí gulp.js
</pre>
