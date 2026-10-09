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

## 2026-10-07 — Maynooth Community Church, punkt 10
Zachowany raster exec-eb0fc046-aff2-4bcd-9c5b-26bf217815a2.png zamieniono na Maynooth-Community-Church-light.svg (1278 ścieżek, 244920 bajtów). Przezroczystość uproszczona do maski alfa, bez zewnętrznej poświaty. Zastąpiono 33 kształty bryły OSM 1315884245 wraz z cieniem. Grupa maynooth-community-church-landmark: translate(2758 1027) scale(.057). Parking i drogi zachowane. Nie mylić z St Mary’s Church (osobny landmark). Dodano przycisk Community Church i PNG. Mapa zawiera dziewięć ilustracyjnych landmarków, bez osadzonych rasterów. Skrypty mcc/trace.py, integrate.py, finalize.py.

## 2026-10-07 — Carton Avenue, punkt 5
Zwektoryzowano zaakceptowany raster exec-60550cf6-20c2-4427-ab0b-deb3d6de4c13.png (1157 ścieżek, źródło 271095 bajtów). Carton-Avenue-light.svg składa się z pięciu powtórzeń fragmentu źródła jako SVG use/xlink:href, drobniejsze drzewa bez rozciągania. Szpalery ciągną się między końcami way OSM 28922499: lokalne (2274.6715,1053.2075) do (3213.5089,912.5604). Grupa carton-avenue-landmark, obrót -8.520108°, skala .21575321. Zachowano sąsiednie budynki. Podgląd Carton-Avenue-map-preview.png; 10 ilustracyjnych landmarków; map SVG/HTML/index zsynchronizowane. Skrypty carton/trace.py, integrate.py, finalize.py. Starsze ZIP v11 pozostają wersjami sprzed Carton Avenue.

## 2026-10-07 — Lidl, punkt 11
Ilustracja exec-5b3eb83c-8c46-484e-b0b3-cb323a28069e.png zwektoryzowana jako Lidl-Maynooth-light.svg, 976 ścieżek i 186578 bajtów. Zastąpiono 9 kształtów bryły i cienia OSM 31574825. Grupa lidl-maynooth-landmark: translate(1900 2010) scale(.100). Długi budynek z panelami PV i wejściem od południa. Parking i drogi zachowane. Podgląd Lidl-Maynooth-map-preview.png oraz przycisk Lidl; 11 ilustracyjnych landmarków w zsynchronizowanych SVG/HTML/index. Skrypty lidl/trace.py, integrate.py, finalize.py.

## Lidl — korekta frontu
Na prośbę użytkownika poprawiono niespójną geometrię frontu. Raster exec-a8eddde3-1c03-4450-a2cf-dd0e8cd50c6e.png: prosta planar­na elewacja, prosty daszek, wejście w tej samej płaszczyźnie. SVG 960 ścieżek, 177041 bajtów. Pozycja i skala landmarku bez zmian. Wersja mapy v14; skrypty lidl/trace-v2.py, revise.py.

## Lidl — wejście na zachodniej ścianie przy SW
Na podstawie nowych zdjęć S/W wejście i wózki przeniesiono w rejon SW po stronie zachodniej; południowa ściana ma pas okien z żaluzjami, logo i szczyt, bez głównego wejścia. Wschodnia długa ściana uproszczona do pełnej elewacji. Raster exec-74273db9-5a53-4578-8b24-7ca9c5274599.png. Pozycja i skala bez zmian; mapa v15.

## 2026-10-07 — Fire Station, oznaczenie użytkownika 15a
Ilustracja exec-4d4f2e24-8228-4107-ad09-64e67a1532d7.png zwektoryzowana: Maynooth-Fire-Station-light.svg, 588 ścieżek przed usunięciem ewentualnych czarnych artefaktów tła. Nowa grupa maynooth-fire-station-landmark translate(2050 2095) scale(.080), na terenie OSM amenity fire_station 1446588260 obok Lidla. Trzy czerwone bramy od południa. W cache nie było bryły nowej strażnicy, więc nie usuwano budynków. Podgląd PNG i przycisk Fire Station; 12 ilustracyjnych landmarków; mapa v16. Skrypty firestation/trace.py, integrate.py, finalize.py.

## 2026-10-07 — Fire Station + MCC, v17
Strażnica: nowy raster exec-85f9ce1f-85ea-4a6b-b3af-43c5686dc6e7.png z wyższym widokiem, bez asfaltu/murku/podłoża; prawa część ujednolicona do jednego niskiego skrzydła. Nowy transform translate(2042 2084) scale(.092), skala +15%. MCC powiększony o 15% wokół kotwicy (2787,1050): translate(2753.65 1023.55) scale(.06555). Pozostałe landmarki bez zmian. Skrypty firestation/trace-v2.py, revise-v2.py, finalize-v2.py.

## Fire Station — rzut zbliżony do T, v18
Prawe skrzydło wydłużone na podstawie rzutu Google Earth, z dwoma pasami świetlików. Lewy garaż zachowany z wcześniejszego SVG za pomocą maski fire-original-garage; nowa prawa część z exec-0ddac1bc-5337-4bf3-bb2e-06c257666613.png dołączona osobno. Położenie i skala całego landmarku bez zmian. MCC i pozostałe obiekty bez zmian. Skrypty firestation/trace-v3.py, compose-v3.py, finalize-v3.py; źródło prawego skrzydła output/Fire-Station-T-source.svg, źródło garażu firestation/previous-asset.svg.

## 2026-10-08 — wspólna wersja v19 po przywróceniu plików
Dodano Education Campus nr 13, Business Campus nr 14 i Train Station nr 6 (DART i kładka), podmieniono Fire Station na zaakceptowaną schodkową bryłę. Źródła: cztery PNG upload/*Obraz-ChatGPT-7-pa-2026*, kolejno 01 stacja, 02 edukacja, 03 biznes, 04 remiza. 15 landmarków, prawdziwe wektory bez osadzonych bitmap. Usunięte oryginalne bryły i cienie zapisane w update19/removed.json. Nie usuwano sąsiedniej Post Primary School ani budynków poza wybranym kompleksem. Wstawienia ilustracyjne, nie pomiarowe; stacja zmniejszona dla uniknięcia kolizji z zabudową. Parametry i odtwarzanie: update19/trace.py, integrate.py, finalize.py. HTML zsynchronizowany i ma trzy nowe przyciski zbliżeń. Kanoniczne pliki output/Maynooth-DZ-landmarks.svg i .html; wydanie output/Maynooth-DZ-updated-v19.svg. Wszystkie cztery zaległe grafiki wstawione.

## v20 — 2026-10-08
Carton Avenue zamieniono z use/xlink na bezpośrednie grupy wektorowe dla zgodności podglądów. Do kanonicznej mapy włączono pomniejszony Greenway: translate(1745 1279) scale(.15) rotate(-1.5 800 350). Main Square na etapie osobnej ilustracji, jeszcze bez integracji.

## v21 — 2026-10-08 — Main Square wstawiony
Dodano Main Square przy Court House Square OSM 296169916. Plac, drzewa, ławki i wschodnia pierzeja z zaakceptowanej ilustracji exec-62071f26-9d1d-49ae-82cc-31723dbb9adf.png; native SVG Main-Square-light.svg, 3707 ścieżek. Zastąpiono bryły i cienie OSM 41720764, 41720767, 41720768, 41720769 oraz element placu 217133643. Dopasowanie płaszczyzny terenu: matrix(0.0499426158579514 0.015557405008702676 -0.031103770570390044 0.05142275346270586 2107.8412762401977 1066.1739296184826). Wszystkie 16 poprzednich landmarków bez zmian, w tym przywrócony Carton Avenue i pomniejszony Greenway. 17 grup landmarków; SVG bez bitmap, HTML/index/preview zsynchronizowane, przycisk Main Square. Wydanie Maynooth-DZ-updated-v21.svg; skrypty main-square/integrate.py, finalize.py, placement.json.

## v22 — Main Square: korekta kamery
Poprawiono widok zgodnie z Clipboard01.png: dłuższa oś pierzei stromo w dół i w prawo, pionowe ściany. Ponowny render całej sceny zamiast ścinania obrazu. Źródło generated_images/exec-41a87335-f683-454a-99db-969c5d7d4124.png; wstawienie translate(2107 1064) scale(.039 .050). 4388 ścieżek. Inne landmarki i geografia bez zmian, HTML zsynchronizowany. Skrypty main-square-v22/revise.py i finalize.py.

## v23 — Main Square: poszerzony plac
Plac poszerzono w lewo do proporcji zbliżonych do kwadratu, zachowując poprawioną perspektywę i pionowe ściany. Źródło generated_images/exec-52007b7c-44ce-41a0-a37f-a8e3d766b333.png; wstawienie translate(2101 1068) scale(.043 .060). 3820 ścieżek. Inne landmarki i geografia bez zmian, HTML zsynchronizowany. Skrypty main-square-v23/revise.py i finalize.py.

## v24 — Main Square: narożniki i jeden łuk
Usunięto prawy łuk, wyprostowano krawędzie placu i lewy dolny narożnik. Dopasowano górny prawy narożnik do rzeczywistego obrysu. Źródło generated_images/exec-44f662e3-473e-4e64-8186-6d1642dfbb05.png; wstawienie matrix(0.04705289005764381 0.004981009895527649 0 0.06649664342784933 2099.9775865972383 1063.6137578938728). 3794 ścieżek. Inne landmarki i geografia bez zmian, HTML zsynchronizowany. Skrypty main-square-v24/revise.py i finalize.py.

## v25 — Main Square: exact footprint reconstruction
User rejected whole-image placement. Matched annotated upload/01-Clipboard01.png to main-square/base.png using SIFT + RANSAC similarity registration (27 inliers). The six red contour corners were converted into local zone-map coordinates, stored in main-square-v25/outline.json. Rebuilt native vector paving exactly on that contour, with straight boundary and map-aligned cobbles. Removed old composite placement. Split original vector artwork into building, trees, left arch and flower-pot objects, independently anchored on the site; lamps/benches/bollards are native vectors. Shortened the building row and moved it to the eastern edge. Its south end and all tested ground anchors stay inside the site polygon. Vertical walls remain vertical. No raster images embedded. Other 16 landmarks byte-identical. Files: output/Maynooth-DZ-updated-v25.svg, canonical SVG/HTML and migration synchronized. Site-fit asset and outline-check PNG provided. Reproduction: main-square-v25/rebuild.py and finalize.py. This supersedes v21-v24 whole-scene transformations.

## v26 — approved full 3D Main Square illustration
Replaced rejected v25 flat separated furnishings with the newly approved complete 3D raster exec-344e164b-a8e1-4312-b026-72efc37156f2.png (two substantial buildings, one arch, four trees, benches, bollards). Native trace: 2787 paths; output/Main-Square-3D-light-v26.svg. Removed external translucent glow with alpha threshold 180. Uniform similarity placement translate(2077.84805048262 1060.7599892962726) scale(0.07146923076923077); no shear or anisotropic scaling. Kept the accepted exact native ground underneath; height envelope allows roofs/tree crowns above the site and trims excess paving at the southern edge. Other 16 landmarks unchanged, no bitmap in SVG, HTML/index/preview synchronized. Placement details main-square-v26/placement.json; scripts integrate.py and finalize.py.

## v27 — Manor Mills
Added approved Manor Mills illustration exec-7bbd55e7-a5b7-4c61-9c4a-e71043b3364d.png as native traced SVG (3439 paths). Replaced 12 cached OSM building groups, preserved all previous 17 landmarks byte-identically. Vertical edges stay upright; camera elevation compensated with independent horizontal/vertical scales. Placement and removed OSM IDs in manor-v27/placement.json, reproduction integrate.py and finalize.py. Canonical map, HTML/index/preview synchronized. Added Manor Mills focus button.

## v28 — Manor Mills clearance
Reduced Manor Mills by 10 percent around (1850,1025), then shifted (+2,-1) map units to give clearance from river and streets. All other 17 landmarks unchanged. SVG and all HTML previews synchronized. Final placement manor-v28/placement.json.
