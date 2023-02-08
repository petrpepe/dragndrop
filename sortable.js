var items1 = document.getElementById('items1');
var items2 = document.getElementById('items2');

var sortable1 = Sortable.create(items1, {
    group: "shared",
    animation: 150,
    scroll: true,
    forceAutoscrollFallback: false,
    forceFallback: true,
    scrollSensitivity: 50,
});

var sortable2 = Sortable.create(items2, {
    group: "shared",
    animation: 150,
    scroll: true,
    forceAutoscrollFallback: false,
    forceFallback: true,
    scrollSensitivity: 50,
});