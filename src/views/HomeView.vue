<template>
    <div>
        <div class="bg-primary rounded-[3.125rem] flex flex-row justify-center">
            <img src="../assets/algosim-logo-with-label.png" alt="Algosim Logo" class="max-h-[calc(100vh-6.5rem)]">
        </div>
        <ContentSection>
            <h1>Algosim</h1>
            <p>
                Algosim ist eine Webseite, die Sortier- und Suchalgorithmen erklärt, indem diese grafisch visualisiert
                werden.<br>
                Dabei kann der Benutzer die Eingabewerte, mit welchen der Algorithmus ausgeführt wird frei wählen.<br>
                Zusätzlich bietet Algosim ein Quiz, welches dem Benutzer erlaubt sein Wissen über Sortier- und
                Suchalgorithmen
                spielerisch zu testen. Im Rahmen des Quiz's werden dem Spieler Visualisierungen verschiedener
                Algorithmen gezeigt,
                welche anschließend benannt werden müssen.
            </p>
        </ContentSection>
        <ContentSection highlight>
            <h1>Sortieralgorithmen</h1>
            <p>
                Ein Sortieralgorithmus soll eine Liste aus Elementen ordnen. Dazu hat der Algorithmus die Möglichkeit diese
                Elemente
                miteinander zu vergleichen. Das Ergebnis sollte aufsteigend sortiert sein.<br>
                Die Sortieralgorithmen, die Algosim bereitstellt sind allesamt vergleichsbasiert, da sich nur diese
                Algorithmen
                sinnvoll darstellen lassen.
            </p>
        </ContentSection>
        <ContentSection>
            <h1>Suchalgorithmen</h1>
            <p>
                Ein Suchalgorithmus hat das Ziel einen möglichst kurzen Weg durch ein Graphen zu finden.<br>
                Ein Graph besteht dabei immer aus Knoten und Kanten, welche die Knoten verbinden. Die Kanten können ein
                Gewicht
                beinhalten, welches die Strecke zwischen den verbundenen Knoten symbolisiert.<br>
                Algosim beschränkt sich bei den Graphen auf gitterförmige bzw. labyrinthartige Graphen, da diese
                zwangsläufig
                planar sind und die Visualisierungen somit anschaulich bleiben.
            </p>
        </ContentSection>
        <ContentSection highlight>
            <h1>Unterstützte Algorithmen</h1>
            <p>Die von uns unterstützen Sortieralgorithmen sind:</p>
            <ul class="list-inside list-disc">
                <li>Bubblesort</li>
                <li>Combsort</li>
                <li>Heapsort</li>
                <li>Insertionsort</li>
                <li>Mergesort</li>
                <li>Quicksort</li>
                <li>Selectionsort</li>
                <li>Shellsort</li>
            </ul>
            <br>
            <p>Die von uns unterstützen Suchalgorithmen sind:</p>
            <ul class="list-inside list-disc">
                <li>A*</li>
                <li>Breath-First-Search (BFS)</li>
                <li>Depth-First-Search (DFS)</li>
                <li>Dijkstra</li>
            </ul>
        </ContentSection>
        <ContentSection>
            <h1>Über uns und unsere Motivation</h1>
            <p>
                Wir sind eine Gruppe von Studenten der HWR-Berlin und wollen mit Algosim das lernen von Algorithmen
                erleichtern.<br>
                An vielen Schulen werden Sortieralgorithmen als Einstieg in die Informatik genutzt, daher ist es sinnvoll
                den
                Schülern eine Möglichkeit zu geben das gelernte grafisch und anschaulich nachvollziehen zu können.<br>
                Suchalgorithmen (Wegfindungsalgortihmen) begegnen einem im Bereich der Graphentheorie und werden für viele
                praktische Anwendungen
                wie Navigationssysteme benötigt. Da die Ansätze und Motivationen eines bestimmten Suchalgorithmus nicht
                immer klar sind,
                möchten wir mit Algosim eine Möglichkeit bieten, um ihre Ansätze und Verschiedenheiten zu verstehen.
            </p>
        </ContentSection>

    </div>
</template>

<script setup lang="ts">
import ContentSection from '@/components/app/ContentSection.vue'
</script>

<style scoped>
p {
    font-size: 1.625rem;
    line-height: 1.5;
}

li {
    font-size: 1.5rem;
}
</style>
