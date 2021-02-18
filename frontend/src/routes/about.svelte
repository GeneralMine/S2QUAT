<script>
    import Footer from "../components/common/Footer.svelte";
    import Surface from "../components/common/Surface.svelte";
</script>

<svelte:head>
    <title>About Us - S2QUAT</title>
</svelte:head>

<div class="page backgroundColor">
    <a href="/" class="logoContainer">
        <img class="image" src="logo-width.png" alt="S2QUAT Logo" />
    </a>

    <Surface title="Über uns">
        <div class="content">
            <h2>S2QUAT</h2>
            <h3>Integrativer Qualitätsrahmen für die Entwicklung industrieller intelligenter Dienste</h3>
            <div>
                Im Zuge der steigenden Herausforderungen in urbanen Räumen, gewinnen sogenannte Smart Urban Services zunehmend an Bedeutung. Darunter versteht man datenbasierte Leistungsbündel
                (Dienstleistungen und digitale Dienste), die über integrierte Plattformen erbracht werden und sich aus den verändernden Rahmenbedingungen urbaner Räume ergeben und städtische Akteure
                adressieren. Mit Hilfe von intelligenten Technologien, welche mit Sensorik ausgestattet und an das Internet angebunden sind, werden Daten über den aktuellen Zustand und die Nutzung von
                urbane Räumen gesammelt. In ausgewerteter und intelligent kombinierter Form bilden diese Daten die Grundlage für das Angebot von auf einen konkreten Bedarf und Kontext angepasste
                Dienstleistungen.
                <br />
                <br />
                Die Gestaltung solcher Smart Service-Systemen ist jedoch äußerst komplex und stellt viele kommunale sowie privatwirtschaftliche Akteure vor Herausforderungen. Eine zentrale Schwierigkeit
                besteht darin, Lösungen zu schaffen, welche von den Bürgerinnen und Bürgern akzeptiert und nachgefragt werden. Um die erfolgreiche Entwicklung von intelligenten Dienstleistungssystemen
                im urbanen Raum zu unterstützen, wurde im Rahmen des vom BMBF geförderten Projekts »Smart Urban Services: Dienstleistungsplattform für die urbane Wertschöpfung von morgen« das vorliegende
                Werkzeug zur Bewertung wahrgenommener Qualität solcher Systemlösungen entwickelt. Dieses basiert auf validierten Qualitätskonzepten der jeweiligen Leistungsbestandteile und erlaubt eine
                integrierte Bewertung von Smart Urban Services. Darüber hinaus können die dargestellten Qualitätskategorien als eine Art Anforderungskatalog bei der Gestaltung von Smart Urban Services
                unterstützen.
                <br />
                <br />
                Um eine ganzheitliche Qualitätsbewertung zu ermöglichen, wurde ein integratives Rahmenkonzept entwickelt. Dies stellt eine Matrix aus den zentralen Leistungsbestandteilen von Smart Urban
                Services »Technologie & Datenbasis«, »Digitale Dienste«, »Persönliche Dienstleistungen« und »Integration« sowie den Gestaltungsdimensionen »Potenzial«, »Prozess« und »Ergebnis«. Die dabei
                entstehenden zwölf Felder werden im weiteren Verlauf der Werkzeugnutzung ausführlich erklärt. Um eine nachvollziehbare Beschreibung zu ermöglichen, wird dies anhand des beispielhaften Smart
                Urban Service »Intelligente Müllentsorgung« erläutert. Eine kurze Beschreibung erhalten Sie unten.
                <br />
                <br />
            </div>
            <h3>Team</h3>
            <h4>Full-Stack Entwickler und Hosting</h4>
            <div>
                Marvin Raiser
                <br />
                Fröttmaninger Str. 12A
                <br />
                80805 München
                <br />
                marvin_raiser@web.de
                <br />
                +49 172 1519175
                <br />
                <a href="https://github.com/GeneralMine">Github</a>
                <br />
                <br />
            </div>

            <h4>Qualitätsmodell und Leiter des Business Innovation Engineering Centers am Fraunhofer IAO</h4>
            <div>
                Jens Neuhüttler
                <br />
                Nobelstr. 12
                <br />
                70569 Stuttgart
                <br />
                Jens.Neuhuettler@iao.fraunhofer.de
                <br />
                <br />
            </div>

            <h4>Design</h4>
            <div>
                Louisa Loew
                <br />
                Nobelstr. 12
                <br />
                70569 Stuttgart
                <br />
                <br />
            </div>

            <h3>Im Auftrag für</h3>
            <a href="https://www.iao.fraunhofer.de/" class="imageContainer">
                <img class="image" src="fraunhofer-iao.png" alt="Fraunhofer IAO Logo" />
            </a>
            <div>
                Das Fraunhofer-Institut für Arbeitswirtschaft und Organisation IAO
                <br />
                Nobelstr. 12
                <br />
                70569 Stuttgart
                <br />
            </div>
        </div>
    </Surface>
    <Footer />
</div>

<style>
    .page {
        display: flex;
        flex-direction: column;
        padding: 2em;
    }
    .content {
        padding: 1em;
    }
    .logoContainer {
        width: 100%;
        height: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
    }
    .imageContainer {
        width: 5rem;
        height: 5rem;
        display: flex;
    }
    .image {
        width: 90%;
        height: 90%;
        padding: 0;
        object-fit: scale-down;
    }
</style>
