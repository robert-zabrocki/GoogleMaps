# Monitoring sieci wod-kan + Google Maps
Repozytorium, w którym się teraz znajdujesz, zawiera projekt stworzony przeze mnie w trakcie realizacji monitoringu sieci wod-kan dla Wodociągów Zachodniopomorskich w Goleniowie.

### Wymagania
System powinien ściągać dane z monitorowanych obiektów za pośrednictwem internetu. Sprowadzone informacje należy udostępniać urzytkownikom za pośrednictwem przeglądarek WWW. Rozlokowanie poszczególnych obiektów w terenie powinno być przedstawione za pomocą map Google.

### Koncepcja
Do realizacji zadania wytypowany został pakiet przemysłowego oprogramowania PROMOTIC, czeskiej firmy Microsys (https://www.promotic.eu). Pakiet umożliwił wykonanie łączności z poszczególnymi obiektami monitorowanej sieci. Nie oferaował w tamtym czasie prezentacji danych na mapach Google. Z tego powodu pojawiła się konieczność napisania "wrapper'a", który zapewni potrzebną funkcjonalność. "Wrapper" stworzony został w HTML, CSS i JavaScript.
