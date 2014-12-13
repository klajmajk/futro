kořenová složka aplikace je
/futro/www/

url pro přístup k restfull API
/futro/www/api/v1/<item>[/<id>]...

přístup do databáze přes SQL správce Adminer
/futro/www/adminer

pracovní soubory API jsou v ApiModule
/futra/app/ApiModule/

dělí se na podsložky model, presenter, template (analogie Model->Controller->View)
API si momentálně vystačí jen s presentery, jinde nic není

v presenterech je univerzální předek BasePresenter, od kterého všichni dědí,
to je tak nějak celé...

konfigurace databáze (jméno:heslo) se dělá v app/config/config.local.neon
na tento soubor by bylo fajn udělat .gitignore, či jak se to jmenuje,
jestli teda používáš jiné heslo...