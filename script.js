

// script for sliding the tables

const track = document.querySelector('.carousel-track');
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');

let currentIndex = 0;
const tableWidth = 200; // width + margin
const visibleTables = 5;
const totalTables = 20;
const maxIndex = totalTables - visibleTables;

leftBtn.addEventListener('click', () => {
  currentIndex = Math.max(currentIndex - visibleTables, 0);
  track.style.transform = `translateX(-${currentIndex * tableWidth}px)`;
});

rightBtn.addEventListener('click', () => {
  currentIndex = Math.min(currentIndex + visibleTables, maxIndex);
  track.style.transform = `translateX(-${currentIndex * tableWidth}px)`;
});






// script for dragging the table

const indexTable = document.getElementById("indextable");
const otherTables = document.getElementsByClassName("dataTable");

let draggedRow = null;

// Only rows that are not .person are draggable
function getDraggableRows(table) {
  return Array.from(table.rows).filter(row => !row.classList.contains("person"));
}

function swapRows(table, row1, row2) {
    
    var parent = row1.parentNode;


    var afterRow2 = row2.nextSibling;
    
    parent.insertBefore(row2, row1);

    parent.insertBefore(row1, afterRow2);
}


getDraggableRows(indexTable).forEach(row => {
  row.draggable = true;

  row.addEventListener("dragstart", () => {
    draggedRow = row;
    row.classList.add("dragging");
  });

  row.addEventListener("dragend", () => {
    draggedRow = null;
    row.classList.remove("dragging");
  });

  row.addEventListener("dragover", e => e.preventDefault());

  row.addEventListener("drop", () => {
    if (!draggedRow || draggedRow === row) return;

    // Swap in index table
    swapRows(indexTable, draggedRow, row);

    // Swap in all other tables
    Array.from(otherTables).forEach(t => {
      const rows = getDraggableRows(t);
      const idx1 = getDraggableRows(indexTable).indexOf(draggedRow);
      const idx2 = getDraggableRows(indexTable).indexOf(row);
      swapRows(t, rows[idx1], rows[idx2]);
    });
  });
});







