<template>
    <section>
        <h3>Algosim</h3>
        <p>
            Algosim ist eine Webseite, die Sortier- und Suchalgorithmen erklärt, indem sie grafisch Visualisiert werden. <br>
            Dabei kann der Benutzer die Eingabewerte, auf welchen der Algorithmus ausgeführt wird frei wählen. <br>
            Zusätzlich bietet Algosim ein Quiz, welches dem Benutzer erlaubt sein Wissen über Sortier- und Suchalgorithmen
            spielerisch zu testen. Im Rahmen des Quiz's werden dem Spieler Visualisierungen verschiedener Algorithmen gezeigt,
            anschließend müssen diese Algorithmen benannt werden.
        </p>
    </section>
    <section>
        <h3>Sortieralgorithmen</h3>
        <p>
            Ein Sortieralgorithmus soll eine Liste aus Elementen ordnen. Dazu hat der Algorithmus die Möglichkeit diese Elemente
            miteinander zu vergleichen. Das Ergebnis sollte anschließend aufsteigend sortiert sein. <br>
            Die Sortieralgorithmen, die Algosim bereitstellt sind allesamt vergleichsbasiert, da sich nur diese Algorithmen
            sinnvoll darstellen lassen.
        </p>
    </section>
    <section>
        <h3>Suchalgorithmen</h3>
        <p>
            Ein Suchalgorithmus hat das Ziel einen möglichst kurzen Weg durch ein Graphen zu finden. <br>
            Ein Graph besteht dabei immer aus Knoten und Kanten, welche die Knoten verbinden. Die Kanten können ein Gewicht
            beinhalten, welches die Strecke zwischen den verbundenen Knoten symbolisiert. <br>
            Algosim beschränkt sich bei den Graphen auf gitterförmige bzw. labyrinthartiger Graphen, da diese zwangsläufig
            planar sind und die Visualisierungen somit anschaulich bleiben.
        </p>
    </section>
    <section>
        <h3>Unterstützte Algorithmen</h3>
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
        <p>Die von uns unterstützen Suchalgorithmen sind:</p>
        <ul class="list-inside list-disc">
            <li>A*</li>
            <li>Breath-First-Search (BFS)</li>
            <li>Depth-First-Search (DFS)</li>
            <li>Dijkstra</li>
        </ul>
    </section>
    <section>
        <h3>Über uns und unsere Motivation</h3>
        <p>
            Wir sind eine Gruppe von Studenten der HWR-Berlin und wollen mit Algosim das lernen von Algorithmen erleichtern. <br>
            An vielen Schulen werden Sortieralgorithmen als Einstieg in die Informatik genutzt, daher ist es sinnvoll den
            Schülern eine Möglichkeit zu geben das gelernte grafisch und anschaulich nachvollziehen zu können. <br>
            Suchalgorithmen (Wegfindungsalgortihmen) begegnen einem im Bereich der Graphentheorie und werden für viele praktische Anwendungen
            wie Navigationssysteme benötigt. Da die Ansätze und Motivationen eines bestimmten Suchalgorithmus nicht immer klar sind,
            möchten wir mit Algosim eine Möglichkeit bieten, um ihre Ansätze und Verschiedenheiten zu verstehen.
        </p>
    </section>
</template>

<script setup lang="ts">
</script>
