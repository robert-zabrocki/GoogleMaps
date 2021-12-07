# Monitoring sieci wod-kan + Google Maps
Repozytorium, w którym się teraz znajdujesz, zawiera projekt stworzony przeze mnie w trakcie realizacji monitoringu sieci wod-kan dla Wodociągów Zachodniopomorskich w Goleniowie.

### Wymagania
System powinien ściągać dane z monitorowanych obiektów za pośrednictwem internetu. Sprowadzone informacje należy udostępniać urzytkownikom za pośrednictwem przeglądarek WWW. Rozlokowanie poszczególnych obiektów w terenie powinno być przedstawione za pomocą map Google.

### Koncepcja
Do realizacji zadania wytypowany został pakiet przemysłowego oprogramowania PROMOTIC, czeskiej firmy Microsys (https://www.promotic.eu). Pakiet umożliwił wykonanie łączności z poszczególnymi obiektami monitorowanej sieci. Nie oferaował w tamtym czasie prezentacji danych na mapach Google. Z tego powodu pojawiła się konieczność napisania "wrapper'a", który zapewni potrzebną funkcjonalność. "Wrapper" stworzony został w HTML, CSS i JavaScript.

### Sposób realizacji
Część serwerowa systemu wykonana została w oparciu o pakiet PROMOTIC. Wszystkie zgromadzone dane udostępnione zostały dla żądań obiektu XmlHttpRequest. Część frontend'owa stworzona została w oparciu o HTML, CSS i JavaScript. Odpowiedni skrypt okresowo (2.5s) wysyła zapytania do serwera. Otrzymane dane są przetwarzane i w postaci markerów umieszczane na mapach Google. Markery stworzone zostały w oparciu o pliki graficzne SVG. Jako że SVG ma format tekstowy (XML) bardzo łatwo manipulować wyglądem (kolorem, mrugniem, tekstem, ...) markera umieszczonego na mapie.
