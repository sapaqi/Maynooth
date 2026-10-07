# Maynooth DZ — przekazanie do pracy lokalnej

Stan: mapa SVG z dnia 3 października 2026, z prostokątnym tłem otoczenia.
To projekt mapy, osobny od wcześniejszej kompletnej witryny Maynooth DZ.

## Uruchomienie
Otwórz index.html w Chrome lub Edge. Działa lokalnie bez Mapbox, tokenów i internetu. Kółko myszy przybliża, przeciąganie przesuwa, przycisk procentów resetuje. Można też uruchomić serwer: python -m http.server 8000 i otworzyć http://localhost:8000.

## Pliki
- index.html — samodzielny podgląd SVG z zoomem.
- output/Maynooth-DZ-perspective-v1.svg — aktualny, prawdziwy wektor, bez rastra.
- output/Maynooth-DZ-preview.html — ten sam podgląd co index.html.
- preview.png — statyczny podgląd.
- upload/01-Maynooth-DZ.geojson — dostarczona granica DZ, EPSG:2157.
- work-dz/osm.json — geometria OSM użyta dla DZ.
- work-dz/context-osm.json — szersza geometria OSM otoczenia.
- work-dz/build.py — generator szczegółowej mapy DZ.
- work-dz/package.py — opakowanie pierwszej wersji i podglądu.
- work-dz/add-context.py — płaskie, stonowane otoczenie oraz responsywny kadr.
- work-dz/fetch.py i fetch-context.py — pobieranie z Overpass; przy dalszej edycji używaj zapisanych danych, bez ponownego pobierania.

## Ustalenia z użytkownikiem
- Stała perspektywa z referencji Mapbox: bearing około -12,8°, pitch około 55°. Projekcja jest przybliżeniem widoku Mapbox.
- Widok 100% ma pokazywać całą strefę; dalej zoom i przesuwanie.
- Bez etykiet, nazw i pinów na obecnym etapie.
- Geometria ulic, budynków, kanału, rzek, torów, parkingów i zieleni ma odpowiadać rzeczywistości.
- Zieleń ma być upraszczana do przyjemnych skupisk, zamiast tysięcy drzew. Obecna zieleń jest jeszcze robocza.
- DZ: kolory, bryły budynków. Poza DZ: płaskie, wyszarzone otoczenie, prostokątny kadr 16:9.
- SVG około 7,6 MB. Otoczenie dodało około 0,6 MB.
- Większość wysokości budynków jest szacunkowa (domyślnie 7 m). Dachy i zabytki nie są jeszcze wiernymi modelami architektury.
- Użytkownik zaakceptował podstawę mapy jako dobry początek. Dalsza praca dotyczy dopracowania wyglądu i konkretnych detali po otrzymaniu uwag.
- Nie zmieniać kompletnej witryny Maynooth DZ ani nie publikować przy edycji tego lokalnego projektu mapy, o ile użytkownik tego nie zleci.

## Odtworzenie mapy ze źródeł
W katalogu projektu, po zainstalowaniu Pythona i zależności z requirements.txt:
1. python work-dz/build.py
2. python work-dz/package.py
3. Skopiuj output/Maynooth-DZ-perspective-v1.svg do work-dz/zone-original.svg (zastąp zapis bazowej mapy przed dodaniem otoczenia).
4. python work-dz/add-context.py
5. Skopiuj output/Maynooth-DZ-preview.html do index.html.
Aktualna gotowa mapa jest już w paczce; nie trzeba jej generować, żeby kontynuować edycję.

## Źródło i atrybucja
© OpenStreetMap contributors, ODbL. Zachowaj atrybucję i stosowne warunki ODbL przy dystrybucji danych. https://www.openstreetmap.org/copyright
Referencje Mapbox służyły do wyglądu i perspektywy; geometria pochodzi z OSM.

## Aktualizacja przejęcia
Poprawiono kolizję globalnej zmiennej `top` z window.top: nazwa `frameTop`. Poprawka w obu podglądach i generatorze otoczenia.

## 2026-10-04 — ciągłe drogi
Scalono nakładające się poligony dróg i ścieżek, usuwając wewnętrzne obrysy. Mosty zachowują warstwę nad wodą i torami. Pozostałe warstwy i obsługa zoomu bez zmian. Poprawka dotyczy oficjalnej mapy; test zamku pozostaje osobny. Skrypt zmiany: road-fix/smooth.py w katalogu roboczym nadrzędnym.

## 2026-10-04 — zamek i uniwersytet
Wkomponowano oba ilustracyjne SVG zamiast odpowiadających im brył i cieni. Uniwersytet wydłużony dodatkowymi przęsłami, z większymi dziedzińcami, bez rozciągania grafiki w poziomie. Dopasowanie wyłącznie jednolitą skalą i obrotem. Zachowano ciągłe drogi i zoom. Podgląd zawiera przycisk zbliżenia na oba obiekty. Źródło edycji: landmark-integration/build.py w nadrzędnym katalogu roboczym.

## 2026-10-04 — głębia przy uniwersytecie
Południowe budynki przeniesiono przed ilustrację uniwersytetu (university-south-foreground). Zewnętrzną zieleń ogranicza wektorowe przycięcie university-trim. Dziedzińce i położenie obiektów bez zmian. Skrypt: landmark-integration/depth.py.

## Cofnięcie korekty głębi
Na prośbę użytkownika przywrócono wersję bez university-trim i bez university-south-foreground. Uniwersytet ponownie ma pierwotną zieleń i znajduje się nad zwykłymi bryłami.

## 2026-10-05 — Glenroyal
Dodano SVG Glenroyal Hotel & Leisure Club, zastępując bryły OSM 49509240 i 49509298 z cieniami. Zachowano drogi, parkingi i centrum handlowe. Osobny przycisk Glenroyal w podglądzie. Skrypt: glenroyal/integrate.py.

## 2026-10-06 — Harbour Field
Dodano lekkie wektorowe wyposażenie placu zabaw (wieżyczki, zjeżdżalnie, huśtawki, karuzela, ławki i płot), jedną bramkę oraz dwa małe łabędzie w kanale po lewej. Zachowano geometrię pola i ścieżek. Usunięto biały obrys boiska. Nowy przycisk Harbour Field. Skrypt harbour/integrate.py; finalna korekta obrysu dopasowana po współrzędnych w sports.

## Harbour Field — ilustracja zastępuje wersję schematyczną
Zaakceptowany raster exec-e055ad50-81b2-4b70-b2d7-b731c2d2f408.png zwektoryzowano jako output/Harbour-Field-light.svg (2022 ścieżki, 484 KB). Nowa grupa harbour-field-landmark, transform matrix(.17 0 .035 .205 2022 1170). Poprzednia grupa usunięta wraz ze starymi powierzchniami sports pod ilustracją. Łabędzie teraz na trawie. Skrypty harbour/trace.py, place-illustration.py i finalize.py; zapisany harbour/proposed.svg zawiera ostateczny transform.

## 2026-10-06 — St Mary’s Catholic Church
Zaakceptowana ilustracja exec-e53fc962-82f0-4fae-84df-84b5a9cccb69.png zwektoryzowana: St-Marys-Church-light.svg, 2617 ścieżek, 588 KB. Usunięto 18 kształtów bryły i cienia OSM 39393986. Grupa st-marys-church-landmark, translate(1920 957) scale(.055), jednolita skala bez deformacji. Perspektywa ilustracyjna zbliżona do mapy, nie ścisła projekcja kamery. Dodano przycisk zbliżenia i PNG. Skrypty stmary/trace.py, integrate.py, finalize.py.

## 2026-10-06 — Scouts Geraldine Hall
Odtworzono zaakceptowany raster exec-e5795e6b-86c9-44d2-bdce-4c0f343fd36a.png; wektor Scouts-Geraldine-Hall-light.svg (857 ścieżek, 176 KB). Zastąpiono budynki OSM 881645697 i 41720759 wraz z cieniami. Grupa scouts-geraldine-hall-landmark, translate(2028 1183) scale(.045). Harbour Field zmniejszono o 5% względem kotwicy 2210,1290: matrix(.1615 0 .03325 .19475 2031.4 1176). Dodano przycisk Scouts Hall i wspólny podgląd PNG. Skrypty scouts/trace.py, integrate.py, finalize.py.

## Scouts Hall — krótsza hala i większy landmark
Raster exec-efadff6d-55c6-4765-9790-c0d2484118ff.png: hala skrócona z sześciu do czterech okien, nieco wyższy kąt widzenia. Nowy SVG: 999 ścieżek, 208 KB. Landmark powiększony i przesunięty na zachód, bliżej drogi: translate(2018 1182) scale(.058). Harbour Field bez dalszych zmian. Skrypty scouts/trace-v2.py i revise.py.

## 2026-10-06 — Community Care Unit, punkt 15
Zwektoryzowano zaakceptowany widok bardziej z góry exec-56c2eb70-a067-4fce-be33-903b7e0ac7e2.png: Community-Care-Unit-light.svg, 1960 ścieżek, 449530 bajtów. Zastąpiono OSM relation 410220 Community Unit (31 kształtów bryły i cienia). UWAGA: pobliski Health Centre 410221 jest innym budynkiem i pozostaje bez zmian. Grupa community-care-unit-landmark: translate(1980 1243) scale(.060). Dodano przycisk zbliżenia i PNG. Skrypty community/trace.py, integrate.py, finalize.py.

## 2026-10-07 — North Campus, punkt 4
Zaakceptowany raster TSI Building exec-dd638413-305c-49d3-a80d-6ff73f5e07bb.png zamieniono na Maynooth-University-North-Campus-light.svg (1349 ścieżek, 238831 bajtów). Usunięto 34 kształty OSM 1120450486 wraz z cieniem. Grupa maynooth-north-campus-landmark: translate(1417 918) scale(.128), bez rozciągania. Podgląd PNG i przycisk North Campus. SVG, HTML, index i preview zsynchronizowane. Bez rasterów osadzonych w SVG. Skrypty north-campus/trace.py, integrate.py, finalize.py.
