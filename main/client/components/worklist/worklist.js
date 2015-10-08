Template.worklist.onRendered(function() {
    var worklist = $("#worklist");
    if (worklist) {
        $('.navbar-default').css({
            'background-color': '#f8f8f8',
            'border-color': '#e7e7e7'
        });
        document.body.style.overflow = null;
        document.body.style.height = null;
        document.body.style.width = null;
        document.body.style.minWidth = null;
        document.body.style.position = null;
    }
});
