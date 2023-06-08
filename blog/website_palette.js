const PALETTE = [
    "#293136",
    "#333C43",
    "#3A464C",
    "#434F55",
    "#4D5960",
    "#555F66",
    "#5D6B66",
    "#5C3F4F",
    "#59464C",
    "#55544A",
    "#48584E",
    "#3F5765",
    "#E67E80",
    "#E69875",
    "#DBBC7F",
    "#A7C080",
    "#7FBBB3",
    "#83C092",
    "#D699B6",
    "#D3C6AA",
    "#A7C080",
    "#D3C6AA",
    "#E67E80",
    "#7A8478",
    "#859289",
    "#9DA9A0"
];
PALETTE.forEach(color => {
    $("#palette").append("<div class='color' id='" + color + "' style='background-color: " + color + " ;'>" + color + "</div>")
});