Programmi tööle panemiseks kirjutage palun projekti directory-s olles terminali: docker-compose up --build
Programmi saab vaadata lehel: http://localhost:5173



1) Alustasin sellega, et seadsin spring booti, vite ja postgreSQL üles
2) Lisasin algul dotenv library, et .env file-st databaasi andmed spring booti sisse lugeda, siis ta ei lae neid andmeid remote repo-sse ja selles mõttes ohutum
3) Sihin fullstack arendajaks, aga eelistan backendi, selletõttu alustasin backendist- tegin Flight entity, määrasin talle erinevad variable-id nagu flightNumber, startingLocation, destination, price, duration jne
4) Tegin FlightController, FlightService, FlightRepository koos lihtsa api endpointiga controlleris, mis püüab kõik lennud databaasist
5) Mõtlesin, et lendude juures on oluline timezone offset, seetõttu kasutasin ZonedDateTime tüüpi lendude kuupäevade/aja jaoks, aga postgres-i oli jama, et see ei taha ZoneDateTime salvestada, siis lisasin columnDefinition = "TIMESTAMPTZ" talle spring bootis juurde,
   see laseb spring bootil automaadselt ta ISO-8601 formaati panna postgresi
6) Uurisin, mis nimed lendudel on, siis sain teada, et need on tihti lennufirma + numbri kombinatsioon ja otsustasin samamoodi oma lendusid nimetada nt BT101
7) Proovisin otsida internetist lennufirma API-sid, mis tasuta lubaksid nende API-t kasutada, aga parim, mis ma leidsin, oli 100 API requesti kuus ja seetõttu kartsin, et sellest jääks vähekeks kui ma pidevalt programmi testin, seetõttu otsustasin ise genereerida lennud
   mõistlikkuse piiris- genereerin 100 lendu, lähtekoht on alati Tallinn, aga sihtkohad on 10 erineva paiga  puhul, lasin AI-l genereerida mulle osaliselt andmeid(Sihtkoht, Riik, Linn, IATA, kaugus minutites Tallinnast, et oleks natuke reaalsem data, hinna genereerin ise
   juhuslikult, script on FlightSeeder.java, oli suhteliselt lõbus teha, kuna random funktsioonid vajavad matemaatikat ja sain oma enda loogikat kasutada, et siis juhuslikult kõik lennud genereerida.
8) Tegin frontendi, et lennud nähtavale ilmuskid, selleks otsustasin react-table-i kasuks. Installisin vajalikud asjad ja avasin dokumentatsiooni: https://tanstack.com/table/latest/docs/introduction, mille järgi ma siis proovisin react-table-i kasutama õppida,
   sest mul pole varem vajadust olnud tabeli osas React-is. Sain teada, et peab algul column-id looma läbi columnHelper.accessorite, hankima data ja getCoreRowModel()-i kasutama, et algne tabel valmis luua, vastav osa ja jsx-i panna- mul oli natuke probleeme, kuna
   dokumentatsioon on typescriptis ja ma ise teen javascriptis ja mul pole varem typescriptis kogemust, siis pidin osa asju sealt maha võtma- nt type-mise, natuke uurisin ka netist abi juurde.
9) Lisasin flightSchedule.css faili, et ilusamaks muuta, aga mõtlesin, et hangin netist css, et praegu rohkem loogikale fokuseerida ja projekti lõpus kui jõuan, siis teen oma enda css-i
10) Lisasin sortimise react-table-ile ja siis filtreerimise sihtkoha, alustuskuupäeva, lõpu kuupäeva, hinna ja kestuse jaoks, kasutasin dokumentatsiooni ja interneti abi, esialgu seadsin filtreerimise üles stringidega, et hiljem muuta
11) Tegin FlightSeats.jsx faili, kus saaks istmekohti valida, seadsin üles BrowserRouteri ja urlid, et nt localhost:5173/ suunaks hoopis localhost:5173/schefule lehele, react Navigate abil seadsin üles, et lennu peale klikkides, suunab ta istmekohtade valimisele ja uuele lehele
12) Tegin FlightSeat entity, FlightSeatController, FlightSeatService, FlightSeatRepository, seadsin üles @oneToMany, @ManyToOne relationshipi Flight ja FlightSeat entityte vahel, et databaas ise seaks üles mulle relational suhte, igal lennul oleks omaenda istmekohad
13) Andsin FlightSeat-ile boolean väärtused nagu occupied, footSpace, nearExit, nearWindow, freeSeatNextTo(tegelt polnud vaja hiljem), string seatNumber, vaatasin, et lennukitel istmekohad tähistatakse tähe + numbri abil nagu A1 näiteks
14) Proovisin FlightSeeder-is üles seada ka istmekohtade genereerimise iga lennu jaoks, aga siis tekkis infinite loop probleem- lennul oli istekoht, millel oli lend, millel oli istekoht- selle parandamiseks hakkasin DTO-sid looma nii Flight kui ka FlightSeat entityte jaoks
15) Tegin FlightSeatDTO, FlightDTO, FlightMapper, vastavad meetodid, et infinite loop probleemist lahti saada, jälle infinite nesting probleem, sest jätsin FlightSeatDTO-sse Flight entity, vahetasin Flight entity seal välja lihtsal vastava flight id-ga
16) Hakkasin mõtlema, kuidas frontendis istmekohad ilusasti 6x16 ridade ja veergudena nähtavale tuua, siin ei tahtnud enam tabelit kasutada, tahtsin, et iga istmekoht oleks justkui nupp, millele saab vajutada, et neid valida
17) Tegin 6 rida, igasse ritta lisasin 16 istekohta (kokku 96 istekohta lennu kohta), proovisin need nähtavale tuua
18) Sain aru, et mõtekam on teha Map nendest ridadest, et igale rea tähele nt A,B,C kuuluksid 16 istekohta
19) Lisasin lennukipildi taustaks, et oleks visuaalselt arusaadavam
20) Muutsin FlightSeederi sedasi, et ta 40% kohtadest genereeriks punaseks, et on juba hõivatud, muutsin ka teised istmekohtade variable-id nagu nearExit jms vastavalt true või false seeder-is, selleks, vaatasin manuaalselt, kus võiks olla akna all, exit-i juures
21) Tegin vahe 3x3 rea vahele, et oleks lennuki moodi rohkem, selleks tegin lihtsalt div-i, millele andsin height 40px parameetri, loopisin läbi iga rea, kuni index on 2, et reavahe näidata
22) Muutsin staatilise class-i dünaamilise vastu, nüüd istmekohad saavad className vastavalt, kas neil peaks olema või mitte, viimane className jääb prioriteedi peale, aga mitme className-i omamine on lahe näha, ala occupied punane + hidden (dimmed-seat) teeb läbinähtava punase istme
23) Tegin filterSeats funktsiooni, mis võtab jsx-is property kui teatud nupp on vajutatud ja peidab ära kõik nupud, millel on property väärtus true, ala nearWindow nt
24) Lisasin erinevad filtri nupud erinevate propertytega, et filtreerida, kas nearWindow, nearExit vms järgi, lisasin ka resetFilters, et tagasi alguspunkti minna
25) Lisasin istmekoha soovitamise ühe inimese jaoks esialgu, võtab mapi, mis on ridadest istmekohtadest, muudab .flat-iga üheks arrayks, mida saab siis lihtsalt .filter-i abil läbi käia, et näha kas mingi istekoht on võetud või filtreeritud, jääb alles vabade istmekohtade
    array, nüüd me teame kui suur length nt sellel array-l on ja saame vastavalt random numbri genereerida, et juhuslik istekoht vabadest istekohtadest soovitada, valitud istekoht käes, käib kõik istmekohad, mis me enne flat()-isime, läbi ja vaatab, et soovitatud istekoht
    oleks sama id-ga, mis vabades istmekohtades on, määrab vabade istmekohtade selle spetsiifilise istme-le väärtuse nt recommended: true, siis muudab data struktuuri jälle array-st map-iks, mille sees on read, ja määrab selle siis nt setFilteredRow()-i
26) Lisasin inimeste valimise, et kas tahetake ühe inimese jaoks piletit või mitme
27) Lisasin kahe vaba kõrval oleva istme jaoks filtreerimise, kus teen manuaalselt algul paarid ("A", "B"), ("B, "C), ("D", "E") jne, c ja d ei saa paaris olla, kuna lennuki reavahe on sees, tegin mapi istmekohtade veergudest seekord, sest kontrollin vertikaalselt, kas
    istmekohad on kõrvuti, vaatab paare ja kontrollib, kas istekoht paaris on hõivatud või paarilise istekoht, kui ei ole, siis istekoht ei ole filtreeritud, kui on üks paari istmetest hõivatud, siis on filtreeritud
28) Lisasin kahe inimese soovitamise, natuke pidi loogikat ümber tegema, nt, et nüüd ei ole ühte random numbrit vaja, vaid kasutan slice-i ja suhffle-i abi, palju loogikat kordub FilterTwoFreeSeats-ist
29) Fixisin buge, tegin natuke react tabeli ümber, et kasutaks date type-i, numbreid durationi jaoks
30) Lisasin projekti Docker-isse
