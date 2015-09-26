Template.layoutChooser.events({
    'mouseenter .layoutChooser table td': function(evt) {
        var currentCell = $(evt.currentTarget);
        var table = currentCell.parents('.layoutChooser table').get(0);
        var rowIndex = currentCell.closest('tr').index();
        var columnIndex = currentCell.index();

        // Loop through the table row by row
        // and cell by cell to apply the highlighting
        for (var i = 0; i < table.rows.length; i++) {
            row = table.rows[i];
            if (i <= rowIndex) {
               for (var j = 0; j < row.cells.length; j++) {
                    if (j <= columnIndex) {
                        cell = row.cells[j];
                        cell.classList.add('hover');
                    }
               }
            }
        }
    },
    'mouseleave .layoutChooser table td': function() {
        var cells = $('.layoutChooser td');
        cells.removeClass('hover');
    },
    'click .layoutChooser table td': function(evt) {
        var currentCell = $(evt.currentTarget);
        var table = currentCell.parents('.layoutChooser table').get(0);
        var rowIndex = currentCell.closest('tr').index();
        var columnIndex = currentCell.index();

        $('#imageViewerViewports').remove();
        var container = $(".viewerMain").get(0);
        UI.render(Template.imageViewerViewports, container);

        // Add 1 because the indices start from zero
        Session.set('viewportRows', rowIndex + 1);
        Session.set('viewportColumns', columnIndex + 1);
    }
});