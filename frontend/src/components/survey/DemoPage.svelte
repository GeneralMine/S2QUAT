<script>
    import Surface from "../common/Surface.svelte";
    import DataModel from "../DataModel/DataModel.svelte";
</script>

<Surface title="ScenarioPage">
    <div>
        <div>
            Im Zuge der steigenden Herausforderungen in urbanen Räumen, gewinnen sogenannte Smart Urban Services zunehmend an Bedeutung. Darunter versteht man datenbasierte Leistungsbündel
            (Dienstleistungen und digitale Dienste), die über integrierte Plattformen erbracht werden und sich aus den verändernden Rahmenbedingungen urbaner Räume ergeben und städtische Akteure
            adressieren. Mit Hilfe von intelligenten Technologien, welche mit Sensorik ausgestattet und an das Internet angebunden sind, werden Daten über den aktuellen Zustand und die Nutzung von
            urbane Räumen gesammelt. In ausgewerteter und intelligent kombinierter Form bilden diese Daten die Grundlage für das Angebot von auf einen konkreten Bedarf und Kontext angepasste
            Dienstleistungen. Die Gestaltung solcher Smart Service-Systemen ist jedoch äußerst komplex und stellt viele kommunale sowie privatwirtschaftliche Akteure vor Herausforderungen. Eine
            zentrale Schwierigkeit besteht darin, Lösungen zu schaffen, welche von den Bürgerinnen und Bürgern akzeptiert und nachgefragt werden. Um die erfolgreiche Entwicklung von intelligenten
            Dienstleistungssystemen im urbanen Raum zu unterstützen, wurde im Rahmen des vom BMBF geförderten Projekts »Smart Urban Services: Dienstleistungsplattform für die urbane Wertschöpfung von
            morgen« das vorliegende Werkzeug zur Bewertung wahrgenommener Qualität solcher Systemlösungen entwickelt. Dieses basiert auf validierten Qualitätskonzepten der jeweiligen
            Leistungsbestandteile und erlaubt eine integrierte Bewertung von Smart Urban Services. Darüber hinaus können die dargestellten Qualitätskategorien als eine Art Anforderungskatalog bei der
            Gestaltung von Smart Urban Services unterstützen. Um eine ganzheitliche Qualitätsbewertung zu ermöglichen, wurde ein integratives Rahmenkonzept entwickelt. Dies stellt eine Matrix aus den
            zentralen Leistungsbestandteilen von Smart Urban Services »Technologie & Datenbasis«, »Digitale Dienste«, »Persönliche Dienstleistungen« und »Integration« sowie den Gestaltungsdimensionen
            »Potenzial«, »Prozess« und »Ergebnis«. Die dabei entstehenden zwölf Felder werden im weiteren Verlauf der Werkzeugnutzung ausführlich erklärt. Um eine nachvollziehbare Beschreibung zu
            ermöglichen, wird dies anhand des beispielhaften Smart Urban Service »Intelligente Müllentsorgung« erläutert. Eine kurze Beschreibung erhalten Sie unten.
            <DataModel />
        </div>
    </div>

    <code>
        Anwendungsfall »Intelligente Müllentsorgung« Einen beispielhaften Smart Urban Service stellt die Nutzung von urbanen Sensordaten zur Verbesserung der Müllentsorgung im innerstädtischen Raum
        dar. In vielen Städten werden Unterflurmüllkörbe eingesetzt, welche sich im Zeitverlauf füllen und in regelmäßigen Abständen mit einem Spezialfahrzeug des Entsorgungsbetriebs entleert werden.
        Die Fahrtrouten werden dafür bisher statisch geplant und durchgeführt, unabhängig des tatsächlichen Füllstands des Unterflurmüllkorbs. Darüber hinaus rückt das Spezialfahrzeug auch dann an,
        wenn lediglich der Einwurfschacht des Müllkorbs blockiert ist, die Unterflurkammer jedoch noch frei. Hier würde es genügen. Einen einzelnen Mitarbeiter zur Beseitigung der Blockade zu
        entsenden. Anstatt die Fahrtrouten wie bisher statisch zu planen und in regelmäßigen Zeitabständen Entsorgungsfahrten zu tätigen, können die Einsätze mit Hilfe urbaner Sensordaten
        bedarfsgerecht organisiert werden. Auf Basis von Informationen zum aktuellen Füllstand im Unterflurkorb und des Einwurfschachts sowie zu Fußgängerbewegungen und geplanten
        Veranstaltungsterminen können Entleerungsrouten in nahezu Echtzeit angepasst und prädikativ geplant werden. So werden unnötige Entleerungsfahrten in ungünstigen Situationen, welche von
        Fußgängern und Anwohnern als störend empfunden werden, verhindert.
    </code>
</Surface>
