<script>
    import Footer from "../components/common/Footer.svelte";
    import Surface from "../components/common/Surface.svelte";
</script>

<svelte:head>
    <title>Impressum - S2QUAT</title>
</svelte:head>

<div class="page backgroundColor">
    <a href="/login" class="logoContainer">
        <img class="image" src="logo-width.png" alt="S2QUAT Logo" />
    </a>

    <Surface title="Impressum">
        <div class="content">
            <h3>Angaben gemäß § 5 TMG, Betreiber und Verantwortlicher für den Inhalt nach § 55 Abs. 2 RStV</h3>
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
                <br />
                ist eine rechtlich nicht selbständige Einrichtung der Fraunhofer-Gesellschaft zur Förderung der angewandten Forschung e.V.
                <br />
                <br />
                Hansastraße 27 c
                <br />
                80686 München
                <br />
                Telefon +49 89 1205-0
                <br />
                Fax +49 89 1205-7531
                <br />
                <br />
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a
                <br />
                Umsatzsteuergesetz: DE 129515865
                <br />
                <br />
                Registergericht
                <br />
                Amtsgericht München
                <br />
                Eingetragener Verein
                <br />
                Register-Nr. VR 4461
                <br />
                <br />
                <b> Verantwortlicher Redakteur: </b>
                <br />
                Marvin Raiser
                <br />
                marvin_raiser@web.de
                <br />
                <br />
                <b> Webadministrator </b>
                <br />

                Marvin Raiser
                <br />
                marvin_raiser@web.de
                <br />
                <br />
                <b> Fraunhofer Ansprechpartner </b>
                <br />

                Jens Neuhüttler
                <br />
                Jens.Neuhuettler@iao.fraunhofer.de
                <br />
                <br />
                <b> Vorstand </b>
                <br />

                Prof. Dr.-Ing. Reimund Neugebauer, Präsident, Unternehmenspolitik und Forschung
                <br />
                Prof. Dr. Ralf Boris Wehrspohn, Technologiemarketing und Geschäftsmodelle
                <br />
                Prof. Dr. Alexander Kurz, Personal, Recht und Verwertung
                <br />
                Dipl.-Kfm. Andreas Meuer, Finanzen und Digitalisierung
                <br />
                <br />

                <b> Nutzungsrechte </b>
                <br />

                Copyright © by Marvin Raiser, Fraunhofer-Gesellschaft
                <br />
                Alle Rechte vorbehalten.
                <br />
                <br />

                Die Urheberrechte dieser Web-Site liegen vollständig beim Betreiber und der Fraunhofer-Gesellschaft.
                <br />
                Ein Download oder Ausdruck dieser Veröffentlichungen ist ausschließlich für den persönlichen Gebrauch gestattet. Alle darüber hinaus gehenden Verwendungen, insbesondere die kommerzielle
                Nutzung und Verbreitung, sind grundsätzlich nicht gestattet und bedürfen der schriftlichen Genehmigung. Anfragen richten Sie Bitte an folgende Adresse:
                <br />
                <br />

                Marvin Raiser
                <br />
                Fröttmaninger Str. 12A
                <br />
                80805 München
                <br />
                marvin_raiser@web.de
                <br />
                <br />

                Ein Download oder Ausdruck ist darüber hinaus lediglich zum Zweck der Berichterstattung über den Betreiber Marvin Raiser und der Fraunhofer-Gesellschaft und Ihrer Institute nach
                Maßgabe untenstehender Nutzungsbedingungen gestattet:
                <br />
                Grafische Veränderungen an Bildmotiven - außer zum Freistellen des Hauptmotivs - sind nicht gestattet. Es ist stets die Quellenangabe und Übersendung von zwei kostenlosen Belegexemplaren
                an die oben genannte Adresse erforderlich. Die Verwendung ist honorarfrei.
                <br />
                <br />

                <b> Haftungshinweis </b>
                <br />

                Wir übernehmen keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
                <br />
                <br />

                Wir sind bemüht, das Webangebot stets aktuell und inhaltlich richtig sowie vollständig anzubieten. Dennoch ist das Auftreten von Fehlern nicht völlig auszuschließen. Der Betreiber und
                das
                <br />
                <br />

                Fraunhofer-Institut bzw. die Fraunhofer-Gesellschaft übernimmt keine Haftung für die Aktualität, die inhaltliche Richtigkeit sowie für die Vollständigkeit der in ihrem Webangebot
                eingestellten Informationen. Dies bezieht sich auf eventuelle Schäden materieller oder ideeller Art Dritter, die durch die Nutzung dieses Webangebotes verursacht wurden.
                <br />
                <br />

                Geschützte Marken und Namen, Bilder und Texte werden auf unseren Seiten in der Regel nicht als solche kenntlich gemacht. Das Fehlen einer solchen Kennzeichnung bedeutet jedoch nicht,
                dass es sich um einen freien Namen, ein freies Bild oder einen freien Text im Sinne des Markenzeichenrechts handelt.
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
